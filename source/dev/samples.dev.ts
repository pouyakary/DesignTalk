
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../storage/model.ts" />

namespace DesignTalk.Developer {

    //
    // ─── GENERATE SAMPLE CODE ───────────────────────────────────────────────────────
    //

        export function CreateSample ( ) {
            const { shapes } =
                Storage.getState( )
            const croppedShapes =
                Logic.Canvas.getCroppedShapes( shapes )

            console.log( JSON.stringify( croppedShapes ) )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}