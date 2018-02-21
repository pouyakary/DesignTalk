
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="svg-layers/background.tsx" />
/// <reference path="svg-layers/shapes.tsx" />
/// <reference path="svg-layers/selection.ts" />

/// <reference path="html-layers/speach.tsx" />

/// <reference path="../storage/model.ts" />
/// <reference path="../globals/key.ts" />
/// <reference path="../storage/base-model.ts" />


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
                Render.SVGLayers.Background.render( ),
                Render.SVGLayers.Shapes.render( model ),
                Render.SVGLayers.Selection.render( model ),
            ]

            const layers =
                layerElements.map(( elements, index ) =>
                    renderLayer( index, elements ))

            return  <div>
                        { createMainSVG( layers ) }
                        { Render.HTMLLayers.SpeachRecognizer.render( model ) }
                    </div>
        }

    //
    // ─── CREATE MAIN SVG ELEMENT ────────────────────────────────────────────────────
    //

        function createMainSVG ( layers: JSX.Element[ ] ) {
            return  <svg style = {{ width: "100vw", height: "100vh" }}
                           key = { generateKey( ) }>
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