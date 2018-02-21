
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />
/// <reference path="../typings/webkitspeechrecognition" />
/// <reference path="mouse.ts" />

namespace BasiceShapeEditor.SpeachCommandEngine {

    //
    // ─── START RECOGNITION ──────────────────────────────────────────────────────────
    //

        export function trigger ( ) {
            const state = Storage.getState( )

            if ( state.speachRecognition.isRecording )
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

                    speachRecognition: { ...state.speachRecognition,
                        isRecording:    true,
                        recognizer:     recognizer,
                        currentText:    "",
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
                state.speachRecognition.recognizer!.stop( )

                return { ...state,
                    speachRecognition: { ...state.speachRecognition,
                        isRecording:    false,
                        recognizer:     null,
                        currentText:    "",
                    }
                }
            })
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
                console.log( state.speachRecognition )
                return { ...state,
                    speachRecognition: { ...state.speachRecognition,
                        currentText: updateText( state.speachRecognition.currentText, newPart )
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
                    return words.splice( words.length - 2 ).join(' ')

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