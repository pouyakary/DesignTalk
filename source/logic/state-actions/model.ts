


//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace Shapes.Logic.Model {

    //
    // ─── NEW SHAPE ──────────────────────────────────────────────────────────────────
    //

        export function createNewShape ( ) {
            Storage.setState( state => {
                const newMaxZIndex =
                    state.maxZIndex + 1
                const newShape =
                    Storage.createShape( newMaxZIndex )

                state.shapes.push( newShape )

                return { ...state,
                    selectedId: newShape.id,
                    mouseMode: Storage.MouseMode.Move,
                    maxZIndex: newMaxZIndex,
                    showLineGuides: false,
                }
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
