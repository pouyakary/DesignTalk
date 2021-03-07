
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace DesignTalk.LanguageCore {

    //
    // ─── PARSE ──────────────────────────────────────────────────────────────────────
    //

        export function isParsable ( code: string ): boolean {
            try {
                LanguageCore.Core.parse( code )
                return true
            } catch {
                return false
            }
        }

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        export function runWithGivenState ( code: string, state: Storage.Model ) {
            return LanguageCore.Core.run( code, state )
        }

    //
    // ─── RUN AND APPLY ──────────────────────────────────────────────────────────────
    //

        export function runAndApply ( code: string ) {
            Storage.setState( state =>
                LanguageCore.Core.run( code, state ))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}