
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../storage/storage" />
/// <reference path="./query/main.ts" />
/// <reference path="parser" />

namespace Shapes.DesignTalk.Core {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //

        type Shape = Storage.IShape

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        function run ( code: string ) {
            try {
                const commands =
                    parse( code )

                executeCommands( commands )

            } catch ( error ) {
                console.error( error )
            }
        }

    //
    // ─── RUN ────────────────────────────────────────────────────────────────────────
    //

        function executeCommands ( commands: Command[ ] ) {
            Storage.setState( state => {
                let shapes =
                    state.shapes

                for ( const command of commands )
                    shapes = runCommand( command, shapes )

                return { ...state,
                    shapes
                }
            })
        }

    //
    // ─── RUN COMMAND ────────────────────────────────────────────────────────────────
    //

        function runCommand ( command: Command, shapes: Shape[ ] ): Shape[ ] {
            const { queryFunction, manipulationFunction } =
                compileCommand( command )

            const selectedShapes =
                queryFunction( shapes )

            const manipulatedShapes =
                selectedShapes.map( shape =>
                    manipulationFunction( shape ) )

            const newShapes =
                mergeShapes( shapes, manipulatedShapes )

            return newShapes
        }

    //
    // ─── MERGE SHAPES ───────────────────────────────────────────────────────────────
    //

        type ManipulatedShapeTable = {
            [ id: string ]: Shape
        }

        function mergeShapes ( allShapes: Shape[ ], manipulatedShapes: Shape[ ] ) {
            const manipulatedShapeTable: ManipulatedShapeTable =
                { }

            for ( const shape of manipulatedShapes )
                manipulatedShapeTable[ shape.id ] = shape

            return allShapes.map( shape => {
                if ( manipulatedShapeTable[ shape.id ] !== undefined )
                    return manipulatedShapeTable[ shape.id ]
                else
                    return shape
            })
        }

    //
    // ─── COMPILE COMMAND ────────────────────────────────────────────────────────────
    //

        function compileCommand ( command: Command ): CompiledFunctionSet {
            const queryFunction =
                Core.QueryCompiler.generate( command.query )
            const manipulationFunction =
                ( shape: Shape ) => shape

            return {
                queryFunction,
                manipulationFunction
            }
        }
 
    // ────────────────────────────────────────────────────────────────────────────────

}