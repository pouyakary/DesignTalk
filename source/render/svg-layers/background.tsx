
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/shape.tsx" />
/// <reference path="../../globals/key.ts" />

namespace Shapes.Render.SVGLayers.Background {

    //
    // ─── RENDER ─────────────────────────────────────────────────────────────────────
    //

        export function render ( ) {
            const mustBeSmallCopyRight =
                window.innerWidth < 500

            const copyright =
                ( mustBeSmallCopyRight
                    ? "2017-present, Pouya Kary"
                    : "2017-present by Pouya Kary, All rights reserved."
                    )

            const copyrightRightDistance =
                ( mustBeSmallCopyRight
                    ? 180
                    : 300
                    )


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

                    <text x = { window.innerWidth - copyrightRightDistance }
                          y = { 38 }
                       fill = "#ccc"
                 fontFamily = "Roboto" fontSize = "12">
                        &copy; { copyright }
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