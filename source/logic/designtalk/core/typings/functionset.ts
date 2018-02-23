
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.DesignTalk.Core {

    //
    // ─── FUNCTION SET ───────────────────────────────────────────────────────────────
    //

        export interface CompiledFunctionSet {
            queryFunction:          QueryFunction,
            manipulationFunction:   ManipulationFuction,
        }

    //
    // ─── QUERY FUNCTION ─────────────────────────────────────────────────────────────
    //

        export type QueryFunction =
            ( shapes: Storage.IShape[ ] ) => Storage.IShape[ ]

    //
    // ─── MANIPULATION FUNCTION ──────────────────────────────────────────────────────
    //

        export type ManipulationFuction =
            ( state: Storage.IShape ) => Storage.IShape

    // ────────────────────────────────────────────────────────────────────────────────

}