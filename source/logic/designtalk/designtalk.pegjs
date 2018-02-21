
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

    Selector = _ range:SelectRange _ color: SelectColor _ kind: SelectType _ "one"? "s"? _ {
        return { range: range, color, kind }
    }

    SelectType
        = kind: ( "circle" / "rect" / "rectangle" / "ellipse" ){
            return kind
        }
        / ""
    
    SelectColor
        = color: ( "red" / "black" / "blue" ) {
            return color
        }
        / ""

    SelectRange
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
        = _ [0-9]+ {
            return parseInt( text( ), 10 )
        }

//
// ─── WHITESPACE ─────────────────────────────────────────────────────────────────
//

    _ "whitespace"
    = [ \t\n\r]* "the"? [ \t\n\r] * { }

// ────────────────────────────────────────────────────────────────────────────────
