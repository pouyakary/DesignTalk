
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//


namespace Shapes.ScreenDriver {

    //
    // ─── DPI ────────────────────────────────────────────────────────────────────────
    //

        export var PointSize = 0

    //
    // ─── GET DPI ────────────────────────────────────────────────────────────────────
    //

        export function init( ) {
            const div =
                document.getElementById('dpi')!

            div.style.width = '1pt'

            var result = window
                .getComputedStyle( div )
                .getPropertyValue( 'width' )

            const pointSize =
                parseFloat( result )

            PointSize = pointSize
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
