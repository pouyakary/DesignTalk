
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />
/// <reference path="../typings/webkitspeechrecognition" />
/// <reference path="../logic/state-actions/context-menu" />

/// <reference path="mouse.ts" />

namespace DesignTalk.SpeechCommandEngine {

    //
    // ─── START RECOGNITION ──────────────────────────────────────────────────────────
    //

        export function trigger ( ) {
            const state = Storage.getState( )

            if ( state.contextMenu.active )
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

                    contextMenu: { ...state.contextMenu,
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
                    LanguageCore.runWithGivenState(
                        state.contextMenu.recognizedText, state
                    )

                return newState
            })

            DesignTalk.Logic.ContextMenu.close( )
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
                console.log( state.contextMenu )
                return { ...state,
                    contextMenu: { ...state.contextMenu,
                        recognizedText: updateText( state.contextMenu.recognizedText, newPart )
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