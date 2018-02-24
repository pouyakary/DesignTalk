
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="./storage/storage" />
/// <reference path="./drivers/mouse" />
/// <reference path="./drivers/screen" />

namespace Shapes {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        window.onload = ( ) => {
            Storage.initStorage( )
            
            MouseDriver.init( )
            ScreenDriver.init( )

            window.onresize = ( ) =>
                Render.renderOnResize( )
        }


    // ────────────────────────────────────────────────────────────────────────────────

}
