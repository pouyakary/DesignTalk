
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace BasiceShapeEditor.Storage {

    //
    // ─── MODEL ──────────────────────────────────────────────────────────────────────
    //

        export interface IModel {
            shapes:             IShape[ ]
            hoveredId:          string | null
            selectedId:         string | null
            showLineGuides:     boolean
            mouseMode:          MouseMode
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

    // ────────────────────────────────────────────────────────────────────────────────

}