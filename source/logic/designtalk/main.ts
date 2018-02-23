
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//


namespace Shapes.DesignTalk {

    //
    // ─── PARSE ──────────────────────────────────────────────────────────────────────
    //

        export function isParsable ( code: string ): boolean {
            try {
                DesignTalkParser.parse( code )
                return true
            } catch {
                return false
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}