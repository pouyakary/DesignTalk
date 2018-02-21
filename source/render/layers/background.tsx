
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
                <g key = { generateKey( ) }>
                    <rect fill = "white"
                       onClick = { onClick }
                         style = {{ width: "100vw", height: "100vh" }}
                    />

                    <text x = { 30 } y = { 40 }
                       fill = "black"
                 fontFamily = "Roboto" fontWeight = "500" fontSize = "30">
                        Shapes
                    </text>

                    <text x = { window.innerWidth - 345 } y = { 38 }
                       fill = "#ccc"
                 fontFamily = "Roboto" fontSize = "12">
                        Copyright &copy; 2017-present by Pouya Kary, All rights reserved.
                    </text>
                </g>
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