
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />
/// <reference path="speech.ts" />


namespace Shapes.MouseDriver {

    //
    // ─── STORAGE ────────────────────────────────────────────────────────────────────
    //

        export let X = 0
        export let Y = 0
        export let Clicked = false

        let shouldMove = false

    //
    // ─── MOUSE POSITION UPDATER ─────────────────────────────────────────────────────
    //

        export function init ( ) {
            mouseClickEvents ( )
            onRightClick( )
            mouseMoveEvents( )
        }

    //
    // ─── MOUSE MOVE EVENTS ──────────────────────────────────────────────────────────
    //

        function mouseMoveEvents ( ) {
            window.onmousemove = event => {
                handleMouseMove( event )
                updateMousePosition( event )
            }
        }

    //
    // ─── HANDLE MOUSE MOVE ──────────────────────────────────────────────────────────
    //

        function handleMouseMove ( event: MouseEvent ) {
            const state =
                Storage.getState( )

            if ( Clicked ) {
                if ( state.selectedId !== null ) {
                    if ( state.mouseMode == Storage.MouseMode.Move ) {
                        updateSelectedShapePositionOnMouseMove( event, state )
                    } else {
                        updateSelectedShapeSizeOnMouseMove( event, state )
                    }
                }
            } else {

            }
        }

    //
    // ─── UPDATE SHAPE SIZE ON MOUSE MOVE ────────────────────────────────────────────
    //

        let moveReseter: NodeJS.Timer

        function updateSelectedShapeSizeOnMouseMove ( event: MouseEvent, state: Storage.Model ) {

            clearTimeout( moveReseter )
            moveReseter = setTimeout(( ) => {
                if ( !Clicked )
                    Storage.setState( state =>
                        ({ ...state, mouseMode: Storage.MouseMode.Move }))
            }, 30)


            const selectedShape =
                state.shapes.find( x => x.id == state.selectedId )!

            Storage.setState( state => {
                const margin = 10
                const newShapes =
                    state.shapes.map( shape => {
                        if ( shape.id === state.selectedId ) {
                            const width = event.clientX - ( shape.x + margin )
                            const height = event.clientY - ( shape.y + margin )

                            if ( width > 10 )
                                shape.width = width
                            if ( height > 10 )
                                shape.height = height
                        }

                        return { ...shape,
                            size: shape.width
                        }
                    })

                return {
                    ...state,
                    hoveredId: null,
                    showLineGuides: true,
                    shapes: newShapes
                }
            })

        }

    //
    // ─── UPDATE SHAPE POSITION ON CHANGE ────────────────────────────────────────────
    //

        function updateSelectedShapePositionOnMouseMove ( event: MouseEvent, state: Storage.Model ) {

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
                    hoveredId: null,
                    showLineGuides: true,
                    shapes: newShapes
                }
            })
        }

    //
    // ─── UPDATE MOUSE POSITION ──────────────────────────────────────────────────────
    //

        function updateMousePosition ( event: MouseEvent ) {
            X = event.clientX
            Y = event.clientY
        }

    //
    // ─── UPDATE CLICK STATUES ───────────────────────────────────────────────────────
    //

        function mouseClickEvents ( ) {
            document.body.onmousedown = event => {
                Clicked = true
            }
            document.body.onmouseup = event => {
                updateMousePosition( event )
                Clicked = false
            }
        }

    //
    // ─── ON RIGHT CLICK ─────────────────────────────────────────────────────────────
    //

        function onRightClick ( ) {
            document.oncontextmenu = event => {
                event.preventDefault( )
                updateMousePosition( event )
                SpeechCommandEngine.trigger( )
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}