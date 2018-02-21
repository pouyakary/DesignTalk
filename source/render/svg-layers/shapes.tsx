
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../editor/shape.tsx" />
/// <reference path="../../globals/key.ts" />

namespace BasiceShapeEditor.Render.SVGLayers.Shapes {

    //
    // ─── RENDER SHAPES LAYER ────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            const sortedShapes =
                model.shapes.sort(( a, b ) =>
                    a.zIndex - b.zIndex )

            const elementedShapes =
                sortedShapes.map( shape =>
                    <Editor.Shape shape = { shape } key = { generateKey( ) } />
                )

            return elementedShapes
        }

    // ────────────────────────────────────────────────────────────────────────────────

}