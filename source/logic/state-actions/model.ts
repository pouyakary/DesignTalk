


//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace DesignTalk.Logic.Model {

    //
    // ─── NEW SHAPE ──────────────────────────────────────────────────────────────────
    //

        export function createNewShape ( ) {
            Storage.setState( state => {
                const newMaxZIndex =
                    state.maxZIndex + 1
                const newShape =
                    Storage.createRandomShape( newMaxZIndex )

                state.shapes.push( newShape )

                return { ...state,
                    selectedId:         newShape.id,
                    mouseMode:          Storage.MouseMode.Move,
                    maxZIndex:          newMaxZIndex,
                    showLineGuides:     false,
                }
            })
        }

    //
    // ─── DUPLICATE SHAPE ────────────────────────────────────────────────────────────
    //

        export function duplicateShape ( ) {
            Storage.setState( state => {
                if ( state.selectedId === null )
                    return state

                const newMaxZIndex =
                    state.maxZIndex + 1
                const currentShape =
                    state.shapes.find( shape => shape.id === state.selectedId )!
                const newShape =
                    Storage.duplicateShape( newMaxZIndex, currentShape )

                state.shapes.push( newShape )

                return { ...state,
                    selectedId:         newShape.id,
                    mouseMode:          Storage.MouseMode.Move,
                    maxZIndex:          newMaxZIndex,
                    showLineGuides:     false,
                }
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
