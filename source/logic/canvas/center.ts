

//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace DesignTalk.Logic.Canvas {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //

        export interface CroppedShapes {
            width:  number
            height: number
            code:   Storage.Shape[ ]
        }

    //
    // ─── GET CROPPED SHAPES ─────────────────────────────────────────────────────────
    //

        export function getCroppedShapes ( shapes: Storage.Shape[ ] ): CroppedShapes {
            let minX =   Infinity
            let minY =   Infinity
            let maxX = - Infinity
            let maxY = - Infinity

            for ( const shape of shapes ) {
                if ( shape.x < minX )
                    minX = shape.x
                if ( shape.x + shape.width > maxX )
                    maxX = shape.x + shape.width
                if ( shape.y < minY )
                    minY = shape.y
                if ( shape.y + shape.height > maxY )
                    maxY = shape.y + shape.height
            }

            const resultCode =
                shapes.map( shape => ({ ...shape,
                    x:  shape.x - minX,
                    y:  shape.y - minY,
                }))

            const result: CroppedShapes = {
                height:     maxY - minY,
                width:      maxX - minX,
                code:       resultCode
            }

            return result
        }

    //
    // ─── GET CENTERED SHAPES ────────────────────────────────────────────────────────
    //

        export function getScreenCenteredShapes ( model: CroppedShapes ): Storage.Shape[ ] {
            const additionalX =
                Math.floor( ( window.innerWidth - model.width ) / 2 )
            const additionalY =
                Math.floor( ( window.innerHeight- model.height ) / 2 )

            const resultShapes =
                model.code.map( shape => ({ ...shape,
                    x: shape.x + additionalX,
                    y: shape.y + additionalY
                }))

            return resultShapes
        }

    //
    // ─── CENTER DRAWINGS ────────────────────────────────────────────────────────────
    //

        export function centerDrawingsInTheCanvas ( ) {
            Storage.setState( state => ({
                ...state,
                shapes: getScreenCenteredShapes( getCroppedShapes( state.shapes ) )
            }))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}