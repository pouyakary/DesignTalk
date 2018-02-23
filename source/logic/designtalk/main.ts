
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.DesignTalk {

    //
    // ─── PARSE ──────────────────────────────────────────────────────────────────────
    //

        export function isParsable ( code: string ): boolean {
            try {
                DesignTalk.Core.parse( code )
                return true
            } catch {
                return false
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}