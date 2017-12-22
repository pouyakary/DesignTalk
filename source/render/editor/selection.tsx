
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../storage/storage.ts" />

namespace BasiceShapeEditor.Render.SelectionTool {

    //
    // ─── SHOW SELECTION ─────────────────────────────────────────────────────────────
    //

        export function render ( model: Storage.IModel ) {
            if ( model.selectedId )
                return createSelectionTool( model )
            else
                return undefined
        }

    //
    // ─── CREATE SELECTION TOOL ──────────────────────────────────────────────────────
    //

        function createSelectionTool ( model: Storage.IModel ) {
            const shape =
                model.shapes.find(
                    shape => shape.id === model.selectedId )!
            const storkeWidth =
                2
            const margin =
                10
            const x =
                shape.x - margin
            const y =
                shape.y - margin
            const size =
                shape.width + margin * 2

            return  <rect   fill = "transparent"
                          stroke = "black"
                     strokeWidth = "2"
                               x = { x }
                               y = { y }
                           width = { size }
                          height = { size } />
        }

    // ────────────────────────────────────────────────────────────────────────────────

}