
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

            for ( let counter = 0; counter < 10; counter++ )
                someShapes.push( createShape( counter ) )

            return {
                shapes:         someShapes,
                hoveredId:      null,
                selectedId:     null,
                mouseMode:      MouseMode.Move
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

        function createShape ( no: number ): IShape {
            const color =
                chooseRandom([ 'red', 'black', 'blue' ])
            const type =
                chooseRandom([ 'rect', 'circle' ]) as IShapeType
            const { x, y } =
                getRandomCoordinates( )

            return {
                color:      color,
                id:         generateKey( ),
                type:       type,
                width:      100,
                height:     100,
                x:          x,
                y:          y,
                zIndex:     no,
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}