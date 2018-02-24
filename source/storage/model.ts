
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
            speachRecognition:      SpeachRecognition
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

        export interface Shape {
            zIndex:     number
            id:         string
            type:       ShapeType
            color:      string
            width:      number
            height:     number
            x:          number
            y:          number
        }

    //
    // ─── SPEACH RECOGNITION SYSTEM ──────────────────────────────────────────────────
    //

        export interface SpeachRecognition {
            isRecording:    boolean
            currentText:    string
            recognizer:     webkitSpeechRecognition | null
            mouseX:         number
            mouseY:         number
        }

    // ────────────────────────────────────────────────────────────────────────────────

}