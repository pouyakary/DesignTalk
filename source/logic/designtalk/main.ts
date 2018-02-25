
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

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        export function runWithGivenState ( code: string, state: Storage.Model ) {
            return DesignTalk.Core.run( code, state )
        }

    //
    // ─── RUN AND APPL ───────────────────────────────────────────────────────────────
    //

        export function runAndApply ( code: string ) {
            Storage.setState( state =>
                DesignTalk.Core.run( code, state ))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}