
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

//
// ─── WEBKIT SPEACH RECOGNITION ──────────────────────────────────────────────────
//

    declare class webkitSpeechRecognition {
        constructor ( )
        public continuous: boolean
        public interimResults: boolean

        public onstart: ( ) => void 
        public onresult: ( event: IWebkitSpeaehRecognitionResult ) => void
        public onerror: ( event: IWebkitSpeechRecognitionError ) => void
        public onend: ( ) => void

        public start( ): void
        public stop( ): void
    }


    interface IWebkitSpeaehRecognitionResult {
        resultIndex:    number
        results:        IWebkitSpeaehRecognitionResultSet<IWebkitSpeaehRecognitionResultSetElement>[ ]
    }

    declare class IWebkitSpeaehRecognitionResultSet<T> extends Array<T> {
        isFinal:    boolean
    }

    interface IWebkitSpeaehRecognitionResultSetElement {
        transcript:     string
    }

    interface IWebkitSpeechRecognitionError {

    }

// ────────────────────────────────────────────────────────────────────────────────
