
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/model" />
/// <reference path="layers/shapes" />
/// <reference path="../globals/key" />

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
                Render.Layers.Shapes.render( model )
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
            return <svg style = {{
                width:      "100vw",
                height:     "100vh",
            }}>
                { layers }
            </svg>
        }

    //
    // ─── COMPOSE LAYERS ─────────────────────────────────────────────────────────────
    //

        function renderLayer ( layer: number, elements: JSX.Element[ ] ) {
            return <g key={ generateKey( ) } style={{
                position:   'fixed',
                top:        0,
                left:       0,
                width:      "100vw",
                height:     "100vh",
                zIndex:     layer,
             }}>
                { elements }
            </g>
        }

    // ────────────────────────────────────────────────────────────────────────────────

}