
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model.ts" />
/// <reference path="../globals/key.ts" />

namespace BasiceShapeEditor.Storage {

    //
    // ─── INITIAL MODEL ──────────────────────────────────────────────────────────────
    //

        export function createInitialModelState ( ): IModel {
            const someShapes = new Array<IShape>( )

            for ( let i = 0; i < 20; i++ )
                someShapes.push( createShape( ) )

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
    // ─── RANDOM COORDINATES ─────────────────────────────────────────────────────────
    //

        function getRandomCoordinates ( ) {
            const randomSize = ( size: number ) =>
                Math.floor( Math.random( ) * ( size - 300 ) ) + 100

            return {
                x: randomSize( window.innerWidth ),
                y: randomSize( window.innerHeight ),
            }
        }

    //
    // ─── CREATE SHAPE ───────────────────────────────────────────────────────────────
    //

        function createShape ( ): IShape {
            const color =
                chooseRandom([ 'red', 'black', 'blue' ])
            const type =
                chooseRandom([ 'rect', 'circle' ]) as IShapeType
            const { x, y } =
                getRandomCoordinates( )

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