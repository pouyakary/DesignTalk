
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/model.ts" />
/// <reference path="layers/shapes.tsx" />
/// <reference path="../globals/key.ts" />

namespace BasiceShapeEditor.Render {

    //
    // ─── MAIN RENDERER ──────────────────────────────────────────────────────────────
    //

        export function renderApp ( model: Storage.IModel ) {
            const container =
                document.getElementById('container')

            const scene =
                createScence( model )

            ReactDOM.render( scene, container )
        }

    //
    // ─── CREATE SCENE ───────────────────────────────────────────────────────────────
    //

        function createScence ( model: Storage.IModel ) {
            const layerElements = [
                Render.Layers.Shapes.render( model ),
                Render.Layers.Selection.render( model ),
            ]

            const layers =
                layerElements.map(( elements, index ) =>
                    renderLayer( index, elements ))

            return createMainSVG( layers )
        }

    //
    // ─── CREATE MAIN SVG ELEMENT ────────────────────────────────────────────────────
    //

        function createMainSVG ( layers: JSX.Element[ ] ) {
            return  <svg style = {{ width: "100vw", height: "100vh" }}>
                        { layers }
                    </svg>
        }

    //
    // ─── COMPOSE LAYERS ─────────────────────────────────────────────────────────────
    //

        function renderLayer ( layer: number, elements: ( JSX.Element | undefined )[ ] ) {
            return  <g key = { generateKey( ) }>
                        { elements }
                    </g>
        }

    // ────────────────────────────────────────────────────────────────────────────────

}