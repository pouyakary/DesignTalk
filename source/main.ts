
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="./storage/storage" />
/// <reference path="./drivers/mouse" />
/// <reference path="./drivers/screen" />
/// <reference path="./logic/state-manipulators/main" />

namespace Shapes {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        window.onload = ( ) => {
            if ( window.location.protocol === "http" ) {
                window.location.protocol = "https"
            }

            Storage.initStorage( )

            StateManipulators.init( )
            MouseDriver.init( )
            ScreenDriver.init( )

            window.onresize = ( ) =>
                Render.renderOnResize( )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
