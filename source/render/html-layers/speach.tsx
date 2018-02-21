
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../globals/key.ts" />

namespace BasiceShapeEditor.Render.HTMLLayers.SpeachRecognizer {

    //
    // ─── GLOBAL SETTINGS ────────────────────────────────────────────────────────────
    //

        const iconSize = 30
        const backgroundSize = iconSize + 14

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
            return  <div key = { generateKey( ) } style = {{
                        backgroundColor:    "rgba(255, 255, 255, 0.9)",
                        position:           "fixed",
                        left:               "0",
                        top:                "0",
                        width:              "100vw",
                        height:             "100vh",     
                    }}>
                        { recordingIcon( model ) }
                        { createTextView( model ) }
                    </div>
        }
        
    //
    // ─── RECORDING DIV ──────────────────────────────────────────────────────────────
    //
        
        function recordingIcon ( model: Storage.IModel ) {
            const { mouseX, mouseY } = model.speachRecognition

            return  <div style = {{
                        backgroundColor:    "black",
                        position:           "fixed",
                        left:               mouseX - ( backgroundSize / 2 ),
                        top:                mouseY - ( backgroundSize / 2 ),
                        padding:            ( backgroundSize - iconSize ) / 2,
                        width:              iconSize,
                        height:             iconSize,
                    }} >
                        <div className = "recoderIcon" style = {{
                            width:              iconSize,
                            height:             iconSize,
                            borderRadius:       iconSize / 2,
                            backgroundColor:    "red",
                        }} />
                    </div>
        }

    //
    // ─── TEXT VIEW ──────────────────────────────────────────────────────────────────
    //

        function createTextView ( model: Storage.IModel ) {
            const { mouseX, mouseY } = model.speachRecognition

            if ( model.speachRecognition.currentText === "" )
                return <div />

            return  <div style = {{
                        maxWidth:           "100px",
                        position:           "fixed",
                        left:               mouseX - backgroundSize + 75,
                        top:                mouseY - ( backgroundSize / 2 ),
                        fontFamily:         "HaskligBold",
                        fontSize:           "12",
                        color:              "black",
                        textTransform:      "uppercase",
                        backgroundColor:    "yellow",
                        borderWidth:        "2px",
                        borderStyle:        "solid",
                        borderColor:        "black",
                        padding:            "5px 10px 7px 10px",
                    }}>
                        { model.speachRecognition.currentText }
                    </div>
        }

    // ────────────────────────────────────────────────────────────────────────────────

}