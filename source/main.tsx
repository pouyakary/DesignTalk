
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved
//   This code is property of Pouya Kary and is in no way granted
//   to be used by anyone else in anyways.
//

/// <reference path="storage/base-model" />
/// <reference path="render/main" />



namespace BasiceShapeEditor {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        window.onload = ( ) => main( )

        function main ( ) {
            const state = Storage.createInitialModelState( )
            Render.renderApp( state )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
