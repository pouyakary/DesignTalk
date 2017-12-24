
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../storage/model.ts" />
/// <reference path="../../storage/storage.ts" />
/// <reference path="../../globals/key.ts" />


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
            // ─── STORAGE ─────────────────────────────────────────────────────
            //

                private lastState = Storage.getState( )

            //
            // ─── RENDER ──────────────────────────────────────────────────────
            //

                render ( ) {
                    return this.renderShape( this.props.shape )
                }

            //
            // ─── IS THIS SHAPE SELECTED ──────────────────────────────────────
            //

                private isShapedSelected ( ) {
                    return this.props.shape.id === this.lastState.selectedId
                }

            //
            // ─── RENDER SHAPE ────────────────────────────────────────────────
            //

                private renderShape ( shape: Storage.IShape ): JSX.Element {
                    const color =
                        this.props.shape.color

                    switch ( shape.type ) {
                        case 'rect':
                            return this.createRect( shape, color )

                        case 'circle':
                            return this.createCircle( shape, color )
                    }
                }

            //
            // ─── ON HOVER ────────────────────────────────────────────────────
            //

                private onMouseEnter ( ) {
                    Storage.setState( state => ({ ...state,
                        hoveredId: this.props.shape.id,
                        showLineGuides: false,
                    }))
                }

                private onMouseLeave ( ) {
                    Storage.setState( state => ({ ...state,
                        hoveredId: null,
                    }))
                }

            //
            // ─── ON SELECT ───────────────────────────────────────────────────
            //

                private onClick ( ) {
                    Storage.setState( state => {
                        const maxZindexOfShapes =
                            Math.max(
                                ...this.lastState.shapes.map( x => x.zIndex )
                            )

                        const newShapes =
                            state.shapes.map( shape => {
                                if ( shape.id === this.props.shape.id )
                                    shape.zIndex = maxZindexOfShapes + 1

                                return shape
                            })

                        return { ...state,
                            selectedId: this.props.shape.id,
                            hoveredId: null,
                            shapes: newShapes
                        }
                    })
                }

            //
            // ─── CREATE CIRCLE ───────────────────────────────────────────────
            //

                private createCircle ( shape: Storage.IShape, color: string ) {
                    const rX = shape.width / 2
                    const rY = shape.height / 2

                    return <ellipse
                        cx              = { shape.x + rX }
                        cy              = { shape.y + rY }
                        fill            = { color }
                        rx              = { rX }
                        ry              = { rY }
                        key             = { generateKey( ) }
                        onMouseEnter    = { event => this.onMouseEnter( ) }
                        onMouseLeave    = { event => this.onMouseLeave( ) }
                        onClick         = { event => this.onClick( ) }
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
                        onClick         = { event => this.onClick( ) }
                    />
                }

            // ─────────────────────────────────────────────────────────────────

        }

    // ────────────────────────────────────────────────────────────────────────────────

}