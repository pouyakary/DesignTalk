
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
    // ─── CREATE SELECTION TOOL ──────────────────────────────────────────────────────
    //

        function createSelectionTool ( model: Storage.IModel ) {
            const shape =
                model.shapes.find( shape =>
                    shape.id === model.selectedId )!

            const guideLines = createGuideLines( shape, model )
            const tooltip = createToolTipShape( shape )
            const rectangle = createSelectionRectangle( shape )

            return [
                ...guideLines,
                ...tooltip,
                rectangle,
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
            const size =
                shape.size + margin * 2

            const rectangle =
                <rect   fill = "transparent"
                      stroke = "black"
                 strokeWidth = "2"
                           x = { x }
                           y = { y }
                       width = { size }
                      height = { size } />

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
                'X: ' + x + ' / Y: ' + y + ' / Size: ' + shape.size

            const descriptionBackgroundHeight =
                25
            const descriptionBackground =
                <rect   fill = "yellow"
                           x = { x }
                           y = { y - descriptionBackgroundHeight - 10 }
                       width = { descriptionText.length * 7.5 + 10 }
                      height = { descriptionBackgroundHeight }
                      stroke = "black"
                 strokeWidth = { 2 } />


            const description =
                <text x = { x + strokeWidth + 6 }
                      y = { y - descriptionBackgroundHeight + 6 }
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
            if ( !MouseDriver.Clicked )
                return [ ]

            const collectionOfHoroizontalPoints = new Set<number>( )
            const collectionOfVerticalPoints = new Set<number>( )
            model.shapes.map( obj => {
                if ( shape.id === obj.id ) return

                collectionOfVerticalPoints.add( obj.x )
                collectionOfHoroizontalPoints.add( obj.y )
                collectionOfVerticalPoints.add( obj.x + obj.size )
                collectionOfHoroizontalPoints.add( obj.y + obj.size )
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
                createLine( 0, shape.y + shape.size,
                            window.innerWidth, shape.y + shape.size,
                            LineDirection.Horoizantal )

            const leftGuideLine =
                createLine( shape.x, 0,
                            shape.x, window.innerHeight,
                            LineDirection.Vertical )

            const rightGuideLine =
                createLine( shape.x + shape.size, 0,
                            shape.x + shape.size, window.innerHeight,
                            LineDirection.Vertical )

            return [
                topGuideLine,
                rightGuideLine,
                bottomGuideLine,
                leftGuideLine
            ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}