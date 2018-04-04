
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model.ts" />
/// <reference path="../globals/key.ts" />

namespace DesignTalk.Storage {

    //
    // ─── INITIAL MODEL ──────────────────────────────────────────────────────────────
    //

        export function createInitialModelState ( ): Model {
            const someShapes =
                new Array<Shape>( )
            const localStorageShapes =
                DesignTalk.LocalStorageDriver.load( )

            if ( localStorageShapes !== null ) {
                someShapes.push( ...localStorageShapes )
            } else {
                for ( let counter = 0; counter < 10; counter++ )
                    someShapes.push( createRandomShape( counter ) )
            }

            return {
                shapes:                 someShapes,
                showLineGuides:         false,
                selectedId:             null,
                previousSelectionIDs:   [ ],
                mouseMode:              MouseMode.Move,
                maxZIndex:              10,

                contextMenu: {
                    active:         false,
                    recognizer:     null,
                    recognizedText: "",
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

        export function createRandomShape ( zIndex: number ): Shape {
            const color =
                chooseRandom([ 'red', 'black', 'blue' ]) as ShapeColor
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


        export function duplicateShape ( zIndex: number, baseShape: Shape ): Shape {
            return {
                color:      baseShape.color,
                id:         generateKey( ),
                remove:     false,
                type:       baseShape.type,
                width:      baseShape.width,
                height:     baseShape.height,
                x:          baseShape.x + 15,
                y:          baseShape.y + 15,
                zIndex:     zIndex,
            }
        }


    // ────────────────────────────────────────────────────────────────────────────────

}