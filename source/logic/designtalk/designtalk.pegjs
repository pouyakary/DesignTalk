
//
// ─── SELECT COMMAND ─────────────────────────────────────────────────────────────
//

    SelectCommand =
        "select" _ options: Selector {
            return {
                command: "select",
                options
            }
        }

//
// ─── SELECT PHRASE ──────────────────────────────────────────────────────────────
//

    Selector
        = _ range: SelectorRange _ color: SelectorColor _ kind: SelectorType  _
          "one"? "s"? _ {
            return { range: range, color, kind }
        }

    SelectorType
        = kind: ( "circle" / "rect" / "rectangle" / "ellipse" ){
            return kind
        }
        / ""
    
    SelectorColor
        = color: ( "red" / "black" / "blue" ) {
            return color
        }
        / ""

    SelectorRange
        = "all" / "every" / "each" {
            return "all"
        }
        / "last" _ number: Integer {
            return { kind: "last", count: number }
        }
        / ""

//
// ─── INTEGER ────────────────────────────────────────────────────────────────────
//

    Integer "integer"
        = [0-9]+ {
            return parseInt( text( ), 10 )
        }

//
// ─── WHITESPACE ─────────────────────────────────────────────────────────────────
//

    _ "whitespace"
    = [ \t\n\r]* "the"? [ \t\n\r] * { }

// ────────────────────────────────────────────────────────────────────────────────
