

//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace Shapes.Logic.ContexMenu {

    //
    // ─── CLOSE CONTEXT MENU ─────────────────────────────────────────────────────────
    //

        export function close ( ) {
            Storage.setState( state => {
                if ( state.contexMenu.recognizer !== null )
                    state.contexMenu.recognizer.stop( )

                return {
                    ...state,
                    contexMenu: { ...state.contexMenu,
                        active:             false,
                        recognizedText:     "",
                        recognizer:         null
                    }
                }
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}