
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />

namespace BasiceShapeEditor.MouseDriver {

    //
    // ─── STORAGE ────────────────────────────────────────────────────────────────────
    //

        export let X = 0
        export let Y = 0
        export let Clicked = false

        let shouldMove = false

    //
    // ─── MOUSE POSITION UPDATOR ─────────────────────────────────────────────────────
    //

        export function init ( ) {
            mouseClcikeEvents ( )
            mouseMoveEvents( )
        }

    //
    // ─── MOUSE MOVE EVENTS ──────────────────────────────────────────────────────────
    //

        function mouseMoveEvents ( ) {
             window.onmousemove = event => {
                updateSelectedShapePositionOnClick( event )
                updateMousePosition( event )
            }
        }

    //
    // ─── UPDATE SHAPE POSITION ON CHANGE ────────────────────────────────────────────
    //

        function updateSelectedShapePositionOnClick ( event: MouseEvent ) {
            const state = Storage.getState( )
            if ( state.selectedId !== null && Clicked ) {
                const selectedShape =
                    state.shapes.find( x => x.id == state.selectedId )!
                const XDiff =
                    selectedShape.x - X
                const YDiff =
                    selectedShape.y - Y

                Storage.setState( state => {
                    const newShapes =
                        state.shapes.map( shape => {
                            if ( shape.id === state.selectedId ) {
                                shape.x = event.clientX + XDiff
                                shape.y = event.clientY + YDiff
                            }
                            return shape
                        })

                    return {
                        ...state,
                        shapes: newShapes
                    }
                })
            }
        }

    //
    // ─── UPDATE MOUSE POSITION ──────────────────────────────────────────────────────
    //

        function updateMousePosition ( event: MouseEvent ) {
            X = event.clientX
            Y = event.clientY
        }

    //
    // ─── UPDATE CLICKE STATUES ──────────────────────────────────────────────────────
    //

        function mouseClcikeEvents ( ) {
            document.body.onmousedown = ( ) => Clicked = true
            document.body.onmouseup = ( ) => Clicked = false
        }

    // ────────────────────────────────────────────────────────────────────────────────

}