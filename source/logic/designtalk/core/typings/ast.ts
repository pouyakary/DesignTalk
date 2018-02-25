

//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace Shapes.DesignTalk.Core {

    //
    // ─── MAIN LANGUAGE ──────────────────────────────────────────────────────────────
    //

        export type AST = Command[ ]

    //
    // ─── COMMANDS ───────────────────────────────────────────────────────────────────
    //

        export type Command
            = RemoveCommand
            | ResizeCommand

    //
    // ─── REMOVE COMMAND ─────────────────────────────────────────────────────────────
    //

        export interface RemoveCommand {
            command:    "remove"
            query:      Query
        }

    //
    // ─── RESIZE ─────────────────────────────────────────────────────────────────────
    //

        export interface ResizeCommand {
            command:    "resizes"
            direction:  "both" | "width" | "height"
            query:      Query
            operator:   "smaller" | "bigger"
            size:       Size1D
        }

    //
    // ─── QUERY ──────────────────────────────────────────────────────────────────────
    //

        export interface Query {
            mode:           "new" | "previous"
            range:          QueryRange
            color:          SelectorColor
            kind:           SelectorKind
            conditions:     QueryCondition[ ]
        }

        export interface QueryRange {
            mode: "all" | "biggest" | "smallest"
            range: number
        }

        export type QueryCondition
            = SizeQuery
            | LocationQuery

        export interface LocationQuery {
            query:      "location"
            direction:  "x" | "y"
            operator:   SelectorColor
            size:       Size
        }

        export interface SizeQuery {
            query:      "size"
            dimension:  "width" | "height" | "both"
            operator:   SelectorOperator
            size:       Size
        }

    //
    // ─── SELECTORS ──────────────────────────────────────────────────────────────────
    //

        export type SelectorColor =
            "all" | "red" | "blue" | "black"

        export type SelectorKind =
            "all" | "circle" | "rect"

        export interface SelectorOperator {
            negation:   boolean
            operator:   ">" | "<" | "=" | "<=" | ">="
        }

    //
    // ─── SIZE ───────────────────────────────────────────────────────────────────────
    //

        export type Size
            = Size1D | Size2D

        export interface SizeBase {
            dimensions:     1 | 2
            unit:           Unit
        }

        export interface Size1D extends SizeBase {
            dimensions:     1
            size:           number
        }

        export interface Size2D extends SizeBase {
            dimensions:     2
            width:          number
            height:         number
        }

    //
    // ─── UNIT ───────────────────────────────────────────────────────────────────────
    //

        export type Unit =
            "point" | "pixel" | "times"

    // ────────────────────────────────────────────────────────────────────────────────

}