
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/selection.tsx" />
/// <reference path="../../globals/key.ts" />

namespace BasiceShapeEditor.Render.Layers.Selection {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            return Render.SelectionTool.render( model )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}