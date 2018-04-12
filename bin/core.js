"use strict";
var DesignTalk;
(function (DesignTalk) {
    var Storage;
    (function (Storage) {
        let MouseMode;
        (function (MouseMode) {
            MouseMode[MouseMode["Move"] = 0] = "Move";
            MouseMode[MouseMode["Resize"] = 1] = "Resize";
        })(MouseMode = Storage.MouseMode || (Storage.MouseMode = {}));
    })(Storage = DesignTalk.Storage || (DesignTalk.Storage = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Storage;
    (function (Storage) {
        let EActionType;
        (function (EActionType) {
            EActionType[EActionType["Select"] = 0] = "Select";
        })(EActionType = Storage.EActionType || (Storage.EActionType = {}));
    })(Storage = DesignTalk.Storage || (DesignTalk.Storage = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    let __KeyValueStorage = 1;
    function generateKey() {
        return (__KeyValueStorage++).toString();
    }
    DesignTalk.generateKey = generateKey;
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    function chooseRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    DesignTalk.chooseRandom = chooseRandom;
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Logic;
    (function (Logic) {
        var Canvas;
        (function (Canvas) {
            function getCroppedShapes(shapes) {
                let minX = Infinity;
                let minY = Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;
                for (const shape of shapes) {
                    if (shape.x < minX)
                        minX = shape.x;
                    if (shape.x + shape.width > maxX)
                        maxX = shape.x + shape.width;
                    if (shape.y < minY)
                        minY = shape.y;
                    if (shape.y + shape.height > maxY)
                        maxY = shape.y + shape.height;
                }
                const resultCode = shapes.map(shape => (Object.assign({}, shape, { x: shape.x - minX, y: shape.y - minY })));
                const result = {
                    height: maxY - minY,
                    width: maxX - minX,
                    code: resultCode
                };
                return result;
            }
            Canvas.getCroppedShapes = getCroppedShapes;
            function getScreenCenteredShapes(model) {
                const additionalX = Math.floor((window.innerWidth - model.width) / 2);
                const additionalY = Math.floor((window.innerHeight - model.height) / 2);
                const resultShapes = model.code.map(shape => (Object.assign({}, shape, { x: shape.x + additionalX, y: shape.y + additionalY })));
                return resultShapes;
            }
            Canvas.getScreenCenteredShapes = getScreenCenteredShapes;
            function centerDrawingsInTheCanvas() {
                DesignTalk.Storage.setState(state => (Object.assign({}, state, { shapes: getScreenCenteredShapes(getCroppedShapes(state.shapes)) })));
            }
            Canvas.centerDrawingsInTheCanvas = centerDrawingsInTheCanvas;
        })(Canvas = Logic.Canvas || (Logic.Canvas = {}));
    })(Logic = DesignTalk.Logic || (DesignTalk.Logic = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Storage;
    (function (Storage) {
        const one = '{"height":381,"width":643,"code":[{"color":"blue","id":"8","remove":false,"type":"rect","width":100,"height":100,"x":130,"y":151,"zIndex":7},{"color":"blue","id":"10806","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":21,"zIndex":12},{"color":"red","id":"5719","remove":false,"type":"rect","width":100,"height":100,"x":133,"y":21,"zIndex":13},{"color":"red","id":"7560","remove":false,"type":"rect","width":100,"height":100,"x":262,"y":151,"zIndex":14},{"color":"black","id":"20450","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":1,"zIndex":15},{"color":"black","id":"9688","remove":false,"type":"rect","width":100,"height":100,"x":263,"y":21,"zIndex":15},{"color":"red","id":"74106","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":281,"zIndex":15},{"color":"black","id":"24476","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":151,"zIndex":16},{"color":"blue","id":"11937","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":0,"zIndex":16},{"color":"blue","id":"80129","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":261,"zIndex":16},{"color":"red","id":"29516","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":131,"zIndex":17},{"color":"red","id":"100621","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":21,"zIndex":18},{"color":"red","id":"20389","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":0,"zIndex":18},{"color":"black","id":"25478","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":131,"zIndex":19},{"color":"blue","id":"30875","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":131,"zIndex":20},{"color":"blue","id":"118774","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":1,"zIndex":20},{"color":"blue","id":"125650","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":151,"zIndex":21},{"color":"black","id":"132679","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":131,"zIndex":22},{"color":"black","id":"64447","remove":false,"type":"rect","width":100,"height":100,"x":130,"y":281,"zIndex":23},{"color":"black","id":"139693","remove":false,"type":"rect","width":100,"height":100,"x":523,"y":281,"zIndex":23},{"color":"blue","id":"69301","remove":false,"type":"rect","width":100,"height":100,"x":263,"y":281,"zIndex":24},{"color":"red","id":"152052","remove":false,"type":"circle","width":100,"height":100,"x":543,"y":261,"zIndex":24},{"color":"red","id":"73998","remove":false,"type":"rect","width":100,"height":100,"x":393,"y":281,"zIndex":25},{"color":"blue","id":"77280","remove":false,"type":"circle","width":100,"height":100,"x":413,"y":261,"zIndex":26},{"color":"black","id":"96542","remove":false,"type":"circle","width":100,"height":100,"x":283,"y":261,"zIndex":29},{"color":"red","id":"102654","remove":false,"type":"circle","width":100,"height":100,"x":150,"y":261,"zIndex":30},{"color":"blue","id":"400351","remove":false,"type":"rect","width":100,"height":100,"x":3,"y":21,"zIndex":47},{"color":"black","id":"428663","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":1,"zIndex":50},{"color":"black","id":"438883","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":151,"zIndex":51},{"color":"red","id":"443649","remove":false,"type":"circle","width":100,"height":100,"x":22,"y":131,"zIndex":52}]}';
        const two = '{"height":446,"width":270,"code":[{"color":"blue","id":"6502","remove":false,"type":"rect","width":100,"height":100,"x":170,"y":346,"zIndex":11,"size":100},{"color":"black","id":"8849","remove":false,"type":"rect","width":100,"height":160,"x":170,"y":186,"zIndex":12,"size":100},{"color":"blue","id":"14612","remove":false,"type":"circle","width":270,"height":270,"x":0,"y":59,"zIndex":13,"size":270},{"color":"black","id":"22414","remove":false,"type":"rect","width":100,"height":160,"x":0,"y":186,"zIndex":14,"size":100},{"color":"blue","id":"31307","remove":false,"type":"rect","width":100,"height":100,"x":0,"y":346,"zIndex":15,"size":100},{"color":"red","id":"32598","remove":false,"type":"circle","width":120,"height":120,"x":74,"y":0,"zIndex":16,"size":120},{"color":"black","id":"35950","remove":false,"type":"circle","width":40,"height":40,"x":127,"y":10,"zIndex":17,"size":40}]}';
        function getARandomSampleModel() {
            const model = DesignTalk.chooseRandom([one, two]);
            return JSON.parse(model);
        }
        Storage.getARandomSampleModel = getARandomSampleModel;
    })(Storage = DesignTalk.Storage || (DesignTalk.Storage = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Storage;
    (function (Storage) {
        function createInitialModelState() {
            const someShapes = new Array();
            const localStorageShapes = DesignTalk.LocalStorageDriver.load();
            if (localStorageShapes !== null) {
                someShapes.push(...localStorageShapes);
            }
            else {
                someShapes.push(...getRandomSample());
            }
            return {
                shapes: someShapes,
                showLineGuides: false,
                selectedId: null,
                previousSelectionIDs: [],
                mouseMode: Storage.MouseMode.Move,
                maxZIndex: 10,
                contextMenu: {
                    active: false,
                    recognizer: null,
                    recognizedText: "",
                    mouseX: 0,
                    mouseY: 0,
                }
            };
        }
        Storage.createInitialModelState = createInitialModelState;
        function getRandomCoordinates() {
            const randomSize = (size) => Math.floor(Math.random() * (size - 300)) + 100;
            return {
                x: randomSize(window.innerWidth),
                y: randomSize(window.innerHeight),
            };
        }
        function getRandomSample() {
            const model = Storage.getARandomSampleModel();
            const centeredShapes = DesignTalk.Logic.Canvas.getScreenCenteredShapes(model);
            return centeredShapes;
        }
        Storage.getRandomSample = getRandomSample;
        function createRandomShape(zIndex) {
            const color = DesignTalk.chooseRandom(['red', 'black', 'blue']);
            const type = DesignTalk.chooseRandom(['rect', 'circle']);
            const { x, y } = getRandomCoordinates();
            return {
                color: color,
                id: DesignTalk.generateKey(),
                remove: false,
                type: type,
                width: 100,
                height: 100,
                x: x,
                y: y,
                zIndex: zIndex,
            };
        }
        Storage.createRandomShape = createRandomShape;
        function duplicateShape(zIndex, baseShape) {
            return {
                color: baseShape.color,
                id: DesignTalk.generateKey(),
                remove: false,
                type: baseShape.type,
                width: baseShape.width,
                height: baseShape.height,
                x: baseShape.x + 15,
                y: baseShape.y + 15,
                zIndex: zIndex,
            };
        }
        Storage.duplicateShape = duplicateShape;
    })(Storage = DesignTalk.Storage || (DesignTalk.Storage = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var Editor;
        (function (Editor) {
            class Shape extends React.Component {
                constructor() {
                    super(...arguments);
                    this.lastState = DesignTalk.Storage.getState();
                }
                render() {
                    return this.renderShape(this.props.shape);
                }
                isShapedSelected() {
                    return this.props.shape.id === this.lastState.selectedId;
                }
                renderShape(shape) {
                    const color = this.props.shape.color;
                    const opacity = this.getShapeOpacity(shape);
                    switch (shape.type) {
                        case 'rect':
                            return this.createRect(shape, color, opacity);
                        case 'circle':
                            return this.createCircle(shape, color, opacity);
                    }
                }
                getShapeOpacity(shape) {
                    if (this.lastState.selectedId !== null &&
                        this.lastState.selectedId !== shape.id) {
                        return 0.5;
                    }
                    if (this.lastState.selectedId === shape.id)
                        return 0.95;
                    return 1;
                }
                onMouseEnter() {
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { hoveredId: this.props.shape.id, showLineGuides: false })));
                }
                onMouseLeave() {
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { hoveredId: null })));
                }
                onClick() {
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { selectedId: this.props.shape.id, showLineGuides: false, mouseMode: DesignTalk.Storage.MouseMode.Move })));
                }
                createCircle(shape, color, opacity) {
                    const rX = shape.width / 2;
                    const rY = shape.height / 2;
                    return React.createElement("ellipse", { cx: shape.x + rX, cy: shape.y + rY, fill: color, rx: rX, ry: rY, opacity: opacity, key: DesignTalk.generateKey(), onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
                createRect(shape, color, opacity) {
                    return React.createElement("rect", { x: shape.x, y: shape.y, width: shape.width, height: shape.height, key: DesignTalk.generateKey(), opacity: opacity, fill: color, onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
            }
            Editor.Shape = Shape;
        })(Editor = Render.Editor || (Render.Editor = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var SVGLayers;
        (function (SVGLayers) {
            var Background;
            (function (Background) {
                function render() {
                    const mustBeSmallCopyRight = window.innerWidth < 500;
                    const copyright = (mustBeSmallCopyRight
                        ? "2017-present, Pouya Kary"
                        : "2017-present by Pouya Kary, All rights reserved.");
                    const copyrightRightDistance = (mustBeSmallCopyRight
                        ? 180
                        : 300);
                    return [
                        React.createElement("g", { key: DesignTalk.generateKey() },
                            React.createElement("rect", { fill: "white", onClick: onClick, style: { width: "100vw", height: "100vh" } }),
                            React.createElement("text", { x: 30, y: 40, fill: "black", fontFamily: "Roboto", fontWeight: "500", fontSize: "30" }, "DesignTalk"),
                            React.createElement("text", { x: window.innerWidth - copyrightRightDistance, y: 38, fill: "#ccc", fontFamily: "Roboto", fontSize: "12" },
                                "\u00A9 ",
                                copyright))
                    ];
                }
                Background.render = render;
                function onClick() {
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { selectedId: null })));
                }
            })(Background = SVGLayers.Background || (SVGLayers.Background = {}));
        })(SVGLayers = Render.SVGLayers || (Render.SVGLayers = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var SVGLayers;
        (function (SVGLayers) {
            var Shapes;
            (function (Shapes) {
                function render(model) {
                    const sortedShapes = model.shapes.sort((a, b) => a.zIndex - b.zIndex);
                    const elementedShapes = sortedShapes.map(shape => React.createElement(Render.Editor.Shape, { shape: shape, key: DesignTalk.generateKey() }));
                    return elementedShapes;
                }
                Shapes.render = render;
            })(Shapes = SVGLayers.Shapes || (SVGLayers.Shapes = {}));
        })(SVGLayers = Render.SVGLayers || (Render.SVGLayers = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Logic;
    (function (Logic) {
        var ContextMenu;
        (function (ContextMenu) {
            function close() {
                DesignTalk.Storage.setState(state => {
                    if (state.contextMenu.recognizer !== null)
                        state.contextMenu.recognizer.stop();
                    return Object.assign({}, state, { contextMenu: Object.assign({}, state.contextMenu, { active: false, recognizedText: "", recognizer: null }) });
                });
            }
            ContextMenu.close = close;
        })(ContextMenu = Logic.ContextMenu || (Logic.ContextMenu = {}));
    })(Logic = DesignTalk.Logic || (DesignTalk.Logic = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var SpeechCommandEngine;
    (function (SpeechCommandEngine) {
        function trigger() {
            const state = DesignTalk.Storage.getState();
            if (state.contextMenu.active)
                end();
            else
                start();
        }
        SpeechCommandEngine.trigger = trigger;
        function start() {
            const recognizer = createNewRecognizer();
            recognizer.start();
            DesignTalk.Storage.setState(state => {
                return Object.assign({}, state, { selectedId: null, showLineGuides: false, mouseMode: DesignTalk.Storage.MouseMode.Resize, contextMenu: Object.assign({}, state.contextMenu, { active: true, recognizer: recognizer, recognizedText: "", mouseX: DesignTalk.MouseDriver.X, mouseY: DesignTalk.MouseDriver.Y }) });
            });
        }
        function end() {
            DesignTalk.Storage.setState(state => {
                const newState = DesignTalk.LanguageCore.runWithGivenState(state.contextMenu.recognizedText, state);
                return newState;
            });
            DesignTalk.Logic.ContextMenu.close();
        }
        function createNewRecognizer() {
            const recognizer = new webkitSpeechRecognition();
            recognizer.continuous = true;
            recognizer.onresult = event => onResult(event);
            return recognizer;
        }
        function onResult(event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (transcript.trim().toLocaleLowerCase() === "done")
                    end();
                else
                    updateScreenText(transcript);
            }
        }
        function updateScreenText(newPart) {
            DesignTalk.Storage.setState(state => {
                console.log(state.contextMenu);
                return Object.assign({}, state, { contextMenu: Object.assign({}, state.contextMenu, { recognizedText: updateText(state.contextMenu.recognizedText, newPart) }) });
            });
        }
        function updateText(buffer, newPart) {
            switch (newPart.trim()) {
                case 'oops':
                case 'sorry':
                case 'back':
                case 'ignore':
                    const words = buffer.split(' ');
                    words.pop();
                    return words.join(' ');
                case 'clear':
                case 'clean':
                case 'reset':
                    return '';
                default:
                    return buffer + newPart;
            }
        }
    })(SpeechCommandEngine = DesignTalk.SpeechCommandEngine || (DesignTalk.SpeechCommandEngine = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var MouseDriver;
    (function (MouseDriver) {
        MouseDriver.X = 0;
        MouseDriver.Y = 0;
        MouseDriver.Clicked = false;
        let shouldMove = false;
        function init() {
            mouseClickEvents();
            onRightClick();
            mouseMoveEvents();
        }
        MouseDriver.init = init;
        function mouseMoveEvents() {
            window.onmousemove = event => {
                handleMouseMove(event);
                updateMousePosition(event);
            };
        }
        function handleMouseMove(event) {
            const state = DesignTalk.Storage.getState();
            if (MouseDriver.Clicked) {
                if (state.selectedId !== null) {
                    if (state.mouseMode == DesignTalk.Storage.MouseMode.Move) {
                        updateSelectedShapePositionOnMouseMove(event, state);
                    }
                    else {
                        updateSelectedShapeSizeOnMouseMove(event, state);
                    }
                }
            }
            else {
            }
        }
        let moveReseter;
        function updateSelectedShapeSizeOnMouseMove(event, state) {
            clearTimeout(moveReseter);
            moveReseter = setTimeout(() => {
                if (!MouseDriver.Clicked)
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { mouseMode: DesignTalk.Storage.MouseMode.Move })));
            }, 30);
            const selectedShape = state.shapes.find(x => x.id == state.selectedId);
            DesignTalk.Storage.setState(state => {
                const margin = 10;
                const newShapes = state.shapes.map(shape => {
                    if (shape.id === state.selectedId) {
                        const width = event.clientX - (shape.x + margin);
                        const height = event.clientY - (shape.y + margin);
                        if (width > 10)
                            shape.width = width;
                        if (height > 10)
                            shape.height = height;
                    }
                    return Object.assign({}, shape, { size: shape.width });
                });
                return Object.assign({}, state, { hoveredId: null, showLineGuides: true, shapes: newShapes });
            });
        }
        function updateSelectedShapePositionOnMouseMove(event, state) {
            const selectedShape = state.shapes.find(x => x.id == state.selectedId);
            const XDiff = selectedShape.x - MouseDriver.X;
            const YDiff = selectedShape.y - MouseDriver.Y;
            DesignTalk.Storage.setState(state => {
                const newShapes = state.shapes.map(shape => {
                    if (shape.id === state.selectedId) {
                        shape.x = event.clientX + XDiff;
                        shape.y = event.clientY + YDiff;
                    }
                    return shape;
                });
                return Object.assign({}, state, { hoveredId: null, showLineGuides: true, shapes: newShapes });
            });
        }
        function updateMousePosition(event) {
            MouseDriver.X = event.clientX;
            MouseDriver.Y = event.clientY;
        }
        function mouseClickEvents() {
            document.body.onmousedown = event => {
                MouseDriver.Clicked = true;
            };
            document.body.onmouseup = event => {
                updateMousePosition(event);
                MouseDriver.Clicked = false;
            };
        }
        function onRightClick() {
            document.oncontextmenu = event => {
                event.preventDefault();
                updateMousePosition(event);
                DesignTalk.SpeechCommandEngine.trigger();
            };
        }
    })(MouseDriver = DesignTalk.MouseDriver || (DesignTalk.MouseDriver = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var SelectionTool;
        (function (SelectionTool) {
            const margin = 10;
            const strokeWidth = 2;
            const textBackgroundHeight = 25;
            function render(model) {
                if (model.selectedId)
                    return createSelectionTool(model);
                else
                    return [undefined];
            }
            SelectionTool.render = render;
            function computeHaskligBold12TextLength(text) {
                return text.length * 7.5 + 11;
            }
            function createSelectionTool(state) {
                const shape = state.shapes.find(shape => shape.id === state.selectedId);
                const guideLines = createGuideLines(shape, state);
                const tooltip = createToolTipShape(shape, state);
                const rectangle = createSelectionRectangle(shape);
                const resizeHandle = createResizeHandle(shape, state);
                const deleteButton = createDeleteButton(shape, state);
                const duplicateButton = createDuplicateButton(shape, state);
                const colorButtons = createColorButtons(shape, state);
                const shapeButtons = changeShapeModelButtons(shape, state);
                return [
                    ...guideLines,
                    ...tooltip,
                    rectangle,
                    resizeHandle,
                    deleteButton,
                    duplicateButton,
                    colorButtons,
                    ...shapeButtons,
                ];
            }
            function createSelectionRectangle(shape) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const width = shape.width + margin * 2;
                const height = shape.height + margin * 2;
                const onMouseLeave = () => DesignTalk.Storage.setState(state => (Object.assign({}, state, { showLineGuides: false })));
                const rectangle = React.createElement("rect", { fill: "transparent", stroke: "black", strokeWidth: "2", key: DesignTalk.generateKey(), onMouseLeave: event => onMouseLeave(), x: x, y: y, width: width, height: height });
                return rectangle;
            }
            function createToolTipShape(shape, state) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const descriptionText = getDescriptionText(shape, state);
                const descriptionBackground = React.createElement("rect", { fill: "yellow", key: DesignTalk.generateKey(), x: x, y: y - textBackgroundHeight - 10, width: computeHaskligBold12TextLength(descriptionText), height: textBackgroundHeight, stroke: "black", strokeWidth: 2 });
                const description = React.createElement("text", { x: x + strokeWidth + 6, y: y - textBackgroundHeight + 6, key: DesignTalk.generateKey(), fill: "black", fontFamily: "HaskligBold", fontSize: "12" }, descriptionText);
                return [
                    descriptionBackground,
                    description,
                ];
            }
            function getDescriptionText(shape, state) {
                if (state.showLineGuides && state.mouseMode === DesignTalk.Storage.MouseMode.Resize)
                    return 'SIZE ' + shape.width + ':' + shape.height;
                if (state.showLineGuides && state.mouseMode === DesignTalk.Storage.MouseMode.Move)
                    return 'X ' + shape.x + ' • Y ' + shape.y;
                return 'X ' + shape.x + ' • Y ' + shape.y + ' • SIZE ' + shape.width + ':' + shape.height;
            }
            function createGuideLines(shape, model) {
                if (!model.showLineGuides)
                    return [];
                const collectionOfHoroizontalPoints = new Set();
                const collectionOfVerticalPoints = new Set();
                const collectionOfMiddleHoroizontalPoints = new Set();
                const collectionOfMiddleVerticalPoints = new Set();
                model.shapes.map(obj => {
                    if (shape.id === obj.id)
                        return;
                    collectionOfVerticalPoints.add(obj.x);
                    collectionOfHoroizontalPoints.add(obj.y);
                    collectionOfVerticalPoints.add(obj.x + obj.width);
                    collectionOfHoroizontalPoints.add(obj.y + obj.height);
                    collectionOfMiddleVerticalPoints.add(obj.x + (obj.width / 2));
                    collectionOfMiddleHoroizontalPoints.add(obj.y + (obj.height / 2));
                });
                let LineDirection;
                (function (LineDirection) {
                    LineDirection[LineDirection["Horoizantal"] = 0] = "Horoizantal";
                    LineDirection[LineDirection["Vertical"] = 1] = "Vertical";
                })(LineDirection || (LineDirection = {}));
                const createLine = (x1, y1, x2, y2, direction) => {
                    const normalCollection = (direction === LineDirection.Horoizantal
                        ? collectionOfHoroizontalPoints
                        : collectionOfVerticalPoints);
                    const middleCollection = (direction === LineDirection.Horoizantal
                        ? collectionOfMiddleHoroizontalPoints
                        : collectionOfMiddleVerticalPoints);
                    function isThereANormalPoint() {
                        return normalCollection.has(x1) || normalCollection.has(y1) ||
                            normalCollection.has(x2) || normalCollection.has(y2);
                    }
                    const isThereMiddlePoint = (middleCollection.has(x1) || middleCollection.has(x2) ||
                        middleCollection.has(y1) || middleCollection.has(y2));
                    const lineColor = (isThereMiddlePoint
                        ? 'red'
                        : (isThereANormalPoint() ? 'cyan' : '#ccc'));
                    const lineStrokeWidth = (lineColor !== '#ccc' ? 2 : 1);
                    return React.createElement("line", { strokeWidth: lineStrokeWidth, stroke: lineColor, key: DesignTalk.generateKey(), x1: x1, y1: y1, x2: x2, y2: y2 });
                };
                const topGuideLine = createLine(0, shape.y, window.innerWidth, shape.y, LineDirection.Horoizantal);
                const bottomGuideLine = createLine(0, shape.y + shape.height, window.innerWidth, shape.y + shape.height, LineDirection.Horoizantal);
                const leftGuideLine = createLine(shape.x, 0, shape.x, window.innerHeight, LineDirection.Vertical);
                const rightGuideLine = createLine(shape.x + shape.width, 0, shape.x + shape.width, window.innerHeight, LineDirection.Vertical);
                return [
                    topGuideLine,
                    rightGuideLine,
                    bottomGuideLine,
                    leftGuideLine
                ];
            }
            function createResizeHandle(shape, state) {
                const x = shape.x + shape.width + margin;
                const y = shape.y + shape.height + margin;
                const setMouseMoveMode = (mode) => DesignTalk.Storage.setState(state => (Object.assign({}, state, { mouseMode: mode })));
                const setToResize = () => setMouseMoveMode(DesignTalk.Storage.MouseMode.Resize);
                const setToMove = () => setMouseMoveMode(DesignTalk.Storage.MouseMode.Move);
                const radius = state.mouseMode === DesignTalk.Storage.MouseMode.Resize ? 5 : 7;
                return React.createElement("circle", { fill: "black", cx: x, cy: y, onMouseEnter: event => setToResize(), onMouseLeave: event => setToMove(), key: DesignTalk.generateKey(), r: radius });
            }
            function createDeleteButton(shape, state) {
                function onDeleteButtonClicked() {
                    const newShapes = state.shapes.filter(element => element.id !== state.selectedId);
                    DesignTalk.Storage.setState(state => (Object.assign({}, state, { shapes: newShapes, selectedId: null, mouseMode: DesignTalk.Storage.MouseMode.Move, showLineGuides: false })));
                }
                return createButton(shape, state, 'DEL', 0, 0, onDeleteButtonClicked);
            }
            function createDuplicateButton(shape, state) {
                function onDuplicateButtonClicked() {
                    DesignTalk.Logic.Model.duplicateShape();
                }
                return createButton(shape, state, 'DUP', 0, -2 * (textBackgroundHeight + margin), onDuplicateButtonClicked);
            }
            function createButton(shape, state, buttonText, xDiff, yDiff, action) {
                if (state.showLineGuides)
                    return React.createElement("g", { key: DesignTalk.generateKey() });
                const textLength = computeHaskligBold12TextLength(buttonText);
                const x = shape.x - margin - textLength - 10 - xDiff;
                const y = shape.y - margin - yDiff;
                const backgroundRect = React.createElement("rect", { fill: "#eee", x: x, y: y - textBackgroundHeight - 10, width: textLength, height: textBackgroundHeight, strokeWidth: 2, stroke: "black" });
                const deleteText = React.createElement("text", { fill: "Black", x: x + 6, y: y - textBackgroundHeight + 6, fontFamily: "HaskligBold", fontSize: "12" }, buttonText);
                const buttonableLayer = React.createElement("rect", { x: x, y: y - textBackgroundHeight - 10, width: textLength, height: textBackgroundHeight, onClick: event => action(), fill: "transparent" });
                return React.createElement("g", { key: DesignTalk.generateKey() },
                    backgroundRect,
                    deleteText,
                    buttonableLayer);
            }
            function createColorButtons(shape, state) {
                if (state.showLineGuides)
                    return React.createElement("g", { key: DesignTalk.generateKey() });
                const colors = ['red', 'black', 'blue']
                    .filter(x => shape.color !== x);
                const buttons = colors.map((color, index) => createSingleColorButton(color, index + 1, shape));
                return React.createElement("g", { key: DesignTalk.generateKey() }, buttons);
            }
            function createSingleColorButton(color, index, shape) {
                const x = shape.x - margin - 5 - index * (textBackgroundHeight + 5);
                function onSetColor() {
                    DesignTalk.Storage.setState(state => {
                        const newShapes = state.shapes.map(x => (Object.assign({}, x, { color: (x.id === shape.id ? color : x.color) })));
                        return Object.assign({}, state, { shapes: newShapes });
                    });
                }
                const button = React.createElement("rect", { x: x, y: shape.y - margin, width: textBackgroundHeight, height: textBackgroundHeight, fill: color, key: DesignTalk.generateKey(), onClick: event => onSetColor(), strokeWidth: "2", stroke: "black" });
                return button;
            }
            function changeShapeModelButtons(shape, state) {
                if (state.showLineGuides)
                    return [React.createElement("g", { key: DesignTalk.generateKey() })];
                function onChangeShapeType() {
                    DesignTalk.Storage.setState(state => {
                        const newShapes = state.shapes.map(x => {
                            if (shape.id === x.id)
                                return Object.assign({}, x, { type: (x.id == shape.id && x.type === 'rect') ?
                                        'circle' : 'rect' });
                            else
                                return x;
                        });
                        return Object.assign({}, state, { shapes: newShapes });
                    });
                }
                const x = shape.x - 2 * margin - textBackgroundHeight;
                const y = shape.y + 2 * (textBackgroundHeight) + margin;
                const mainBackground = React.createElement("rect", { x: x, y: y, width: textBackgroundHeight, height: textBackgroundHeight, stroke: "black", key: DesignTalk.generateKey(), strokeWidth: "2", fill: "#eee" });
                const shapeSize = textBackgroundHeight - 10;
                const halfShape = shapeSize / 2;
                const shapeIcon = (shape.type === 'circle'
                    ? React.createElement("rect", { x: x + 5, y: y + 5, width: shapeSize, height: shapeSize, fill: shape.color })
                    : React.createElement("circle", { cx: x + 5 + halfShape, cy: y + 5 + halfShape, r: shapeSize / 2, fill: shape.color }));
                const transparentButtonableRect = React.createElement("rect", { x: x, y: y, height: textBackgroundHeight, width: textBackgroundHeight, onClick: event => onChangeShapeType(), fill: "transparent" });
                return [
                    mainBackground,
                    shapeIcon,
                    transparentButtonableRect,
                ];
            }
        })(SelectionTool = Render.SelectionTool || (Render.SelectionTool = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var SVGLayers;
        (function (SVGLayers) {
            var Selection;
            (function (Selection) {
                function render(model) {
                    return Render.SelectionTool.render(model);
                }
                Selection.render = render;
            })(Selection = SVGLayers.Selection || (SVGLayers.Selection = {}));
        })(SVGLayers = Render.SVGLayers || (Render.SVGLayers = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            const normalizationRegExp = /(?:'|\bthe\b)/g;
            function parse(code) {
                const normalizedCode = normalize(code);
                return DesignTalkParser.parse(normalizedCode);
            }
            Core.parse = parse;
            function normalize(code) {
                return code.replace(normalizationRegExp, '');
            }
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Logic;
    (function (Logic) {
        var Model;
        (function (Model) {
            function createNewShape() {
                DesignTalk.Storage.setState(state => {
                    const newMaxZIndex = state.maxZIndex + 1;
                    const newShape = DesignTalk.Storage.createRandomShape(newMaxZIndex);
                    state.shapes.push(newShape);
                    return Object.assign({}, state, { selectedId: newShape.id, mouseMode: DesignTalk.Storage.MouseMode.Move, maxZIndex: newMaxZIndex, showLineGuides: false });
                });
            }
            Model.createNewShape = createNewShape;
            function duplicateShape() {
                DesignTalk.Storage.setState(state => {
                    if (state.selectedId === null)
                        return state;
                    const newMaxZIndex = state.maxZIndex + 1;
                    const currentShape = state.shapes.find(shape => shape.id === state.selectedId);
                    const newShape = DesignTalk.Storage.duplicateShape(newMaxZIndex, currentShape);
                    state.shapes.push(newShape);
                    return Object.assign({}, state, { selectedId: newShape.id, mouseMode: DesignTalk.Storage.MouseMode.Move, maxZIndex: newMaxZIndex, showLineGuides: false });
                });
            }
            Model.duplicateShape = duplicateShape;
        })(Model = Logic.Model || (Logic.Model = {}));
    })(Logic = DesignTalk.Logic || (DesignTalk.Logic = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        var HTMLLayers;
        (function (HTMLLayers) {
            var RightClick;
            (function (RightClick) {
                const iconSize = 30;
                const backgroundSize = iconSize + 14;
                function render(model) {
                    return ((model.contextMenu.active)
                        ? shapeOnWorkingMode(model)
                        : []);
                }
                RightClick.render = render;
                function shapeOnWorkingMode(model) {
                    return React.createElement("div", { key: DesignTalk.generateKey(), style: {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            position: "fixed",
                            left: "0",
                            top: "0",
                            width: "100vw",
                            height: "100vh",
                        } },
                        recordingIcon(model),
                        createTextView(model));
                }
                function recordingIcon(model) {
                    const { mouseX, mouseY } = model.contextMenu;
                    return React.createElement("div", { style: {
                            backgroundColor: "black",
                            position: "fixed",
                            left: mouseX - (backgroundSize / 2),
                            top: mouseY - (backgroundSize / 2),
                            padding: (backgroundSize - iconSize) / 2,
                            width: iconSize,
                            height: iconSize,
                        } },
                        React.createElement("div", { className: "recorderIcon", style: {
                                width: iconSize,
                                height: iconSize,
                                borderRadius: iconSize / 2,
                                backgroundColor: "red",
                            } }),
                        createNewShapeButton(model),
                        createHelpButton(model));
                }
                function createTextView(model) {
                    const { mouseX, mouseY, recognizedText } = model.contextMenu;
                    if (recognizedText === "")
                        return React.createElement("div", null);
                    return React.createElement("div", { style: {
                            maxWidth: "160px",
                            position: "fixed",
                            left: mouseX - backgroundSize + 75,
                            top: mouseY - (backgroundSize / 2),
                            fontFamily: "HaskligBold",
                            fontSize: "12",
                            color: "black",
                            textTransform: "uppercase",
                            backgroundColor: "yellow",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderColor: "black",
                            userSelect: "none",
                        } },
                        React.createElement("div", { style: {
                                padding: "5px 10px 7px 10px",
                            } }, recognizedText),
                        React.createElement("div", { style: {
                                borderTopColor: "black",
                                borderTopWidth: 2,
                                borderTopStyle: "dashed",
                                padding: "5px 10px 7px 10px"
                            } }, DesignTalk.LanguageCore.isParsable(recognizedText)
                            ? "Looks Good"
                            : "Can't Understand"));
                }
                function createButton(name, state, XX, YY, onClickFunction) {
                    const { mouseX, mouseY } = state.contextMenu;
                    const functionForClick = () => {
                        onClickFunction();
                        DesignTalk.Logic.ContextMenu.close();
                    };
                    return React.createElement("div", { onClick: functionForClick, style: {
                            backgroundColor: "#eee",
                            fontFamily: "HaskligBold",
                            fontSize: 12,
                            border: "2px solid black",
                            padding: "3px 5px 5px 5px",
                            position: "fixed",
                            left: mouseX - XX,
                            top: mouseY - YY,
                            textTransform: "uppercase",
                            WebkitUserSelect: "none",
                        } }, name);
                }
                function createNewShapeButton(model) {
                    return createButton("new shape", model, 80, 65, () => {
                        DesignTalk.Logic.Model.createNewShape();
                    });
                }
                function createHelpButton(model) {
                    return createButton("wiki & help", model, 130, 25, () => {
                        window.open("https://www.notion.so/Shapes-dad307e81f1e46869ad6c355b1705921", "_blank");
                    });
                }
            })(RightClick = HTMLLayers.RightClick || (HTMLLayers.RightClick = {}));
        })(HTMLLayers = Render.HTMLLayers || (Render.HTMLLayers = {}));
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Render;
    (function (Render) {
        function renderApp(model) {
            const container = document.getElementById('container');
            const scene = createScene(model);
            ReactDOM.render(scene, container);
        }
        Render.renderApp = renderApp;
        function createScene(model) {
            const layerElements = [
                Render.SVGLayers.Background.render(),
                Render.SVGLayers.Shapes.render(model),
                Render.SVGLayers.Selection.render(model),
            ];
            const layers = layerElements.map((elements, index) => renderLayer(index, elements));
            return React.createElement("div", null,
                createMainSVG(layers),
                Render.HTMLLayers.RightClick.render(model));
        }
        function createMainSVG(layers) {
            return React.createElement("svg", { style: { width: "100vw", height: "100vh" }, key: DesignTalk.generateKey() }, layers);
        }
        function renderLayer(layer, elements) {
            return React.createElement("g", { key: DesignTalk.generateKey() }, elements);
        }
    })(Render = DesignTalk.Render || (DesignTalk.Render = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LocalStorageDriver;
    (function (LocalStorageDriver) {
        const LOCAL_STORAGE_ID = "us.kary.designtalk.shapes";
        let driverStorageTimeoutSetter;
        function storageUpdaterFunction(state) {
            const encodedStateString = JSON.stringify(state.shapes);
            localStorage.setItem(LOCAL_STORAGE_ID, encodedStateString);
        }
        LocalStorageDriver.storageUpdaterFunction = storageUpdaterFunction;
        function update(state) {
            clearTimeout(driverStorageTimeoutSetter);
            driverStorageTimeoutSetter =
                setTimeout(storageUpdaterFunction, 1000);
        }
        function load() {
            try {
                const encodedStateString = localStorage.getItem(LOCAL_STORAGE_ID);
                if (encodedStateString === null)
                    return null;
                const stateObject = JSON.parse(encodedStateString);
                return stateObject;
            }
            catch (e) {
                return null;
            }
        }
        LocalStorageDriver.load = load;
    })(LocalStorageDriver = DesignTalk.LocalStorageDriver || (DesignTalk.LocalStorageDriver = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Storage;
    (function (Storage) {
        const StorageContainer = new Array();
        const StorageSubscriptions = [
            DesignTalk.LocalStorageDriver.storageUpdaterFunction,
            DesignTalk.Render.renderApp,
        ];
        const OnStateChangeManipulationFunctions = new Set();
        function initStorage() {
            StorageContainer.push(Storage.createInitialModelState());
            setTimeout(() => runSubscribersOnChange(getState()), 100);
        }
        Storage.initStorage = initStorage;
        function getLastElement(arr) {
            return arr[arr.length - 1];
        }
        Storage.getLastElement = getLastElement;
        function getState() {
            return Object.assign({}, getLastElement(StorageContainer));
        }
        Storage.getState = getState;
        function runSubscribersOnChange(state) {
            for (const subscriber of StorageSubscriptions)
                subscriber(state);
        }
        function setState(setter) {
            const lastState = getState();
            let newState = setter(lastState);
            for (const manipulator of OnStateChangeManipulationFunctions)
                newState = manipulator(newState);
            StorageContainer.push(newState);
            runSubscribersOnChange(newState);
        }
        Storage.setState = setState;
        function undoState() {
            if (StorageContainer.length > 1) {
                StorageContainer.pop();
                const newTopOfTheStack = StorageContainer[StorageContainer.length - 1];
                runSubscribersOnChange(newTopOfTheStack);
            }
        }
        Storage.undoState = undoState;
        function addManipulationFunction(manipulator) {
            OnStateChangeManipulationFunctions.add(manipulator);
        }
        Storage.addManipulationFunction = addManipulationFunction;
    })(Storage = DesignTalk.Storage || (DesignTalk.Storage = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var ScreenDriver;
    (function (ScreenDriver) {
        ScreenDriver.PointSize = 0;
        function init() {
            const div = document.getElementById('dpi');
            div.style.width = '1pt';
            var result = window
                .getComputedStyle(div)
                .getPropertyValue('width');
            const pointSize = parseFloat(result);
            ScreenDriver.PointSize = pointSize;
        }
        ScreenDriver.init = init;
    })(ScreenDriver = DesignTalk.ScreenDriver || (DesignTalk.ScreenDriver = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var StateManipulators;
    (function (StateManipulators) {
        StateManipulators.ShapeDeleteManipulator = (state) => (Object.assign({}, state, { shapes: state.shapes.filter(x => !x.remove) }));
    })(StateManipulators = DesignTalk.StateManipulators || (DesignTalk.StateManipulators = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var StateManipulators;
    (function (StateManipulators) {
        function init() {
            DesignTalk.Storage.addManipulationFunction(StateManipulators.ShapeDeleteManipulator);
        }
        StateManipulators.init = init;
    })(StateManipulators = DesignTalk.StateManipulators || (DesignTalk.StateManipulators = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    window.onload = () => {
        if (window.location.protocol === "http:")
            window.location.href = "https://designtalk.kary.us/";
        DesignTalk.Storage.initStorage();
        DesignTalk.StateManipulators.init();
        DesignTalk.MouseDriver.init();
        DesignTalk.ScreenDriver.init();
    };
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var Developer;
    (function (Developer) {
        function CreateSample() {
            const { shapes } = DesignTalk.Storage.getState();
            const croppedShapes = DesignTalk.Logic.Canvas.getCroppedShapes(shapes);
            console.log(JSON.stringify(croppedShapes));
        }
        Developer.CreateSample = CreateSample;
    })(Developer = DesignTalk.Developer || (DesignTalk.Developer = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        function isParsable(code) {
            try {
                LanguageCore.Core.parse(code);
                return true;
            }
            catch (_a) {
                return false;
            }
        }
        LanguageCore.isParsable = isParsable;
        function runWithGivenState(code, state) {
            return LanguageCore.Core.run(code, state);
        }
        LanguageCore.runWithGivenState = runWithGivenState;
        function runAndApply(code) {
            DesignTalk.Storage.setState(state => LanguageCore.Core.run(code, state));
        }
        LanguageCore.runAndApply = runAndApply;
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            var QueryCompiler;
            (function (QueryCompiler) {
                function generate(query, state) {
                    if (query.mode === "new")
                        return generateNewQueryFunction(query);
                    else
                        return generatePreviousSelectionsFunction(state);
                }
                QueryCompiler.generate = generate;
                function generatePreviousSelectionsFunction(state) {
                    const shapeTable = {};
                    for (const shape of state.shapes)
                        shapeTable[shape.id] = shape;
                    return (shapes) => state.previousSelectionIDs.map(id => shapeTable[id]);
                }
                function generateNewQueryFunction(query) {
                    const checkers = [
                        generateCheckerForColor(query),
                        generateCheckerForShapeKind(query),
                    ];
                    for (const condition of query.conditions)
                        checkers.push(generateConditionChecker(condition));
                    return generateQueryFunction(query, checkers);
                }
                function generateQueryFunction(query, checkers) {
                    const effectiveCheckers = checkers.filter(checker => checker !== null);
                    const checker = (shape) => {
                        for (const checker of effectiveCheckers)
                            if (!checker(shape))
                                return false;
                        return true;
                    };
                    const rangedFilterFunction = generateRangeFilterFunction(query, checker);
                    return rangedFilterFunction;
                }
                function generateCheckerForColor(query) {
                    if (query.color === "all")
                        return null;
                    return (shape) => shape.color === query.color;
                }
                function generateCheckerForShapeKind(query) {
                    if (query.kind === "all")
                        return null;
                    return (shape) => shape.type === query.kind;
                }
                function generateConditionChecker(condition) {
                    switch (condition.query) {
                        case 'size':
                        default:
                            return generateCheckerForSizeQuery(condition);
                    }
                }
                function generateCheckerForSizeQuery(sizeQuery) {
                    if (sizeQuery.dimension === "both")
                        return generateCheckerForSize2DQuery(sizeQuery);
                    else
                        return generateCheckerForSize1DQuery(sizeQuery);
                }
                function generateCheckerForSize1DQuery(sizeQuery) {
                    const comparisonFunction = composeComparisonFunction(sizeQuery.operator);
                    const { size, unit } = sizeQuery.size;
                    const comparable = Core.convertSizeToPixel(size, unit);
                    const checker = (shape) => {
                        const baseSize = ((sizeQuery.dimension === "width")
                            ? shape.width
                            : shape.height);
                        return comparisonFunction(baseSize, comparable);
                    };
                    return checker;
                }
                function generateCheckerForSize2DQuery(sizeQuery) {
                    const comparisonFunction = composeComparisonFunction(sizeQuery.operator);
                    const { width, height, unit } = sizeQuery.size;
                    const widthSize = Core.convertSizeToPixel(width, unit);
                    const heightSize = Core.convertSizeToPixel(height, unit);
                    const checker = (shape) => comparisonFunction(shape.width, widthSize) &&
                        comparisonFunction(shape.height, heightSize);
                    return checker;
                }
                function composeComparisonFunction(operator) {
                    let comparisonFunction = (a, b) => true;
                    switch (operator.operator) {
                        case '=':
                            comparisonFunction =
                                (a, b) => a === b;
                            break;
                        case '>':
                            comparisonFunction =
                                (a, b) => a > b;
                            break;
                        case '<':
                            comparisonFunction =
                                (a, b) => a < b;
                            break;
                        case '<=':
                            comparisonFunction =
                                (a, b) => a <= b;
                            break;
                        case '>=':
                            comparisonFunction =
                                (a, b) => a >= b;
                            break;
                    }
                    const functionWithNegationApplied = (operator.negation
                        ? (a, b) => !comparisonFunction(a, b)
                        : comparisonFunction);
                    return functionWithNegationApplied;
                }
                function generateRangeFilterFunction(query, checker) {
                    switch (query.range.mode) {
                        case "biggest":
                            return createSmallestBiggestRangeSelector(query, checker, (a, b) => a - b);
                        case "smallest":
                            return createSmallestBiggestRangeSelector(query, checker, (a, b) => a + b);
                        case "all":
                        default:
                            return (shapes) => shapes.filter(checker);
                    }
                }
                function createSmallestBiggestRangeSelector(query, checker, operator) {
                    return (shapes) => {
                        const filteredShapes = shapes.filter(checker);
                        const rangeFilteredShapes = filteredShapes
                            .sort((a, b) => operator((b.width * b.height), (a.width * b.height)))
                            .splice(0, query.range.range);
                        return rangeFilteredShapes;
                    };
                }
            })(QueryCompiler = Core.QueryCompiler || (Core.QueryCompiler = {}));
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            var CommandCompiler;
            (function (CommandCompiler) {
                function generate(instruction) {
                    switch (instruction.command) {
                        case "remove":
                            return CommandCompiler.generateRemoveInstruction(instruction);
                        default:
                            return (shapes) => shapes;
                    }
                }
                CommandCompiler.generate = generate;
            })(CommandCompiler = Core.CommandCompiler || (Core.CommandCompiler = {}));
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            function run(code, state) {
                try {
                    const commands = Core.parse(code);
                    return executeCommands(commands, state);
                }
                catch (error) {
                    console.error(error);
                    return state;
                }
            }
            Core.run = run;
            function executeCommands(commands, state) {
                for (const command of commands)
                    state = runCommand(command, state);
                return state;
            }
            function runCommand(command, state) {
                const { queryFunction, manipulationFunction } = compileCommand(command, state);
                const selectedShapes = queryFunction(state.shapes);
                console.log(selectedShapes);
                const manipulatedShapes = manipulationFunction(selectedShapes);
                const newState = mergeShapes(state, manipulatedShapes);
                return newState;
            }
            function mergeShapes(state, manipulatedShapes) {
                const manipulatedShapeTable = {};
                const previousSelectionIDs = new Array();
                for (const shape of manipulatedShapes)
                    manipulatedShapeTable[shape.id] = shape;
                const shapes = state.shapes.map(shape => {
                    if (manipulatedShapeTable[shape.id] !== undefined) {
                        previousSelectionIDs.push(shape.id);
                        return manipulatedShapeTable[shape.id];
                    }
                    return shape;
                });
                return Object.assign({}, state, { shapes,
                    previousSelectionIDs });
            }
            function compileCommand(command, state) {
                const queryFunction = Core.QueryCompiler.generate(command.query, state);
                const manipulationFunction = Core.CommandCompiler.generate(command.instruction);
                return {
                    manipulationFunction,
                    queryFunction,
                };
            }
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            function convertSizeToPixel(size, unit) {
                switch (unit) {
                    case 'point':
                        return pointToPixel(size);
                    case 'pixel':
                    default:
                        return size;
                }
            }
            Core.convertSizeToPixel = convertSizeToPixel;
            function pointToPixel(points) {
                return points * DesignTalk.ScreenDriver.PointSize;
            }
            Core.pointToPixel = pointToPixel;
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
var DesignTalk;
(function (DesignTalk) {
    var LanguageCore;
    (function (LanguageCore) {
        var Core;
        (function (Core) {
            var CommandCompiler;
            (function (CommandCompiler) {
                function generateRemoveInstruction(instruction) {
                    return (shapes) => shapes.map(shape => (Object.assign({}, shape, { remove: true })));
                }
                CommandCompiler.generateRemoveInstruction = generateRemoveInstruction;
            })(CommandCompiler = Core.CommandCompiler || (Core.CommandCompiler = {}));
        })(Core = LanguageCore.Core || (LanguageCore.Core = {}));
    })(LanguageCore = DesignTalk.LanguageCore || (DesignTalk.LanguageCore = {}));
})(DesignTalk || (DesignTalk = {}));
//# sourceMappingURL=core.js.map