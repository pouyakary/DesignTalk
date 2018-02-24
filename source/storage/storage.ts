

//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model.ts" />
/// <reference path="actions.ts" />
/// <reference path="base-model.ts" />
/// <reference path="../render/main.tsx" />

namespace Shapes.Storage {

    //
    // ─── MAIN STORAGE ───────────────────────────────────────────────────────────────
    //

        const StorageContainer = new Array<Model>( )

    //
    // ─── SUBSCRIPTIONS ──────────────────────────────────────────────────────────────
    //

        type TStorageSubscriber = ( model: Model ) => void

        const StorageSubcriptions: TStorageSubscriber[ ] = [
            Render.renderApp,
        ]

    //
    // ─── SET INITAL STATE ───────────────────────────────────────────────────────────
    //

        export function initStorage ( ) {
            StorageContainer.push(
                createInitialModelState( )
            )

            setTimeout(( ) => runSubscribersOnChange( getState( ) ), 100)
        }

    //
    // ─── GET TOP ENTRY ──────────────────────────────────────────────────────────────
    //

        export function getLastElement<T> ( arr: T[ ] ): T {
            return arr[ arr.length - 1 ]
        }

    //
    // ─── GET STATE ──────────────────────────────────────────────────────────────────
    //

        export function getState ( ) {
            return Object.assign({ }, getLastElement( StorageContainer ) )
        }

    //
    // ─── RUN SUBSCRIBERS ON CHANGE ──────────────────────────────────────────────────
    //

        function runSubscribersOnChange ( state: Model ) {
            for ( const subscriber of StorageSubcriptions )
                subscriber( state )
        }

    //
    // ─── SET STATE ──────────────────────────────────────────────────────────────────
    //

        export type TStateSetter =
            ( lastState: Model ) => Model

        export function setState ( setter: TStateSetter ) {
            const lastState =
                getState( )
            const newState =
                setter( lastState )

            StorageContainer.push( newState )

            runSubscribersOnChange( newState )
        }

    //
    // ─── UNDO LAST STATE ────────────────────────────────────────────────────────────
    //

        export function undoState ( ) {
            if ( StorageContainer.length > 1 ) {
                StorageContainer.pop( )

                const newTopOfTheStack =
                    StorageContainer[ StorageContainer.length - 1 ]

                runSubscribersOnChange( newTopOfTheStack )
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}