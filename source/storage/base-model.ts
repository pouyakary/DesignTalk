
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model" />
/// <reference path="../globals/key" />

namespace BasiceShapeEditor.Storage {

    //
    // ─── INITIAL MODEL ──────────────────────────────────────────────────────────────
    //

        export function createInitialModelState ( ): IModel {
            const someShapes = [
                createShape( 100, 200 ),
                createShape( 200, 500 ),
                createShape( 400, 200 ),
            ]

            return {
                shapes: someShapes,
                selectedId: null
            }
        }

    //
    // ─── CHOOSE RANDOM ──────────────────────────────────────────────────────────────
    //

        function chooseRandom<T> ( arr: T[ ] ): T {
            return arr[ Math.floor( Math.random( ) * arr.length ) ]
        }

    //
    // ─── CREATE SHAPE ───────────────────────────────────────────────────────────────
    //

        function createShape ( x: number, y: number ): IShape {
            const color =
                chooseRandom([ 'red', 'black', 'blue' ])
            const type =
                chooseRandom([ 'rect', 'circle' ]) as IShapeType

            return {
                color:      color,
                height:     100,
                id:         generateKey( ),
                type:       type,
                width:      100,
                x:          x,
                y:          y,
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}