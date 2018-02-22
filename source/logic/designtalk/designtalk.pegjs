
//
// ─── DESIGNTALK ─────────────────────────────────────────────────────────────────
//

    DesignTalk
        = _ selection: SelectCommand _ {
            return { selection }
        }

//
// ─── SELECT COMMAND ─────────────────────────────────────────────────────────────
//

    SelectCommand "select command"
        = "select" ( _ "from" )? _ options: SelectorGrammars _ {
            return {
                command:    "select",
                mode:       "new",
                ...options
            }
        }
        / "" {
            return {
                command:    "select",
                mode:       "previous",
            }
        }

//
// ─── SELECT PHRASE ──────────────────────────────────────────────────────────────
//

    SelectorGrammars "selection grammar"
        = range: SelectorRange _ shape: SelectorAttributes _ ( "ones" / "s" )? _
          ( "where" / "at" )? _ conditions: SelectorOptionalQueries {
            return { range, ...shape, conditions }
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
        = dimension: ( "width" / "height" ) _ operator:SelectorSizeOperator
          _ size: Size1D {
            return {
                query: "size",
                dimension,
                operator,
                size
            }
        }
        / operator: SelectorSizeOperator _ "than" _ size: Size {
            return {
                query: "size",
                dimension: "both",
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
        = kind: ( "circle" / "rect" / "rectangle" / "ellipse" ) {
            return kind
        }
        / ""
    
    SelectorColor "color"
        = color: ( "red" / "black" / "blue" ) {
            return color
        }
        / ""

    SelectorRange "range"
        = "all" / "every" / "each" {
            return "all"
        }
        / "last" _ count: Integer {
            return { kind: "last", count }
        }
        / ""

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
        = unit:( "pixel" / "point" ) "s"? {
            return unit
        }
        / "" {
            return "point"
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
