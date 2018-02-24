
//
// ─── DESIGNTALK ─────────────────────────────────────────────────────────────────
//

    DesignTalk
        = _ commands: CommandSequence _ {
            return commands
        }

//
// ─── COMMANDS ───────────────────────────────────────────────────────────────────
//

    CommandSequence
        = left: Command _ ( "and" / "then" ) _ rest: CommandSequence {
            return [ left, ...rest ]
        }
        / command: Command {
            return [ command ]
        }
        / "" {
            return [ ]
        }

    Command
        = MakeCommands
        / DeleteCommand

//
// ─── DELETE COMMAND ─────────────────────────────────────────────────────────────
//

    DeleteCommand
        = ( "delete" / "remove" ) _ query: Query {
            return {
                command:    "remove",
                query,
            }
        }

//
// ─── MAKE COMMAND ───────────────────────────────────────────────────────────────
//

    MakeCommands
        = "make" _ query: Query _ options: ResizeCommandOptions {
            return {
                command:    "resize",
                direction:  "both",
                query,
                ...options,
            }
        }
        / "make" _ direction: ( "width" / "height" ) _ "of" _ query: Query
          _ options: ResizeCommandOptions {
              return {
                  command:      "resize",
                  direction,
                  query,
                  ...options,
              }
          }

    ResizeCommandOptions
        = size: Size1D _ operator: ( "bigger" / "smaller" ) {
            return { size, operator }
        }

//
// ─── FULL QUERY ─────────────────────────────────────────────────────────────────
//

    Query "full query"
        = options: SelectorGrammars {
            return {
                mode:   "new",
                ...options
            }
        }
        / "" {
            return {
                mode:   "previous",
            }
        }

//
// ─── SELECT PHRASE ──────────────────────────────────────────────────────────────
//

    SelectorGrammars "selection grammar"
        = range: SelectorRange _ shape: SelectorAttributes _
          ( "shapes" / "shape" / "ones" / "s" )? _
          ( "with" / "where" / "at" / "whos" / "if" )? _ conditions: SelectorOptionalQueries {

            return { range, conditions, ...shape }
        }

    SelectorAttributes "shape attribute"
        = color: SelectorColor _ kind: SelectorType {
            return { color, kind }
        }

    SelectorOptionalQueries "optional query"
        = left: SelectorQuery _ ( "and" / "also" / "where" / "at" )
          _ rest: SelectorOptionalQueries {
            return [ left, ...rest ]
        }
        / query: SelectorQuery {
            return [ query ]
        }
        / "" {
            return [ ]
        }

    SelectorQuery "query"
        = SizeQuery
        / LocationQuery

    LocationQuery "location query"
        = direction: ( "x" / "y" ) _ operator: SelectorSizeOperator _
          size: Size1D {
            return {
                query: "location",
                direction, operator, size
            }
        }

    SizeQuery "size query"
        = ( "it" _ "is" / "its" / "they" _ "are" / "theyre" ) _
          operator: SelectorSizeOperator _ size: Size2D {
            return {
                query: "size",
                dimension: "both",
                operator,
                size
            }
        }
        / dimension: ( "width" / "height" ) _ operator:SelectorSizeOperator
          _ size: Size1D {
            return {
                query: "size",
                dimension,
                operator,
                size
            }
        }

    SelectorSizeOperator "selection operator"
        = "isnt" _ operator: SelectorSizeOperatorBody {
            return {
                negation: true,
                operator
            }
        }
        / "is"? _ negation: "not"? _ operator: SelectorSizeOperatorBody {
            return {
                negation: negation? true : false,
                operator
            }
        }
        / "is" {
            return {
                negation: false,
                operator: "=",
            }
        }
        / "isnt" {
            return {
                negation: true,
                operator: "="
            }
        }

    SelectorSizeOperatorBody "operator body"
        = "bigger" _ "than" {
            return ">"
        }
        / "less" _ "than" {
            return "<"
        }
        / "smaller" _ "than" {
            return "<"
        }
        / "equal" _ "to" {
            return "="
        }
        / "equals" {
            return "="
        }
        / "bigger" _ "or" _ "equal" "s"? _ "to" {
            return ">="
        }
        / ( "smaller" / "less" ) _ "or" _ "equal" "s"? _ "to" {
            return "<="
        }

    SelectorType "shape type"
        = "circle" {
            return "circle"
        }
        / "ellipse" {
            return "circle"
        }
        / "rect" / "rectangle" {
            return "rect"
        }
        / "" {
            return "all"
        }

    SelectorColor "color"
        = color: ( "red" / "black" / "blue" ) {
            return color
        }
        / "all" {
            return "all"
        }
        / "" {
            return "all"
        }

    SelectorRange "range"
        = "all" / "every" / "each" {
            return "all"
        }
        / "last" _ count: Integer {
            return "previous"
        }
        / "" {
            return "all"
        }

//
// ─── NUMERICS ───────────────────────────────────────────────────────────────────
//

    Size "size"
        = Size2D
        / Size1D

    Size2D "size in two dimensions"
        = width: Integer ":" height: Integer _ unit: Unit {
            return {
                dimensions:     2,
                width,
                height,
                unit
            }
        }

    Size1D "size in one dimension"
        = size: Integer _ unit: Unit {
            return {
                dimensions:     1,
                size,
                unit,
            }
        }

//
// ─── BASIC DATA TYPES ───────────────────────────────────────────────────────────
//

    Unit "unit"
        = unit:( "pixel" / "point" / "time" ) "s"? {
            return unit
        }
        / "" {
            return "pixel"
        }

    Integer "number"
        = [0-9]+ {
            return parseInt( text( ), 10 )
        }

//
// ─── WHITESPACE ─────────────────────────────────────────────────────────────────
//

    _ "whitespace"
        = [ \t\n\r]* { }

// ────────────────────────────────────────────────────────────────────────────────
