
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="../typings/functionset" />


namespace Shapes.DesignTalk.Core.QueryCompiler {

    //
    // ─── TYPES ──────────────────────────────────────────────────────────────────────
    //
    
        type QueryChecker =
            ( shape: Storage.IShape ) => boolean
    
        type QueryCheckerOrNull =
            QueryChecker | null

    //
    // ─── GENERATE QUERY FUNCTION ────────────────────────────────────────────────────
    //

        export function generate ( query: Query ): QueryFunction {
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
                checkers.filter( checker => checker !== null ) as QueryChecker[ ]

            const filterFunction = ( shape: Storage.IShape ) => {
                for ( const checker of effectiveCheckers )
                    if ( !checker( shape ) )
                        return false

                return true
            }

            return ( shapes: Storage.IShape[ ] ) => {
                return shapes.filter( filterFunction )
            }
        }

    //
    // ─── CHECKER FOR COLOR ──────────────────────────────────────────────────────────
    //

        function generateChackerForColor ( query: Query ): QueryCheckerOrNull {
            if ( query.color === "all" )
                return null

            return ( shape: Storage.IShape ) =>
                shape.color === query.color
        }

    //
    // ─── CHECKER FOR SHAPE TYPE ─────────────────────────────────────────────────────
    //

        function generateCheckerForShapeKind ( query: Query ): QueryCheckerOrNull {
            if  ( query.kind === "all" )
                return null

            return ( shape: Storage.IShape ) =>
                shape.type === query.kind
        }

    // ────────────────────────────────────────────────────────────────────────────────

}