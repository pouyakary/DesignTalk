
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
            const guideLines    = createGuideLines( shape, state )
            const tooltip       = createToolTipShape( shape, state )
            const rectangle     = createSelectionRectangle( shape )
            const resizeHandle  = createResizeHandle( shape, state )
            const deleteButton  = createDeleteButton( shape, state )
            const colorButtons  = createColorButtons( shape, state )
            const shapeButtons  = changeShapeModelButtons( shape, state )

            return [
                ...guideLines,
                ...tooltip,
                rectangle,
                resizeHandle,
                deleteButton,
                colorButtons,
                ...shapeButtons,
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

        function createToolTipShape ( shape: Storage.IShape, state: Storage.IModel ) {
            const x =
                shape.x - margin
            const y =
                shape.y - margin

            const descriptionText =
                getDescriptionText( shape, state )

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
    // ─── DESCRIPTION TEXT ───────────────────────────────────────────────────────────
    //

        function getDescriptionText ( shape: Storage.IShape, state: Storage.IModel ) {
            if ( state.showLineGuides && state.mouseMode === Storage.MouseMode.Resize )
                return 'SIZE ' + shape.width + ':' + shape.height

            if ( state.showLineGuides && state.mouseMode === Storage.MouseMode.Move )
                return 'X ' + shape.x + ' • Y ' + shape.y

            return 'X ' + shape.x + ' • Y ' + shape.y + ' • SIZE ' + shape.width + ':' + shape.height
        }

    //
    // ─── CREATE GUIDE LINES ─────────────────────────────────────────────────────────
    //

        function createGuideLines ( shape: Storage.IShape, model: Storage.IModel ) {
            if ( !model.showLineGuides )
                return [ ]

            const collectionOfHoroizontalPoints = new Set<number>( )
            const collectionOfVerticalPoints = new Set<number>( )
            const collectionOfMiddleHoroizontalPoints = new Set<number>( )
            const collectionOfMiddleVerticalPoints = new Set<number>( )

            model.shapes.map( obj => {
                if ( shape.id === obj.id ) return

                collectionOfVerticalPoints.add( obj.x )
                collectionOfHoroizontalPoints.add( obj.y )
                collectionOfVerticalPoints.add( obj.x + obj.width )
                collectionOfHoroizontalPoints.add( obj.y + obj.height )
                collectionOfMiddleVerticalPoints.add( obj.x + ( obj.width / 2 ) )
                collectionOfMiddleHoroizontalPoints.add( obj.y + ( obj.height / 2 ) )
            })


            enum LineDirection { Horoizantal, Vertical }
            const createLine = ( x1: number, y1: number, x2: number, y2: number, direction: LineDirection ) => {
                const normalCollection =
                    ( direction === LineDirection.Horoizantal
                        ? collectionOfHoroizontalPoints
                        : collectionOfVerticalPoints
                        )

                const middleCollection =
                    ( direction === LineDirection.Horoizantal
                        ? collectionOfMiddleHoroizontalPoints
                        : collectionOfMiddleVerticalPoints
                        )

                function isThereANormalPoint ( ) {
                    return  normalCollection.has( x1 ) || normalCollection.has( y1 ) ||
                            normalCollection.has( x2 ) || normalCollection.has( y2 )
                }

                const isThereMiddlePoint = (
                    middleCollection.has( x1 ) || middleCollection.has( x2 ) ||
                    middleCollection.has( y1 ) || middleCollection.has( y2 )
                )

                const lineColor =
                    ( isThereMiddlePoint
                        ?   'red'
                        :   ( isThereANormalPoint( ) ? 'cyan' : '#ccc' )
                        )

                const lineStrokeWidth =
                    ( lineColor !== '#ccc' ? 2 : 1 )

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

            const buttonText =
                'DEL'
            const textLength =
                computeHaskligBold12TextLength( buttonText )
            const x =
                shape.x - margin - textLength - 10
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
                     width = { textLength }
                    height = { textBackgroundHeight }
               strokeWidth = { 2 }
                    stroke = "black" />


            const deleteText =
                <text fill = "Black"
                         x = { x + 6 }
                         y = { y - textBackgroundHeight + 6 }
                fontFamily = "HaskligBold"
                  fontSize = "12">
                    { buttonText }
                </text>

            const buttonableLayer =
                <rect  x = { x }
                       y = { y - textBackgroundHeight - 10 }
                   width = { textLength }
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
                [ 'red', 'black', 'blue' ]
                .filter( x => shape.color !== x )

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

    //
    // ─── CHANGE SHAPE BUTTON ────────────────────────────────────────────────────────
    //

        function changeShapeModelButtons ( shape: Storage.IShape, state: Storage.IModel ) {
            if ( state.showLineGuides )
                return [ <g key = { generateKey( ) } /> ]


            function onChangeShapeType ( ) {
                Storage.setState( state => {
                    const newShapes =
                        state.shapes.map( x => {
                            if ( shape.id === x.id )
                                return { ...x,
                                    type: ( x.id == shape.id && x.type === 'rect' )?
                                        'circle' : 'rect' as Storage.IShapeType
                                }
                            else
                                return x
                        })

                    return {
                        ...state, shapes: newShapes
                    }
                })
            }

            const x =
                shape.x - 2 * margin - textBackgroundHeight
            const y =
                shape.y + 1 * ( textBackgroundHeight )

            const mainBackground =
                <rect x = { x }
                      y = { y }
                  width = { textBackgroundHeight }
                 height = { textBackgroundHeight }
                 stroke = "black"
                    key = { generateKey( ) }
            strokeWidth = "2"
                   fill = "#eee" />


            const shapeSize =
                textBackgroundHeight - 10
            const halfShape =
                shapeSize / 2
            const shapeIcon =
                ( shape.type === 'circle'
                    ? <rect x = { x + 5 } y = { y + 5 } width = { shapeSize } height = { shapeSize } fill="black" />
                    : <circle cx = { x + 5 + halfShape } cy = { y + 5 + halfShape } r = { shapeSize / 2 }  fill="black" />
                    )


            const transparentButtonableRect =
                <rect x = { x }
                      y = { y }
                 height = { textBackgroundHeight }
                  width = { textBackgroundHeight }
                onClick = { event => onChangeShapeType( ) }
                   fill = "transparent" />


            return [
                mainBackground,
                shapeIcon,
                transparentButtonableRect,
            ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}