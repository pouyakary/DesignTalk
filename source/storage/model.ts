
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.Storage {

    //
    // ─── MODEL ──────────────────────────────────────────────────────────────────────
    //

        export interface IModel {
            maxZIndex:              number
            mouseMode:              MouseMode
            selectedId:             string | null
            shapes:                 IShape[ ]
            showLineGuides:         boolean
            speachRecognition:      ISpeachRecognition
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

        export type IShapeType =
            "rect" | "circle"

        export interface IShape {
            zIndex:     number
            id:         string
            type:       IShapeType
            color:      string
            width:      number
            height:     number
            x:          number
            y:          number
        }

    //
    // ─── SPEACH RECOGNITION SYSTEM ──────────────────────────────────────────────────
    //

        export interface ISpeachRecognition {
            isRecording:    boolean
            currentText:    string
            recognizer:     webkitSpeechRecognition | null
            mouseX:         number
            mouseY:         number
        }

    // ────────────────────────────────────────────────────────────────────────────────

}