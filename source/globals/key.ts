
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace DesignTalk {

    //
    // ─── CREATE UNIQUE KEY ──────────────────────────────────────────────────────────
    //

        let __KeyValueStorage = 1;
        export function generateKey ( ) {
            return ( __KeyValueStorage++ ).toString( )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}