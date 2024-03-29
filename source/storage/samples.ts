
//
// Copyright 2017-present by Pouya Kary. All Rights Reserved.
//

/// <reference path="model.ts" />
/// <reference path="../globals/helpers.ts" />
/// <reference path="../logic/canvas/center.ts" />

namespace DesignTalk.Storage {

    //
    // ─── MODEL ONE ──────────────────────────────────────────────────────────────────
    //

        const one =
            '{"height":381,"width":643,"code":[{"color":"blue","id":"8","remove":false,"type":"rect","width":100,"height":100,"x":130,"y":151,"zIndex":7},{"color":"blue","id":"10806","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":21,"zIndex":12},{"color":"red","id":"5719","remove":false,"type":"rect","width":100,"height":100,"x":133,"y":21,"zIndex":13},{"color":"red","id":"7560","remove":false,"type":"rect","width":100,"height":100,"x":262,"y":151,"zIndex":14},{"color":"black","id":"20450","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":1,"zIndex":15},{"color":"black","id":"9688","remove":false,"type":"rect","width":100,"height":100,"x":263,"y":21,"zIndex":15},{"color":"red","id":"74106","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":281,"zIndex":15},{"color":"black","id":"24476","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":151,"zIndex":16},{"color":"blue","id":"11937","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":0,"zIndex":16},{"color":"blue","id":"80129","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":261,"zIndex":16},{"color":"red","id":"29516","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":131,"zIndex":17},{"color":"red","id":"100621","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":21,"zIndex":18},{"color":"red","id":"20389","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":0,"zIndex":18},{"color":"black","id":"25478","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":131,"zIndex":19},{"color":"blue","id":"30875","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":131,"zIndex":20},{"color":"blue","id":"118774","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":1,"zIndex":20},{"color":"blue","id":"125650","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":151,"zIndex":21},{"color":"black","id":"132679","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":131,"zIndex":22},{"color":"black","id":"64447","remove":false,"type":"rect","width":100,"height":100,"x":130,"y":281,"zIndex":23},{"color":"black","id":"139693","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":281,"zIndex":23},{"color":"blue","id":"69301","remove":false,"type":"rect","width":100,"height":100,"x":263,"y":281,"zIndex":24},{"color":"red","id":"152052","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":261,"zIndex":24},{"color":"red","id":"73998","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":281,"zIndex":25},{"color":"blue","id":"77280","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":261,"zIndex":26},{"color":"black","id":"96542","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":261,"zIndex":29},{"color":"red","id":"102654","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":261,"zIndex":30},{"color":"blue","id":"400351","remove":false,"type":"rect","width":100,"height":100,"x":3,"y":21,"zIndex":47},{"color":"black","id":"428663","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":1,"zIndex":50},{"color":"black","id":"438883","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":151,"zIndex":51},{"color":"red","id":"443649","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":131,"zIndex":52}]}'

    //
    // ─── TWO ────────────────────────────────────────────────────────────────────────
    //

        const two =
            '{"height":446,"width":270,"code":[{"color":"blue","id":"6502","remove":false,"type":"rect","width":100,"height":100,"x":170,"y":346,"zIndex":11,"size":100},{"color":"black","id":"8849","remove":false,"type":"rect","width":100,"height":160,"x":170,"y":186,"zIndex":12,"size":100},{"color":"blue","id":"14612","remove":false,"type":"circle","width":270,"height":270,"x":0,"y":59,"zIndex":13,"size":270},{"color":"black","id":"22414","remove":false,"type":"rect","width":100,"height":160,"x":0,"y":186,"zIndex":14,"size":100},{"color":"blue","id":"31307","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":346,"zIndex":15,"size":100},{"color":"red","id":"32598","remove":false,"type":"circle","width":120,"height":120,"x":74,"y":0,"zIndex":16,"size":120},{"color":"black","id":"35950","remove":false,"type":"circle","width":40,"height":40,"x":127,"y":10,"zIndex":17,"size":40}]}'

    //
    // ─── MODELS ─────────────────────────────────────────────────────────────────────
    //

        export function getARandomSampleModel ( ) {
            const model =
                 chooseRandom([ one, two ])

            return JSON.parse( model ) as Logic.Canvas.CroppedShapes
        }

    // ────────────────────────────────────────────────────────────────────────────────

}