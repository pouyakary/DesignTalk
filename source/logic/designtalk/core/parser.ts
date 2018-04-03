
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.DesignTalk.Core {

    //
    // ─── REGEXPS ────────────────────────────────────────────────────────────────────
    //

        const normalizationRegExp =
            /(?:'|\bthe\b)/g

    //
    // ─── PARSE ──────────────────────────────────────────────────────────────────────
    //

        export function parse ( code: string ): AST {
            const normalizedCode = normalize( code )
            return DesignTalkParser.parse( normalizedCode )
        }
    
    //
    // ─── LANGUAGE NORMALIZER ────────────────────────────────────────────────────────
    //

        function normalize ( code: string ): string {
            return code.replace( normalizationRegExp, '' )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}