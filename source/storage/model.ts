
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.Storage {

    //
    // ─── MODEL ──────────────────────────────────────────────────────────────────────
    //

        export interface Model {
            maxZIndex:              number
            mouseMode:              MouseMode
            selectedId:             string | null
            previousSelectionIDs:   string[ ]
            shapes:                 Shape[ ]
            showLineGuides:         boolean
            contexMenu:             ContexMenu
        }

    //
    // ─── MOUSE MODE ─────────────────────────────────────────────────────────────────
    //

        export enum MouseMode {
            Move, Resize
        }

    //
    // ─── SHAPES ─────────────────────────────────────────────────────────────────────
    //

        export type ShapeType =
            "rect" | "circle"

        export type ShapeColor =
            "red" | "blue" | "black"

        export interface Shape {
            zIndex:     number
            id:         string
            remove:     boolean,
            type:       ShapeType
            color:      ShapeColor
            width:      number
            height:     number
            x:          number
            y:          number
        }

    //
    // ─── SPEACH RECOGNITION SYSTEM ──────────────────────────────────────────────────
    //

        export interface ContexMenu {
            active:             boolean
            mouseX:             number
            mouseY:             number
            recognizedText:     string
            recognizer:         webkitSpeechRecognition | null
        }

    // ────────────────────────────────────────────────────────────────────────────────

}