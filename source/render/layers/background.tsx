
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/shape.tsx" />
/// <reference path="../../globals/key.ts" />

namespace BasiceShapeEditor.Render.Layers.Background {

    //
    // ─── RENDER ─────────────────────────────────────────────────────────────────────
    //

        export function render ( ) {
            return [
                <rect fill = "white"
                   onClick = { onClick }
                     style = {{ width: "100vw", height: "100vh" }}
                />
            ]
        }

    //
    // ─── ON CLICK ───────────────────────────────────────────────────────────────────
    //

        function onClick ( ) {
            Storage.setState( state => ({
                ...state,
                selectedId: null
            }))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}