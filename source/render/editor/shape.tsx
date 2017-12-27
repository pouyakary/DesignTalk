
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
                    const opacity =
                        this.getShapeOpacity( shape )

                    switch ( shape.type ) {
                        case 'rect':
                            return this.createRect( shape, color, opacity )

                        case 'circle':
                            return this.createCircle( shape, color, opacity )
                    }
                }

            //
            // ─── GET SHAPE OPACITY ───────────────────────────────────────────
            //

                private getShapeOpacity ( shape: Storage.IShape ): number {
                    if ( this.lastState.selectedId !== null &&
                         this.lastState.selectedId !== shape.id ) {
                            return 0.5
                         }

                    if ( this.lastState.selectedId === shape.id )
                        return 0.95

                    return 1
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
                    Storage.setState( state => ({
                        ...state,
                        selectedId: this.props.shape.id,
                        showLineGuides: false,
                        mouseMode: Storage.MouseMode.Move
                    }))

                    // Storage.setState( state => {
                    //     const newMaxZIndex =
                    //         state.maxZIndex + 1

                    //     const newShapes =
                    //         state.shapes.map( x => ({ ...x,
                    //             zIndex: ( x.id === this.props.shape.id )
                    //                 ? newMaxZIndex : x.zIndex,
                    //         }))

                    //     return { ...state,
                    //         selectedId: this.props.shape.id,
                    //         maxZIndex: newMaxZIndex,
                    //         hoveredId: null,
                    //         shapes: newShapes
                    //     }
                    // })
                }

            //
            // ─── CREATE CIRCLE ───────────────────────────────────────────────
            //

                private createCircle ( shape: Storage.IShape, color: string, opacity: number ) {
                    const rX = shape.width / 2
                    const rY = shape.height / 2

                    return <ellipse
                        cx              = { shape.x + rX }
                        cy              = { shape.y + rY }
                        fill            = { color }
                        rx              = { rX }
                        ry              = { rY }
                        opacity         = { opacity }
                        key             = { generateKey( ) }
                        onMouseEnter    = { event => this.onMouseEnter( ) }
                        onMouseLeave    = { event => this.onMouseLeave( ) }
                        onClick         = { event => this.onClick( ) }
                    />
                }

            //
            // ─── CREATE RECT ─────────────────────────────────────────────────
            //

                private createRect ( shape: Storage.IShape, color: string, opacity: number ) {
                    return <rect
                        x               = { shape.x }
                        y               = { shape.y }
                        width           = { shape.width }
                        height          = { shape.height }
                        key             = { generateKey( ) }
                        opacity         = { opacity }
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