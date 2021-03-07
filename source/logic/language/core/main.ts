
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../storage/storage" />
/// <reference path="./commands/mapper/main.ts" />
/// <reference path="./commands/static/main.ts" />
/// <reference path="./parser.ts" />

namespace DesignTalk.LanguageCore.Core {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //

        export type Shape = Storage.Shape

        export type ShapeTable = {
            [ id: string ]: Shape
        }

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        export function run ( code: string, state: Storage.Model ) {
            try {
                const commands =
                    parse( code )

                return executeCommands( commands, state )

            } catch ( error ) {
                console.error( error )
                return state
            }
        }

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        function executeCommands ( commands: Command[ ], state: Storage.Model ) {
            for ( const command of commands )
                state = runCommand( command, state )
            return state
        }

    //
    // ─── RUN COMMAND ────────────────────────────────────────────────────────────────
    //

        function runCommand ( command: Command, state: Storage.Model ): Storage.Model {
            if ( command.type === "mapper" )
                return MappedCommandRunner.exec( command, state )
            else
                return state
        }

    // ────────────────────────────────────────────────────────────────────────────────

}