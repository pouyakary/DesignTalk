
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />

namespace DesignTalk.LocalStorageDriver {

    //
    // ─── CONSTANTS ──────────────────────────────────────────────────────────────────
    //

        const LOCAL_STORAGE_ID =
            "us.kary.toys.shapes.model"

    //
    // ─── LOCAL TIMEOUT SYSTEM ───────────────────────────────────────────────────────
    //

        let driverStorageTimeoutSetter: number

    //
    // ─── STORAGE UPDATER FUNCTION ───────────────────────────────────────────────────
    //

        export function storageUpdaterFunction ( state: Storage.Model ) {
            const encodedStateString =
                JSON.stringify( state.shapes )

            localStorage.setItem( LOCAL_STORAGE_ID, encodedStateString )
        }

    //
    // ─── STORAGE UPDATER ────────────────────────────────────────────────────────────
    //

        function update ( state: Storage.Model ) {
            clearTimeout( driverStorageTimeoutSetter )

            driverStorageTimeoutSetter =
                setTimeout( storageUpdaterFunction, 1000 )
        }

    //
    // ─── STORAGE LOADER ─────────────────────────────────────────────────────────────
    //

        export function load ( ): Storage.Shape[ ] | null {
            try {
                const encodedStateString =
                    localStorage.getItem( LOCAL_STORAGE_ID )
                if ( encodedStateString === null )
                    return null
                const stateObject =
                    JSON.parse( encodedStateString )

                return stateObject

            } catch ( e ) {
                return null
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}