
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../drivers/screen" />

namespace Shapes.DesignTalk.Core {

    //
    // ─── GET PIXEL ──────────────────────────────────────────────────────────────────
    //

        export function convertSizeToPixel( size: number, unit: Unit ): number {
            switch ( unit ) {
                case 'point':
                    return pointToPixel( size )

                case 'pixel':
                default:
                    return size
            }
        }

    //
    // ─── GET PIXEL NUMBER ───────────────────────────────────────────────────────────
    //

        export function pointToPixel ( points: number ) {
            return points * ScreenDriver.PointSize
        }

    // ────────────────────────────────────────────────────────────────────────────────

}