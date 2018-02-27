
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />
/// <reference path="../typings/webkitspeechrecognition" />
/// <reference path="../logic/state-actions/contex-menu" />

/// <reference path="mouse.ts" />

namespace Shapes.SpeachCommandEngine {

    //
    // ─── START RECOGNITION ──────────────────────────────────────────────────────────
    //

        export function trigger ( ) {
            const state = Storage.getState( )

            if ( state.contexMenu.active )
                end( )
            else
                start( )
        }

    //
    // ─── START RECOGNITION ──────────────────────────────────────────────────────────
    //

        function start ( ) {
            const recognizer = createNewRecognizer( )
            recognizer.start( )

            Storage.setState( state => {
                return { ...state,
                    selectedId:         null,
                    showLineGuides:     false,
                    mouseMode:          Storage.MouseMode.Resize,

                    contexMenu: { ...state.contexMenu,
                        active:    true,
                        recognizer:     recognizer,
                        recognizedText:    "",
                        mouseX:         MouseDriver.X,
                        mouseY:         MouseDriver.Y,
                    }
                }
            })
        }

    //
    // ─── END ────────────────────────────────────────────────────────────────────────
    //

        function end ( ) {
            Storage.setState( state => {
                const newState =
                    DesignTalk.runWithGivenState(
                        state.contexMenu.recognizedText, state
                    )

                return newState
            })

            Shapes.Logic.ContexMenu.close( )
        }

    //
    // ─── CREATE NEW RECOGNIZER ──────────────────────────────────────────────────────
    //

        function createNewRecognizer ( ) {
            const recognizer = new webkitSpeechRecognition( )

            recognizer.continuous = true
            recognizer.onresult = event => onResult( event )

            return recognizer
        }

    //
    // ─── ON START ───────────────────────────────────────────────────────────────────
    //

        function onResult ( event: IWebkitSpeaehRecognitionResult ) {
            for ( let i = event.resultIndex; i < event.results.length; i++ ) {
                const transcript = event.results[ i ][ 0 ].transcript

                if ( transcript.trim( ).toLocaleLowerCase( ) === "done" )
                    end( )
                else
                    updateScreenText( transcript )
            }
        }

    //
    // ─── UPDATE SCREEN TEXT ─────────────────────────────────────────────────────────
    //

        function updateScreenText ( newPart: string ) {
            Storage.setState( state => {
                console.log( state.contexMenu )
                return { ...state,
                    contexMenu: { ...state.contexMenu,
                        recognizedText: updateText( state.contexMenu.recognizedText, newPart )
                    }
                }
            })
        }

    //
    // ─── UPDATE TEXT ────────────────────────────────────────────────────────────────
    //

        function updateText ( buffer: string, newPart: string ) {
            switch ( newPart.trim( ) ) {
                case 'oops':
                case 'sorry':
                case 'back':
                case 'ignore':
                    const words = buffer.split(' ')
                          words.pop( )
                    return words.join(' ')

                case 'clear':
                case 'clean':
                case 'reset':
                    return ''

                default:
                    return buffer + newPart
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}