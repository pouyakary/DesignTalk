
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace DesignTalk {

    //
    // ─── CHOOSE RANDOM ──────────────────────────────────────────────────────────────
    //

        export function chooseRandom<T> ( arr: T[ ] ): T {
            return arr[ Math.floor( Math.random( ) * arr.length ) ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}