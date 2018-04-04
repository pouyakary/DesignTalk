
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/selection.tsx" />
/// <reference path="../../globals/key.ts" />

namespace DesignTalk.Render.SVGLayers.Selection {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.Model ) {
            return Render.SelectionTool.render( model )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}