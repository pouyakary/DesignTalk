
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../typings/functionset" />
/// <reference path="../main" />


namespace Shapes.DesignTalk.Core.QueryCompiler {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //

        type QueryChecker =
            ( shape: Storage.Shape ) => boolean

        type QueryCheckerOrNull =
            QueryChecker | null

        type ComparisionFunction =
            ( a: number, b: number ) => boolean

    //
    // ─── GENERATE QUERY FUNCTION ────────────────────────────────────────────────────
    //

        export function generate ( query: Query, state: Storage.Model ): QueryFunction {
            if ( query.mode === "new" )
                return generateNewQueryFunction( query )
            else
                return generatePreviousSelectionsFunction( state )
        }

    //
    // ─── GENERATE PREVIOUS SELECTIONS QUERY ─────────────────────────────────────────
    //

        function generatePreviousSelectionsFunction ( state: Storage.Model ): QueryFunction {
            const shapeTable: ShapeTable = { }

            for ( const shape of state.shapes )
                shapeTable[ shape.id ] = shape

            return ( shapes: Shape[ ] ) =>
                state.previousSelectionIDs.map( id =>
                    shapeTable[ id ] )
        }

    //
    // ─── GENERATE QUERY FUNCTION ────────────────────────────────────────────────────
    //

        function generateNewQueryFunction ( query: Query ): QueryFunction {
            const checkers: QueryCheckerOrNull[ ] = [
                generateChackerForColor( query ),
                generateCheckerForShapeKind( query ),
            ]

            return generateQueryFunction( checkers )
        }

    //
    // ─── GENERATE QUERY FUNCTION BODY ───────────────────────────────────────────────
    //

        function generateQueryFunction ( checkers: QueryCheckerOrNull[ ] ): QueryFunction {

            const effectiveCheckers: QueryChecker[ ] =
                checkers.filter( checker =>
                    checker !== null ) as QueryChecker[ ]

            const filterFunction = ( shape: Storage.Shape ) => {
                for ( const checker of effectiveCheckers )
                    if ( !checker( shape ) )
                        return false
                return true
            }

            return ( shapes: Storage.Shape[ ] ) =>
                shapes.filter( filterFunction )
        }

    //
    // ─── CHECKER FOR COLOR ──────────────────────────────────────────────────────────
    //

        function generateChackerForColor ( query: Query ): QueryCheckerOrNull {
            if ( query.color === "all" )
                return null

            return ( shape: Storage.Shape ) =>
                shape.color === query.color
        }

    //
    // ─── CHECKER FOR SHAPE TYPE ─────────────────────────────────────────────────────
    //

        function generateCheckerForShapeKind ( query: Query ): QueryCheckerOrNull {
            if  ( query.kind === "all" )
                return null

            return ( shape: Storage.Shape ) =>
                shape.type === query.kind
        }

    //
    // ─── GENERATE CONDITION CHECKER ─────────────────────────────────────────────────
    //

        function generateConditionChecker ( condition: QueryCondition ): QueryChecker {
            switch ( condition.query ) {
                case 'size':
                default:
                    return generateCheckerForSizeQuery( condition as SizeQuery )
            }
        }

    //
    // ─── SIZE QUERY ─────────────────────────────────────────────────────────────────
    //

        function generateCheckerForSizeQuery ( sizeQuery: SizeQuery ): QueryChecker {
            if ( sizeQuery.dimension === "both" )
                return generateCheckerForSize2DQuery( sizeQuery )
            else
                return generateCheckerForSize1DQuery( sizeQuery )
        }

    //
    // ─── GENERATE CHECHER FOR SIZE 1D QUERY ─────────────────────────────────────────
    //

        function generateCheckerForSize1DQuery ( sizeQuery: SizeQuery ): QueryChecker {
            const comparisionFunction =
                composeComparisionFunction( sizeQuery.operator )
            const { size, unit } =
                sizeQuery.size as Size1D
            const comparable =
                convertSizeToPixel( size, unit  )

            const checker =
                ( shape: Storage.Shape ) => {
                    const baseSize =
                        (( sizeQuery.dimension === "width" )
                            ? shape.width
                            : shape.height
                            )

                    return comparisionFunction( baseSize, comparable )
                }

            return checker
        }

    //
    // ─── GENERATE CHECKER FOR SIZE 2D QUERY ─────────────────────────────────────────
    //

        function generateCheckerForSize2DQuery ( sizeQuery: SizeQuery ): QueryChecker {
            const comparisionFunction =
                composeComparisionFunction( sizeQuery.operator )
            const { width, height, unit } =
                sizeQuery.size as Size2D
            const widthSize =
                convertSizeToPixel( width, unit )
            const heightSize =
                convertSizeToPixel( height, unit )

            const checker =
                ( shape: Storage.Shape ) =>
                    comparisionFunction( shape.width, widthSize ) &&
                    comparisionFunction( shape.height, heightSize )

            return checker
        }

    //
    // ─── COMPOSE CAMPARISION FUNCTION ───────────────────────────────────────────────
    //

        function composeComparisionFunction ( operator: SelectorOperator ): ComparisionFunction {
            let comparisionFunction =
                ( a: number, b: number ) => true

            switch ( operator.operator ) {
                case '=':
                    comparisionFunction =
                        ( a: number, b: number ) => a === b
                    break

                case '>':
                    comparisionFunction =
                        ( a: number, b: number ) => a > b
                    break

                case '<':
                    comparisionFunction =
                        ( a: number, b: number ) => a < b
                    break

                case '<=':
                    comparisionFunction =
                        ( a: number, b: number ) => a <= b
                    break

                case '>=':
                    comparisionFunction =
                        ( a: number, b: number ) => a >= b
                    break
            }

            const functionWithNegationApplied =
                ( operator.negation
                    ? ( a:number, b: number ) => !comparisionFunction( a, b )
                    : comparisionFunction
                    )

            return functionWithNegationApplied
        }

    // ────────────────────────────────────────────────────────────────────────────────

}