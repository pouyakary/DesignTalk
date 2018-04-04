
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace DesignTalk.StateManipulators {

    //
    // ─── DELETOR ────────────────────────────────────────────────────────────────────
    //

        export const ShapeDeleteManipulator: Storage.OnStateChangeManipulationFunction =
            ( state: Storage.Model ) => ({
                ...state,
                shapes: state.shapes.filter( x => !x.remove )
            })

    // ────────────────────────────────────────────────────────────────────────────────

}