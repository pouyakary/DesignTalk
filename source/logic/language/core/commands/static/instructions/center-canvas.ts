
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../typings/functionset" />
/// <reference path="../../../../../../storage/storage" />
/// <reference path="../../../../../canvas/center.ts" />


namespace DesignTalk.LanguageCore.Core.StaticCommandRunner {

    //
    // ─── CENTER CANVAS RUNNER ───────────────────────────────────────────────────────
    //

        export function execCenterCanvas ( state: Storage.Model ): Storage.Model {
            const croppedModel =
                Logic.Canvas.getCroppedShapes( state.shapes )
            const centeredShapes =
                Logic.Canvas.getScreenCenteredShapes( croppedModel )

            return { ...state,
                shapes: centeredShapes
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}