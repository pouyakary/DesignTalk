
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../typings/functionset" />
/// <reference path="../../main" />
/// <reference path="../../../../../storage/storage" />
/// <reference path="../../parser.ts" />
/// <reference path="./query/main.ts" />

namespace DesignTalk.LanguageCore.Core.MappedCommandRunner {

    //
    // ─── RUN COMMAND ────────────────────────────────────────────────────────────────
    //

        export function exec ( command: Command, state: Storage.Model ): Storage.Model {
            const { queryFunction, manipulationFunction } =
                compileCommand( command, state )
            const selectedShapes =
                queryFunction( state.shapes )

            console.log( selectedShapes )

            const manipulatedShapes =
                manipulationFunction( selectedShapes )
            const newState =
                mergeShapes( state, manipulatedShapes )

            return newState
        }

    //
    // ─── MERGE SHAPES ───────────────────────────────────────────────────────────────
    //

        function mergeShapes ( state: Storage.Model, manipulatedShapes: Shape[ ] ): Storage.Model {
            const manipulatedShapeTable: ShapeTable =
                { }
            const previousSelectionIDs =
                new Array<string>( )

            for ( const shape of manipulatedShapes )
                manipulatedShapeTable[ shape.id ] = shape

            const shapes =
                state.shapes.map( shape => {
                    if ( manipulatedShapeTable[ shape.id ] !== undefined ) {
                        previousSelectionIDs.push( shape.id )
                        return manipulatedShapeTable[ shape.id ]
                    }
                    return shape
                })

            return { ...state,
                shapes,
                previousSelectionIDs
            }
        }

    //
    // ─── COMPILE COMMAND ────────────────────────────────────────────────────────────
    //

        function compileCommand ( command: Command, state: Storage.Model ): FunctionSet {
            const queryFunction =
                Core.QueryCompiler.generate( command.query!, state )
            const manipulationFunction =
                Core.CommandCompiler.generate( command.instruction )

            return {
                manipulationFunction,
                queryFunction,
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}