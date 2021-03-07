
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../typings/functionset" />
/// <reference path="../../../../../storage/storage" />
/// <reference path="./instructions/center-canvas.ts" />

namespace DesignTalk.LanguageCore.Core.StaticCommandRunner {

    //
    // ─── STATIC COMMAND RUNNER ──────────────────────────────────────────────────────
    //

        export function exec ( command: Command, state: Storage.Model ): Storage.Model {
            switch ( command.instruction.command ) {
                case "center-canvas":
                    return execCenterCanvas( state )

                default:
                    return state
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}