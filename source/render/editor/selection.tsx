
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../storage/storage.ts" />
/// <reference path="../../drivers/mouse.ts" />

namespace BasiceShapeEditor.Render.SelectionTool {

    //
    // ─── SETTINGS ───────────────────────────────────────────────────────────────────
    //

        const margin = 10
        const strokeWidth = 2

        const textBackgroundHeight = 25

    //
    // ─── SHOW SELECTION ─────────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            if ( model.selectedId )
                return createSelectionTool( model )
            else
                return [ undefined ]
        }

    //
    // ─── TOOLS ──────────────────────────────────────────────────────────────────────
    //

        function computeHaskligBold12TextLength ( text: string ) {
            return text.length * 7.5 + 10
        }

    //
    // ─── CREATE SELECTION TOOL ──────────────────────────────────────────────────────
    //

        function createSelectionTool ( state: Storage.IModel ) {
            const shape =
                state.shapes.find( shape =>
                    shape.id === state.selectedId )!

            // order is important
            const guideLines = createGuideLines( shape, state )
            const tooltip = createToolTipShape( shape )
            const rectangle = createSelectionRectangle( shape )
            const resizeHandle = createResizeHandle( shape, state )
            const deleteButton = createDeleteButton( shape, state )
            const colorButtons = createColorButtons( shape, state )

            return [
                ...guideLines,
                ...tooltip,
                rectangle,
                resizeHandle,
                deleteButton,
                colorButtons,
            ]
        }

    //
    // ─── CREATE RECTANGLE ───────────────────────────────────────────────────────────
    //

        function createSelectionRectangle ( shape: Storage.IShape ) {
            const x =
                shape.x - margin
            const y =
                shape.y - margin
            const width =
                shape.width + margin * 2
            const height =
                shape.height + margin * 2

            const onMouseLeave = ( ) =>
                Storage.setState( state =>
                    ({ ...state, showLineGuides: false }))

            const rectangle =
                <rect   fill = "transparent"
                      stroke = "black"
                 strokeWidth = "2"
                         key = { generateKey( ) }
                onMouseLeave = { event => onMouseLeave( ) }
                           x = { x }
                           y = { y }
                       width = { width }
                      height = { height } />

            return rectangle
        }

    //
    // ─── TIP TEXT BOX ───────────────────────────────────────────────────────────────
    //

        function createToolTipShape ( shape: Storage.IShape ) {
            const x =
                shape.x - margin
            const y =
                shape.y - margin

            const descriptionText =
                'X ' + x + ' • Y ' + y + ' • SIZE ' + shape.width + ':' + shape.height

            const descriptionBackground =
                <rect   fill = "yellow"
                         key = { generateKey( ) }
                           x = { x }
                           y = { y - textBackgroundHeight - 10 }
                       width = { computeHaskligBold12TextLength( descriptionText ) }
                      height = { textBackgroundHeight }
                      stroke = "black"
                 strokeWidth = { 2 } />


            const description =
                <text x = { x + strokeWidth + 6 }
                      y = { y - textBackgroundHeight + 6 }
                    key = { generateKey( ) }
                   fill = "black"
             fontFamily = "HaskligBold"
               fontSize = "12">
                    { descriptionText }
                </text>

            return [
                descriptionBackground,
                description,
            ]
        }

    //
    // ─── CREATE GUIDE LINES ─────────────────────────────────────────────────────────
    //

        function createGuideLines ( shape: Storage.IShape, model: Storage.IModel ) {
            if ( !model.showLineGuides )
                return [ ]

            const collectionOfHoroizontalPoints = new Set<number>( )
            const collectionOfVerticalPoints = new Set<number>( )
            model.shapes.map( obj => {
                if ( shape.id === obj.id ) return
                collectionOfVerticalPoints.add( obj.x )
                collectionOfHoroizontalPoints.add( obj.y )
                collectionOfVerticalPoints.add( obj.x + obj.width )
                collectionOfHoroizontalPoints.add( obj.y + obj.height )
            })


            enum LineDirection { Horoizantal, Vertical }
            const createLine = ( x1: number, y1: number, x2: number, y2: number, direction: LineDirection ) => {
                const collection =
                    ( direction === LineDirection.Horoizantal
                        ? collectionOfHoroizontalPoints
                        : collectionOfVerticalPoints
                        )

                const isTherePoint = (
                    collection.has( x1 ) || collection.has( y1 ) ||
                    collection.has( x2 ) || collection.has( y2 ) )

                const lineColor =
                    ( isTherePoint? 'cyan' : '#ccc' )
                const lineStrokeWidth =
                    ( isTherePoint? 2 : 1 )

                return  <line strokeWidth = { lineStrokeWidth }
                                   stroke = { lineColor }
                                      key = { generateKey( ) }
                                       x1 = { x1 }
                                       y1 = { y1 }
                                       x2 = { x2 }
                                       y2 = { y2 } />
            }


            const topGuideLine =
                createLine( 0, shape.y,
                            window.innerWidth, shape.y,
                            LineDirection.Horoizantal )

            const bottomGuideLine =
                createLine( 0, shape.y + shape.height,
                            window.innerWidth, shape.y + shape.height,
                            LineDirection.Horoizantal )

            const leftGuideLine =
                createLine( shape.x, 0,
                            shape.x, window.innerHeight,
                            LineDirection.Vertical )

            const rightGuideLine =
                createLine( shape.x + shape.width, 0,
                            shape.x + shape.width, window.innerHeight,
                            LineDirection.Vertical )

            return [
                topGuideLine,
                rightGuideLine,
                bottomGuideLine,
                leftGuideLine
            ]
        }

    //
    // ─── CREATE RESIZE BUTTON ───────────────────────────────────────────────────────
    //

        function createResizeHandle ( shape: Storage.IShape, state: Storage.IModel ) {
            const x = shape.x + shape.width + margin
            const y = shape.y + shape.height + margin

            const setMouseMoveMode = ( mode: Storage.MouseMode ) =>
                Storage.setState( state =>
                    ({ ...state, mouseMode: mode }))

            const setToResize = ( ) =>
                setMouseMoveMode( Storage.MouseMode.Resize )

            const setToMove = ( ) =>
                setMouseMoveMode( Storage.MouseMode.Move )

            const radius =
                state.mouseMode === Storage.MouseMode.Resize ? 5 : 7

            return  <circle fill = "black"
                              cx = { x }
                              cy = { y }
                    onMouseEnter = { event => setToResize( ) }
                    onMouseLeave = { event => setToMove( ) }
                             key = { generateKey( ) }
                               r = { radius } />
        }

    //
    // ─── REMOVE BOTTON ──────────────────────────────────────────────────────────────
    //

        function createDeleteButton ( shape: Storage.IShape, state: Storage.IModel ) {
            if ( state.showLineGuides )
                return <g key = { generateKey( ) } />

            const x =
                shape.x - margin - computeHaskligBold12TextLength( 'DEL' ) - 10
            const y =
                shape.y - margin

            function onDeleteButtonClicked ( ) {
                const newShapes = state.shapes.filter( element =>
                    element.id !== state.selectedId )
                Storage.setState( state => ({
                    ...state,
                    shapes: newShapes,
                    selectedId: null,
                    mouseMode: Storage.MouseMode.Move,
                    showLineGuides: false
                }))
            }

            const backgroundRect =
                <rect fill = "#eee"
                         x = { x }
                         y = { y - textBackgroundHeight - 10 }
                     width = { computeHaskligBold12TextLength( 'DEL' ) }
                    height = { textBackgroundHeight }
               strokeWidth = { 2 }
                    stroke = "black" />


            const deleteText =
                <text fill = "Black"
                         x = { x + 6 }
                         y = { y - textBackgroundHeight + 6 }
                fontFamily = "HaskligBold"
                  fontSize = "12">
                    DEL
                </text>

            const buttonableLayer =
                <rect  x = { x }
                       y = { y - textBackgroundHeight - 10 }
                   width = { computeHaskligBold12TextLength( 'DEL' ) }
                  height = { textBackgroundHeight }
                 onClick = { event => onDeleteButtonClicked( ) }
                    fill = "transparent" />

            return  <g key = { generateKey( ) }>
                        { backgroundRect }
                        { deleteText }
                        { buttonableLayer }
                    </g>
        }

    //
    // ─── COLOR BUTTONS ──────────────────────────────────────────────────────────────
    //

        function createColorButtons ( shape: Storage.IShape, state: Storage.IModel ) {
            if ( state.showLineGuides )
                return <g key = { generateKey( ) } />

            const colors =
                [ 'red', 'black', 'blue' ].filter( x => shape.color !== x )

            const buttons =
                colors.map(( color, index ) =>
                    createSingleColorButton( color, index + 1, shape ))

            return  <g key = { generateKey( ) }>
                        { buttons }
                    </g>
        }

        function createSingleColorButton ( color: string,
                                           index: number,
                                           shape: Storage.IShape ) {
            const x =
                shape.x - margin - 5 - index * ( textBackgroundHeight + 5 )

            function onSetColor ( ) {
                Storage.setState( state => {
                    const newShapes =
                        state.shapes.map( x => ({
                            ...x,
                            color: x.id === shape.id ? color : x.color,
                        }))

                    return { ...state, shapes: newShapes }
                })
            }

            const button =
                <rect x = { x }
                      y = { shape.y - margin }
                  width = { textBackgroundHeight }
                 height = { textBackgroundHeight }
                   fill = { color }
                    key = { generateKey( ) }
                onClick = { event => onSetColor( ) }
            strokeWidth = "2"
                 stroke = "black" />

            return button
        }

    // ────────────────────────────────────────────────────────────────────────────────

}