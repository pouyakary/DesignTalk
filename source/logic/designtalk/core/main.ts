
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../storage/storage" />

namespace Shapes.DesignTalk.Core {

    //
    // ─── INTERFACES ─────────────────────────────────────────────────────────────────
    //

        export interface CompiledDesignTalk {
            queryFunction: ( shapes: Storage.IShape[ ] ) => Storage.IShape,
            manipulationFunction: ( state: Storage.IModel ) => Storage.IModel,
        }

    //
    // ─── COMPILE ────────────────────────────────────────────────────────────────────
    //

        

    // ────────────────────────────────────────────────────────────────────────────────

}