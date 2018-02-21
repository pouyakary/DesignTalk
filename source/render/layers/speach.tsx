
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../globals/key.ts" />

namespace BasiceShapeEditor.Render.Layers.SpeachRecognizer {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            return (( model.speachRecognition.isRecording )
                ? shapeOnWorkingMode( model )
                : [ ]
                )
        }

    //
    // ─── ON WORKING SPEACH RECOGNITION ──────────────────────────────────────────────
    //

        function shapeOnWorkingMode ( model: Storage.IModel ) {
            const { mouseX, mouseY } = model.speachRecognition
            const buttonSize = 30

            return [
                <rect x = "0"
                      r = "0"
                  width = "100vw"
                 height = "100vh"
                   fill = "white" 
                opacity = "0.9"
                    key = { generateKey( ) } />,

                <circle cx = { mouseX }
                        cy = { mouseY }
                         r = { 15 }
                 className = "recoderIcon"
                       key = { generateKey( ) }
                      fill = "red" />
            ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}