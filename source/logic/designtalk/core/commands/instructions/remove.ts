
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../../../storage/storage" />
/// <reference path="../../typings/ast" />
/// <reference path="../../typings/functionset" />

namespace Shapes.DesignTalk.Core.CommandCompiler {

    //
    // ─── GENERATE MANIPULATION FUNCTION ─────────────────────────────────────────────
    //

        export function generateRemoveInstruction ( instruction: RemoveInstruction ) {
            return ( shapes: Storage.Shape[ ] ) =>
                shapes.map( shape =>
                    ({ ...shape, remove: true }))
        }

    // ────────────────────────────────────────────────────────────────────────────────

}