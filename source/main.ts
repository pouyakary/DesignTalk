
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="./storage/storage.ts" />
/// <reference path="./drivers/mouse.ts" />

namespace Shapes {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        window.onload = ( ) => main( )
        
        function main ( ) {
            Storage.initStorage( )
            MouseDriver.init( )
            
            window.onresize = ( ) => Render.renderOnResize( )
        }


    // ────────────────────────────────────────────────────────────────────────────────

}
