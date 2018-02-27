
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model.ts" />
/// <reference path="../globals/key.ts" />

namespace Shapes.Storage {

    //
    // ─── INITIAL MODEL ──────────────────────────────────────────────────────────────
    //

        export function createInitialModelState ( ): Model {
            const someShapes = new Array<Shape>( )

            for ( let counter = 0; counter < 10; counter++ )
                someShapes.push( createShape( counter ) )

            return {
                shapes:                 someShapes,
                showLineGuides:         false,
                selectedId:             null,
                previousSelectionIDs:   [ ],
                mouseMode:              MouseMode.Move,
                maxZIndex:              10,

                contexMenu: {
                    active:    false,
                    recognizer:     null,
                    recognizedText:    "",
                    mouseX:         0,
                    mouseY:         0,
                }
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

        export function createShape ( zIndex: number ): Shape {
            const color =
                chooseRandom([ 'red', 'black', 'blue' ])
            const type =
                chooseRandom([ 'rect', 'circle' ]) as ShapeType
            const { x, y } =
                getRandomCoordinates( )

            return {
                color:      color,
                id:         generateKey( ),
                remove:     false,
                type:       type,
                width:      100,
                height:     100,
                x:          x,
                y:          y,
                zIndex:     zIndex,
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}