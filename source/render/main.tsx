
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="layers/background.tsx" />
/// <reference path="layers/shapes.tsx" />
/// <reference path="layers/selection.ts" />
/// <reference path="layers/speach.tsx" />

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
                Render.Layers.Background.render( ),
                Render.Layers.Shapes.render( model ),
                Render.Layers.Selection.render( model ),
                Render.Layers.SpeachRecognizer.render( model ),
            ]

            const layers =
                layerElements.map(( elements, index ) =>
                    renderLayer( index, elements ))

            return  <div>
                        { createMainSVG( layers ) }
                        { addNewShapeButton( ) }
                        { clearDisplayButton( ) }
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
    // ─── CONST WINDOW BUTTON STYLES ─────────────────────────────────────────────────
    //

        const WindowDivButtonStyle = {
            position:           "fixed",
            top:                '13pt',
            left:               '120pt',
            backgroundColor:    '#eee',
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
        }

    //
    // ─── ON NEW SHAPE ───────────────────────────────────────────────────────────────
    //

        function addNewShapeButton ( ) {
            function onAddNewShape ( ) {
                Storage.setState( state => {
                    const newMaxZIndex =
                        state.maxZIndex + 1
                    const newShape =
                        Storage.createShape( newMaxZIndex )

                    state.shapes.push( newShape )

                    return { ...state,
                        selectedId: newShape.id,
                        mouseMode: Storage.MouseMode.Move,
                        maxZIndex: newMaxZIndex,
                        showLineGuides: false,
                    }
                })
            }

            return  <div onClick = { event => onAddNewShape( ) }
                           style = {{ ...WindowDivButtonStyle, left: '120pt' } as any }>
                        ADD NEW SHAPE
                    </div>
        }

    //
    // ─── ON CLEAR ALL SHAPES ────────────────────────────────────────────────────────
    //

        function clearDisplayButton ( ) {
            function onDeleteAllShapes ( ) {
                Storage.setState( state => ({ ...state,
                    shapes: [ ],
                    selectedId: null,
                    mouseMode: Storage.MouseMode.Move
                }))
            }

            return  <div onClick = { event => onDeleteAllShapes( ) }
                           style = {{ ...WindowDivButtonStyle, left: '210pt' } as any }>
                        DEL SHAPES
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