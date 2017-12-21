
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model" />
/// <reference path="../helpers/shape-renderer" />
/// <reference path="../../globals/key" />

namespace BasiceShapeEditor.Render.Editor {

    //
    // ─── PROPS ──────────────────────────────────────────────────────────────────────
    //

        export interface IShapeContainerProps {
            shape: Storage.IShape
        }

    //
    // ─── SHAPE CONTAINER ────────────────────────────────────────────────────────────
    //

        export class ShapeContainer extends React.Component<IShapeContainerProps, { }> {

            //
            // ─── CONSTRUCTOR ─────────────────────────────────────────────────
            //

                constructor ( props: IShapeContainerProps ) {
                    super( props )
                }

            //
            // ─── RENDER ──────────────────────────────────────────────────────
            //

                render ( ) {
                    return Helpers.renderShape( this.props.shape )
                }

            // ─────────────────────────────────────────────────────────────────

        }

    // ────────────────────────────────────────────────────────────────────────────────

}