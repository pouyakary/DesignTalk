
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model" />
/// <reference path="../editor/container" />


namespace BasiceShapeEditor.Render.Layers.Shapes {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            return model.shapes.map( shape =>
                <Editor.ShapeContainer shape = { shape } />
            )
        }

    // ────────────────────────────────────────────────────────────────────────────────

}