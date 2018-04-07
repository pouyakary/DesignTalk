

//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/storage" />

namespace DesignTalk.Logic.ContextMenu {

    //
    // ─── CLOSE CONTEXT MENU ─────────────────────────────────────────────────────────
    //

        export function close ( ) {
            Storage.setState( state => {
                if ( state.contextMenu.recognizer !== null )
                    state.contextMenu.recognizer.stop( )

                return { ...state,
                    contextMenu: { ...state.contextMenu,
                        active:         false,
                        recognizedText: "",
                        recognizer:     null
                    }
                }
            })
        }

    // ────────────────────────────────────────────────────────────────────────────────

}