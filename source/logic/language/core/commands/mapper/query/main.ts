
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../../../typings/functionset" />
/// <reference path="../main" />

namespace DesignTalk.LanguageCore.Core.QueryCompiler {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //

        type QueryChecker =
            ( shape: Storage.Shape ) => boolean

        type QueryCheckerOrNull =
            QueryChecker | null

        type ComparisonFunction =
            ( a: number, b: number ) => boolean

        type SortingOperatorFunction =
            (a: number, b: number ) => number

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
                generateCheckerForColor( query ),
                generateCheckerForShapeKind( query ),
            ]

            for ( const condition of query.conditions )
                checkers.push( generateConditionChecker( condition ) )

            return generateQueryFunction( query, checkers )
        }

    //
    // ─── GENERATE QUERY FUNCTION BODY ───────────────────────────────────────────────
    //

        function generateQueryFunction ( query: Query, checkers: QueryCheckerOrNull[ ] ): QueryFunction {

            const effectiveCheckers: QueryChecker[ ] =
                checkers.filter( checker =>
                    checker !== null ) as QueryChecker[ ]

            const checker = ( shape: Storage.Shape ) => {
                for ( const checker of effectiveCheckers )
                    if ( !checker( shape ) )
                        return false
                return true
            }

            const rangedFilterFunction =
                generateRangeFilterFunction( query, checker )

            return rangedFilterFunction
        }

    //
    // ─── CHECKER FOR COLOR ──────────────────────────────────────────────────────────
    //

        function generateCheckerForColor ( query: Query ): QueryCheckerOrNull {
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
    // ─── GENERATE CHECKER FOR SIZE 1D QUERY ─────────────────────────────────────────
    //

        function generateCheckerForSize1DQuery ( sizeQuery: SizeQuery ): QueryChecker {
            const comparisonFunction =
                composeComparisonFunction( sizeQuery.operator )
            const { size, unit } =
                sizeQuery.size as Size1D
            const comparable =
                convertSizeToPixel( size, unit )

            const checker =
                ( shape: Storage.Shape ) => {
                    const baseSize =
                        (( sizeQuery.dimension === "width" )
                            ? shape.width
                            : shape.height
                            )

                    return comparisonFunction( baseSize, comparable )
                }

            return checker
        }

    //
    // ─── GENERATE CHECKER FOR SIZE 2D QUERY ─────────────────────────────────────────
    //

        function generateCheckerForSize2DQuery ( sizeQuery: SizeQuery ): QueryChecker {
            const comparisonFunction =
                composeComparisonFunction( sizeQuery.operator )
            const { width, height, unit } =
                sizeQuery.size as Size2D
            const widthSize =
                convertSizeToPixel( width, unit )
            const heightSize =
                convertSizeToPixel( height, unit )

            const checker =
                ( shape: Storage.Shape ) =>
                    comparisonFunction( shape.width, widthSize ) &&
                    comparisonFunction( shape.height, heightSize )

            return checker
        }

    //
    // ─── COMPOSE COMPARISON FUNCTION ────────────────────────────────────────────────
    //

        function composeComparisonFunction ( operator: SelectorOperator ): ComparisonFunction {
            let comparisonFunction =
                ( a: number, b: number ) => true

            switch ( operator.operator ) {
                case '=':
                    comparisonFunction =
                        ( a: number, b: number ) => a === b
                    break

                case '>':
                    comparisonFunction =
                        ( a: number, b: number ) => a > b
                    break

                case '<':
                    comparisonFunction =
                        ( a: number, b: number ) => a < b
                    break

                case '<=':
                    comparisonFunction =
                        ( a: number, b: number ) => a <= b
                    break

                case '>=':
                    comparisonFunction =
                        ( a: number, b: number ) => a >= b
                    break
            }

            const functionWithNegationApplied =
                ( operator.negation
                    ? ( a:number, b: number ) => !comparisonFunction( a, b )
                    : comparisonFunction
                    )

            return functionWithNegationApplied
        }

    //
    // ─── GENERATE RANGE SELECTION FUNCTION ──────────────────────────────────────────
    //

        function generateRangeFilterFunction ( query: Query, checker: QueryChecker ) {
            switch ( query.range.mode ) {
                case "biggest":
                    return createSmallestBiggestRangeSelector(
                        query, checker, (a: number, b: number) => a - b
                    )

                case "smallest":
                    return createSmallestBiggestRangeSelector(
                        query, checker, (a: number, b: number) => a + b
                    )

                case "all":
                default:
                    return ( shapes: Shape[ ] ) =>
                        shapes.filter( checker )
            }
        }

    //
    // ─── CREATE RANGED FILTER ON SMALLEST BIGGEST ───────────────────────────────────
    //

        function createSmallestBiggestRangeSelector ( query: Query,
                                                    checker: QueryChecker,
                                                   operator: SortingOperatorFunction ) {

            return ( shapes: Shape[ ] ) => {
                const filteredShapes =
                    shapes.filter( checker )

                const rangeFilteredShapes =
                    filteredShapes
                        .sort(( a, b ) =>
                            operator(( b.width * b.height ), ( a.width * b.height )))
                        .splice( 0, query.range.range )

                return rangeFilteredShapes
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}