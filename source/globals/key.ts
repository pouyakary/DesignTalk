
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace BasiceShapeEditor {

    //
    // ─── CREATE UNIQUE KEY ──────────────────────────────────────────────────────────
    //

        let keyValue = 1;
        export function generateKey ( ) {
            return ( keyValue++ ).toString( )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}