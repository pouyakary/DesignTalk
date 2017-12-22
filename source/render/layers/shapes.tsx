
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/shape.tsx" />


namespace BasiceShapeEditor.Render.Layers.Shapes {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            return model.shapes.map( shape =>
                <Editor.Shape shape = { shape } />
            )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}