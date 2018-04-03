
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.DesignTalk.Core {

    //
    // ─── FUNCTION SET ───────────────────────────────────────────────────────────────
    //

        export interface FunctionSet {
            manipulationFunction:   ManipulationFunction,
            queryFunction:          QueryFunction,
        }

    //
    // ─── QUERY FUNCTION ─────────────────────────────────────────────────────────────
    //

        export type QueryFunction =
            ( shapes: Storage.Shape[ ] ) => Storage.Shape[ ]

    //
    // ─── MANIPULATION FUNCTION ──────────────────────────────────────────────────────
    //

        export type ManipulationFunction =
            ( state: Storage.Shape[ ] ) => Storage.Shape[ ]

    // ────────────────────────────────────────────────────────────────────────────────

}