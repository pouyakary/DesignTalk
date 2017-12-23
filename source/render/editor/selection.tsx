
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../storage/storage.ts" />

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

            const guideLines = createGuideLines( shape )
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
                shape.width + margin * 2

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
                'X: ' + x + ' / Y: ' + y + ' / Size: ' + shape.width

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

        function createGuideLines ( shape: Storage.IShape ) {
            return [ ];

            // const createLine = ( x1: number, y1: number, x2: number, y2: number ) =>
            //     <line
            //               strokeWidth = { 1 }
            //                    stroke = "#ccc"
            //                       key = { generateKey( ) }
            //                        x1 = { x1 }
            //                        y1 = { y1 }
            //                        x2 = { x2 }
            //                        y2 = { y2 } />

            // const topGuideLine =
            //     createLine( 0, shape.y,
            //                 window.innerWidth, shape.y )

            // const bottomGuideLine =
            //     createLine( 0, shape.y + shape.height,
            //                 window.innerWidth, shape.y + shape.height )

            // const leftGuideLine =
            //     createLine( shape.x, 0,
            //                 shape.x, window.innerHeight )

            // const rightGuideLine =
            //     createLine( shape.x + shape.width, 0,
            //                 shape.x + shape.width, window.innerHeight )

            // return [
            //     topGuideLine,
            //     rightGuideLine,
            //     bottomGuideLine,
            //     leftGuideLine
            // ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}