
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

namespace DesignTalk.Storage {

    //
    // ─── ACTION TYPE ────────────────────────────────────────────────────────────────
    //

        export enum EActionType {
            Select
        }

    //
    // ─── ACTION TYPE ────────────────────────────────────────────────────────────────
    //

        export type TAction
            = ISelectAction

    //
    // ─── ACTION TYPES ───────────────────────────────────────────────────────────────
    //

        export interface ISelectAction {
            type:           EActionType.Select
            targetShapeId:  string
            selection:      boolean
        }

    // ────────────────────────────────────────────────────────────────────────────────

}