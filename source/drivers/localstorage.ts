
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/storage" />

namespace Shapes.LocalStorageDriver {

    //
    // ─── CONSTANTS ──────────────────────────────────────────────────────────────────
    //

        const LOCAL_STORAGE_ID =
            "us.kary.toys.shapes.model"

        let driverStorageTimeoutSetter: number

    //
    // ─── STORAGE UPDATER FUNCTION ───────────────────────────────────────────────────
    //

        function storageUpdaterFunction ( state: Storage.Model ) {
            const encodedStateString =
                JSON.stringify( state )

            localStorage.setItem( LOCAL_STORAGE_ID, encodedStateString )
        }

    //
    // ─── STORAGE UPDATER ────────────────────────────────────────────────────────────
    //

        export function update ( state: Storage.Model ) {
            clearTimeout( driverStorageTimeoutSetter )

            driverStorageTimeoutSetter =
                setTimeout( storageUpdaterFunction, 20 )
        }

    //
    // ─── STORAGE LOADER ─────────────────────────────────────────────────────────────
    //

        export function load ( ): Storage.Model | null {
            const encodedStateString =
                localStorage.getItem( LOCAL_STORAGE_ID )

            if ( encodedStateString === null )
                return null

            const stateObject =
                JSON.parse( encodedStateString )

            return stateObject
        }

    // ────────────────────────────────────────────────────────────────────────────────

}