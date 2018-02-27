
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../globals/key.ts" />
/// <reference path="../../logic/designtalk/core/parser" />
/// <reference path="../../logic/state-actions/contex-menu" />
/// <reference path="../../logic/state-actions/model" />

namespace Shapes.Render.HTMLLayers.RightClick {

    //
    // ─── GLOBAL SETTINGS ────────────────────────────────────────────────────────────
    //

        const iconSize = 30
        const backgroundSize = iconSize + 14

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.Model ) {
            return (( model.contexMenu.active )
                ? shapeOnWorkingMode( model )
                : [ ]
                )
        }

    //
    // ─── ON WORKING SPEACH RECOGNITION ──────────────────────────────────────────────
    //

        function shapeOnWorkingMode ( model: Storage.Model ) {
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

        function recordingIcon ( model: Storage.Model ) {
            const { mouseX, mouseY } = model.contexMenu

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

                        { createNewShapeButton( model ) }
                        { createHelpButton( model ) }
                    </div>
        }

    //
    // ─── TEXT VIEW ──────────────────────────────────────────────────────────────────
    //

        function createTextView ( model: Storage.Model ) {
            const { mouseX, mouseY, recognizedText } = model.contexMenu

            if ( recognizedText === "" )
                return <div />

            return  <div style = {{
                        maxWidth:           "160px",
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
                        userSelect:         "none",
                    }}>

                        { /* Disply for the Text */ }
                        <div style = {{
                            padding: "5px 10px 7px 10px",
                        }}>
                            { recognizedText }
                        </div>

                        { /* Disply for compilation check */ }
                        <div style = {{
                            borderTopColor:     "black",
                            borderTopWidth:     2,
                            borderTopStyle:     "dashed",
                            padding:            "5px 10px 7px 10px"
                        }}>
                            { DesignTalk.isParsable( recognizedText )
                                ? "Looks Good"
                                : "Can't Understand"
                            }
                        </div>
                    </div>
        }

    //
    // ─── BUTTON ─────────────────────────────────────────────────────────────────────
    //

        function createButton ( name: string, state: Storage.Model,
                                XX: number, YY: number, onClickFunction: ( ) => void ) {

            const { mouseX, mouseY } =
                state.contexMenu

            const functionForClick = ( ) => {
                onClickFunction( )
                Logic.ContexMenu.close( )
            }

            return  <div onClick = { functionForClick } style = {{
                        backgroundColor:    "#eee",
                        fontFamily:         "HaskligBold",
                        fontSize:           12,
                        border:             "2px solid black",
                        padding:            "3px 5px 5px 5px",
                        position:           "fixed",
                        left:               mouseX - XX,
                        top:                mouseY - YY,
                        textTransform:      "uppercase",
                        WebkitUserSelect:   "none",
                    }}>
                        { name }
                    </div>
        }

    //
    // ─── NEW SHAPE BUTTON ───────────────────────────────────────────────────────────
    //

        function createNewShapeButton ( model: Storage.Model ) {
            return createButton( "new shape", model, 80, 65, ( ) => {
                Logic.Model.createNewShape( )
            })
        }

    //
    // ─── BOOK BUTTON ────────────────────────────────────────────────────────────────
    //

        function createHelpButton ( model: Storage.Model ) {
            return createButton( "wiki & help", model, 130, 25, ( ) => {
                window.open(
                    "https://www.notion.so/Shapes-dad307e81f1e46869ad6c355b1705921",
                    "_blank")
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}