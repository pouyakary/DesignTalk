
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/model.ts" />
/// <reference path="../globals/key.ts" />
/// <reference path="layers/background.tsx" />
/// <reference path="layers/shapes.tsx" />
/// <reference path="layers/selection.ts" />
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
                Render.Layers.Background.render( ),
                Render.Layers.Shapes.render( model ),
                Render.Layers.Selection.render( model ),
            ]

            const layers =
                layerElements.map(( elements, index ) =>
                    renderLayer( index, elements ))

            return  <div>
                        { createMainSVG( layers ) }
                        { addNewShapeButton( ) }
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
    // ─── ON NEW SHAPE ───────────────────────────────────────────────────────────────
    //

        function addNewShapeButton ( ) {
            function onAddNewShape ( ) {
                Storage.setState( state => {
                    const maxZIndex =
                        Math.max( ...state.shapes.map( x => x.zIndex ) )
                    const newShape =
                        Storage.createShape( maxZIndex + 1 )

                    state.shapes.push( newShape )

                    return { ...state,
                        selectedId: newShape.id,
                        mouseMode: Storage.MouseMode.Move
                    }
                })
            }

            return  <div onClick = { event => onAddNewShape( ) }
                           style = {{
                            position:           "fixed",
                            top:                '13pt',
                            left:               '120pt',
                            backgroundColor:    'yellow',
                            fontSize:           '12px',
                            fontFamily:         'HaskligBold',
                            borderWidth:        '2px',
                            borderStyle:        'solid',
                            borderColor:        'black',
                            paddingBottom:      '5px',
                            paddingTop:         '3px',
                            paddingLeft:        '7px',
                            paddingRight:       '8px',
                            MozUserSelect:      'none',
                            WebkitUserSelect:   'none',
                            msUserSelect:       'none',
                        }}>
                        ADD NEW SHAPE
                    </div>
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