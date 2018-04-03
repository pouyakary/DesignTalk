
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../typings/functionset" />
/// <reference path="../main" />

namespace Shapes.DesignTalk.Core.CommandCompiler {

    //
    // ─── GENERATE MANIPULATION FUNCTION ─────────────────────────────────────────────
    //

        export function generate ( instruction: InstructionBase ): ManipulationFunction {
            switch ( instruction.command ) {
                case "remove":
                    return generateRemoveInstruction( instruction as RemoveInstruction )

                default:
                    return ( shapes: Storage.Shape[ ] ) => shapes
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}