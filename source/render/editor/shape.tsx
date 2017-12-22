
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../globals/key.ts" />
/// <reference path="../../storage/storage.ts" />


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

        export class Shape extends React.Component<IShapeContainerProps, { }> {

            //
            // ─── RENDER ──────────────────────────────────────────────────────
            //

                render ( ) {
                    return this.renderShape( this.props.shape )
                }

            //
            // ─── IS THIS SHAPE SELECTED ──────────────────────────────────────
            //

                private isShapeSelected ( ) {
                    return this.props.shape.id === Storage.getState( ).selectedId
                }

            //
            // ─── RENDER SHAPE ────────────────────────────────────────────────
            //

                private renderShape ( shape: Storage.IShape ): JSX.Element {
                    const color =
                        ( this.isShapeSelected( )
                            ? 'green'
                            : this.props.shape.color )

                    switch ( shape.type ) {
                        case 'rect':
                            return this.createRect( shape, color )

                        case 'circle':
                            return this.createCircle( shape, color )
                    }
                }

            //
            // ─── SHAPES ON CLICK ─────────────────────────────────────────────
            //

                private onMouseEnter ( ) {
                    Storage.setState( state => ({ ...state,
                        selectedId: this.props.shape.id
                    }))
                }

                private onMouseLeave ( ) {
                    Storage.setState( state => ({ ...state,
                        selectedId: null
                    }))
                }

            //
            // ─── CREATE CIRCLE ───────────────────────────────────────────────
            //

                private createCircle ( shape: Storage.IShape, color: string ) {
                    const radius = shape.width / 2

                    return <circle
                        cx           = { shape.x + radius }
                        cy           = { shape.y + radius }
                        fill         = { color }
                        r            = { radius }
                        key          = { generateKey( ) }
                        onMouseEnter = { event => this.onMouseEnter( ) }
                        onMouseLeave = { event => this.onMouseLeave( ) }
                    />
                }

            //
            // ─── CREATE RECT ─────────────────────────────────────────────────
            //

                private createRect ( shape: Storage.IShape, color: string ) {
                    return <rect
                        x               = { shape.x }
                        y               = { shape.y }
                        width           = { shape.width }
                        height          = { shape.height }
                        key             = { generateKey( ) }
                        fill            = { color }
                        onMouseEnter    = { event => this.onMouseEnter( ) }
                        onMouseLeave    = { event => this.onMouseLeave( ) }
                    />
                }

            // ─────────────────────────────────────────────────────────────────

        }

    // ────────────────────────────────────────────────────────────────────────────────

}