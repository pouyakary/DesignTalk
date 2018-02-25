
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="deletor" />

namespace Shapes.StateManipulotrs {

    //
    // ─── INIT ───────────────────────────────────────────────────────────────────────
    //

        export function init ( ) {
            Storage.addManipulationFunction( ShapeDeleteManipulator )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}