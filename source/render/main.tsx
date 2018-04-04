
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="svg-layers/background.tsx" />
/// <reference path="svg-layers/shapes.tsx" />
/// <reference path="svg-layers/selection.ts" />

/// <reference path="html-layers/rightclick.tsx" />

/// <reference path="../storage/model.ts" />
/// <reference path="../globals/key.ts" />
/// <reference path="../storage/base-model.ts" />


namespace DesignTalk.Render {

    //
    // ─── MAIN RENDERER ──────────────────────────────────────────────────────────────
    //

        export function renderApp ( model: Storage.Model ) {
            const container =
                document.getElementById('container')

            const scene =
                createScene( model )

            ReactDOM.render( scene, container )
        }

    //
    // ─── CREATE SCENE ───────────────────────────────────────────────────────────────
    //

        function createScene ( model: Storage.Model ) {
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
                        { Render.HTMLLayers.RightClick.render( model ) }
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

    //
    // ─── ON RESIZE ──────────────────────────────────────────────────────────────────
    //

        export function renderOnResize ( ) {
            Storage.setState( state => {
                const { innerHeight, innerWidth } = window

                const newShapes =
                    state.shapes.map( shape => ({ ...shape,
                        x: (( shape.x + shape.width < innerWidth )
                            ? shape.x
                            : innerWidth - shape.width - 10
                            ),

                        y: (( shape.y + shape.height < innerHeight )
                            ? shape.y
                            : innerHeight - shape.height - 10
                            )
                    }))

                return { ...state,
                    shapes: newShapes
                }
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}