
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace BasiceShapeEditor.Render.Helpers {

    //
    // ─── RENDER SHAPE ───────────────────────────────────────────────────────────────
    //

        export function renderShape ( shape: Storage.IShape ): JSX.Element {
            switch ( shape.type ) {
                case 'rect':
                    return createRect( shape )

                case 'circle':
                    return createCircle( shape )
            }
        }

    //
    // ─── CREATE CIRCLE ──────────────────────────────────────────────────────────────
    //

        function createCircle ( shape: Storage.IShape ) {
            return <circle
                cx   = { shape.x }
                cy   = { shape.y }
                fill = { shape.color }
                r    = { shape.height / 2 }
                key  = { generateKey( ) }
            />
        }

    //
    // ─── CREATE RECT ────────────────────────────────────────────────────────────────
    //

        function createRect ( shape: Storage.IShape ) {
            return <rect
                x = { shape.x }
                y = { shape.y }
                width = { shape.width }
                height = { shape.height }
                key  = { generateKey( ) }
            />
        }

    // ────────────────────────────────────────────────────────────────────────────────

}
