"use strict";
var Shapes;
(function (Shapes) {
    var Storage;
    (function (Storage) {
        let MouseMode;
        (function (MouseMode) {
            MouseMode[MouseMode["Move"] = 0] = "Move";
            MouseMode[MouseMode["Resize"] = 1] = "Resize";
        })(MouseMode = Storage.MouseMode || (Storage.MouseMode = {}));
    })(Storage = Shapes.Storage || (Shapes.Storage = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Storage;
    (function (Storage) {
        let EActionType;
        (function (EActionType) {
            EActionType[EActionType["Select"] = 0] = "Select";
        })(EActionType = Storage.EActionType || (Storage.EActionType = {}));
    })(Storage = Shapes.Storage || (Shapes.Storage = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    let __KeyValueStorage = 1;
    function generateKey() {
        return (__KeyValueStorage++).toString();
    }
    Shapes.generateKey = generateKey;
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Storage;
    (function (Storage) {
        function createInitialModelState() {
            const someShapes = new Array();
            for (let counter = 0; counter < 10; counter++)
                someShapes.push(createShape(counter));
            return {
                shapes: someShapes,
                showLineGuides: false,
                selectedId: null,
                previousSelectionIDs: [],
                mouseMode: Storage.MouseMode.Move,
                maxZIndex: 10,
                speachRecognition: {
                    isRecording: false,
                    recognizer: null,
                    currentText: "",
                    mouseX: 0,
                    mouseY: 0,
                }
            };
        }
        Storage.createInitialModelState = createInitialModelState;
        function chooseRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        function getRandomCoordinates() {
            const randomSize = (size) => Math.floor(Math.random() * (size - 300)) + 100;
            return {
                x: randomSize(window.innerWidth),
                y: randomSize(window.innerHeight),
            };
        }
        function createShape(zIndex) {
            const color = chooseRandom(['red', 'black', 'blue']);
            const type = chooseRandom(['rect', 'circle']);
            const { x, y } = getRandomCoordinates();
            return {
                color: color,
                id: Shapes.generateKey(),
                remove: false,
                type: type,
                width: 100,
                height: 100,
                x: x,
                y: y,
                zIndex: zIndex,
            };
        }
        Storage.createShape = createShape;
    })(Storage = Shapes.Storage || (Shapes.Storage = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Render;
    (function (Render) {
        var Editor;
        (function (Editor) {
            class Shape extends React.Component {
                constructor() {
                    super(...arguments);
                    this.lastState = Shapes.Storage.getState();
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
                    Shapes.Storage.setState(state => (Object.assign({}, state, { hoveredId: this.props.shape.id, showLineGuides: false })));
                }
                onMouseLeave() {
                    Shapes.Storage.setState(state => (Object.assign({}, state, { hoveredId: null })));
                }
                onClick() {
                    Shapes.Storage.setState(state => (Object.assign({}, state, { selectedId: this.props.shape.id, showLineGuides: false, mouseMode: Shapes.Storage.MouseMode.Move })));
                }
                createCircle(shape, color, opacity) {
                    const rX = shape.width / 2;
                    const rY = shape.height / 2;
                    return React.createElement("ellipse", { cx: shape.x + rX, cy: shape.y + rY, fill: color, rx: rX, ry: rY, opacity: opacity, key: Shapes.generateKey(), onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
                createRect(shape, color, opacity) {
                    return React.createElement("rect", { x: shape.x, y: shape.y, width: shape.width, height: shape.height, key: Shapes.generateKey(), opacity: opacity, fill: color, onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
            }
            Editor.Shape = Shape;
        })(Editor = Render.Editor || (Render.Editor = {}));
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
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
                        React.createElement("g", { key: Shapes.generateKey() },
                            React.createElement("rect", { fill: "white", onClick: onClick, style: { width: "100vw", height: "100vh" } }),
                            React.createElement("text", { x: 30, y: 40, fill: "black", fontFamily: "Roboto", fontWeight: "500", fontSize: "30" }, "Shapes"),
                            React.createElement("text", { x: window.innerWidth - copyrightRightDistance, y: 38, fill: "#ccc", fontFamily: "Roboto", fontSize: "12" },
                                "\u00A9 ",
                                copyright))
                    ];
                }
                Background.render = render;
                function onClick() {
                    Shapes.Storage.setState(state => (Object.assign({}, state, { selectedId: null })));
                }
            })(Background = SVGLayers.Background || (SVGLayers.Background = {}));
        })(SVGLayers = Render.SVGLayers || (Render.SVGLayers = {}));
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes_1) {
    var Render;
    (function (Render) {
        var SVGLayers;
        (function (SVGLayers) {
            var Shapes;
            (function (Shapes) {
                function render(model) {
                    const sortedShapes = model.shapes.sort((a, b) => a.zIndex - b.zIndex);
                    const elementedShapes = sortedShapes.map(shape => React.createElement(Render.Editor.Shape, { shape: shape, key: Shapes_1.generateKey() }));
                    return elementedShapes;
                }
                Shapes.render = render;
            })(Shapes = SVGLayers.Shapes || (SVGLayers.Shapes = {}));
        })(SVGLayers = Render.SVGLayers || (Render.SVGLayers = {}));
    })(Render = Shapes_1.Render || (Shapes_1.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var SpeachCommandEngine;
    (function (SpeachCommandEngine) {
        function trigger() {
            const state = Shapes.Storage.getState();
            if (state.speachRecognition.isRecording)
                end();
            else
                start();
        }
        SpeachCommandEngine.trigger = trigger;
        function start() {
            const recognizer = createNewRecognizer();
            recognizer.start();
            Shapes.Storage.setState(state => {
                return Object.assign({}, state, { selectedId: null, showLineGuides: false, mouseMode: Shapes.Storage.MouseMode.Resize, speachRecognition: Object.assign({}, state.speachRecognition, { isRecording: true, recognizer: recognizer, currentText: "", mouseX: Shapes.MouseDriver.X, mouseY: Shapes.MouseDriver.Y }) });
            });
        }
        function end() {
            Shapes.Storage.setState(state => {
                state.speachRecognition.recognizer.stop();
                const newState = Shapes.DesignTalk.runWithGivenState(state.speachRecognition.currentText, state);
                return Object.assign({}, newState, { speachRecognition: Object.assign({}, state.speachRecognition, { isRecording: false, recognizer: null, currentText: "" }) });
            });
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
            Shapes.Storage.setState(state => {
                console.log(state.speachRecognition);
                return Object.assign({}, state, { speachRecognition: Object.assign({}, state.speachRecognition, { currentText: updateText(state.speachRecognition.currentText, newPart) }) });
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
    })(SpeachCommandEngine = Shapes.SpeachCommandEngine || (Shapes.SpeachCommandEngine = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
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
            const state = Shapes.Storage.getState();
            if (MouseDriver.Clicked) {
                if (state.selectedId !== null) {
                    if (state.mouseMode == Shapes.Storage.MouseMode.Move) {
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
                    Shapes.Storage.setState(state => (Object.assign({}, state, { mouseMode: Shapes.Storage.MouseMode.Move })));
            }, 30);
            const selectedShape = state.shapes.find(x => x.id == state.selectedId);
            Shapes.Storage.setState(state => {
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
            Shapes.Storage.setState(state => {
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
            document.body.onmousedown = () => MouseDriver.Clicked = true;
            document.body.onmouseup = () => MouseDriver.Clicked = false;
        }
        function onRightClick() {
            document.oncontextmenu = event => {
                event.preventDefault();
                Shapes.SpeachCommandEngine.trigger();
            };
        }
    })(MouseDriver = Shapes.MouseDriver || (Shapes.MouseDriver = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
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
                return text.length * 7.5 + 10;
            }
            function createSelectionTool(state) {
                const shape = state.shapes.find(shape => shape.id === state.selectedId);
                const guideLines = createGuideLines(shape, state);
                const tooltip = createToolTipShape(shape, state);
                const rectangle = createSelectionRectangle(shape);
                const resizeHandle = createResizeHandle(shape, state);
                const deleteButton = createDeleteButton(shape, state);
                const colorButtons = createColorButtons(shape, state);
                const shapeButtons = changeShapeModelButtons(shape, state);
                return [
                    ...guideLines,
                    ...tooltip,
                    rectangle,
                    resizeHandle,
                    deleteButton,
                    colorButtons,
                    ...shapeButtons,
                ];
            }
            function createSelectionRectangle(shape) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const width = shape.width + margin * 2;
                const height = shape.height + margin * 2;
                const onMouseLeave = () => Shapes.Storage.setState(state => (Object.assign({}, state, { showLineGuides: false })));
                const rectangle = React.createElement("rect", { fill: "transparent", stroke: "black", strokeWidth: "2", key: Shapes.generateKey(), onMouseLeave: event => onMouseLeave(), x: x, y: y, width: width, height: height });
                return rectangle;
            }
            function createToolTipShape(shape, state) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const descriptionText = getDescriptionText(shape, state);
                const descriptionBackground = React.createElement("rect", { fill: "yellow", key: Shapes.generateKey(), x: x, y: y - textBackgroundHeight - 10, width: computeHaskligBold12TextLength(descriptionText), height: textBackgroundHeight, stroke: "black", strokeWidth: 2 });
                const description = React.createElement("text", { x: x + strokeWidth + 6, y: y - textBackgroundHeight + 6, key: Shapes.generateKey(), fill: "black", fontFamily: "HaskligBold", fontSize: "12" }, descriptionText);
                return [
                    descriptionBackground,
                    description,
                ];
            }
            function getDescriptionText(shape, state) {
                if (state.showLineGuides && state.mouseMode === Shapes.Storage.MouseMode.Resize)
                    return 'SIZE ' + shape.width + ':' + shape.height;
                if (state.showLineGuides && state.mouseMode === Shapes.Storage.MouseMode.Move)
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
                    return React.createElement("line", { strokeWidth: lineStrokeWidth, stroke: lineColor, key: Shapes.generateKey(), x1: x1, y1: y1, x2: x2, y2: y2 });
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
                const setMouseMoveMode = (mode) => Shapes.Storage.setState(state => (Object.assign({}, state, { mouseMode: mode })));
                const setToResize = () => setMouseMoveMode(Shapes.Storage.MouseMode.Resize);
                const setToMove = () => setMouseMoveMode(Shapes.Storage.MouseMode.Move);
                const radius = state.mouseMode === Shapes.Storage.MouseMode.Resize ? 5 : 7;
                return React.createElement("circle", { fill: "black", cx: x, cy: y, onMouseEnter: event => setToResize(), onMouseLeave: event => setToMove(), key: Shapes.generateKey(), r: radius });
            }
            function createDeleteButton(shape, state) {
                if (state.showLineGuides)
                    return React.createElement("g", { key: Shapes.generateKey() });
                const buttonText = 'DEL';
                const textLength = computeHaskligBold12TextLength(buttonText);
                const x = shape.x - margin - textLength - 10;
                const y = shape.y - margin;
                function onDeleteButtonClicked() {
                    const newShapes = state.shapes.filter(element => element.id !== state.selectedId);
                    Shapes.Storage.setState(state => (Object.assign({}, state, { shapes: newShapes, selectedId: null, mouseMode: Shapes.Storage.MouseMode.Move, showLineGuides: false })));
                }
                const backgroundRect = React.createElement("rect", { fill: "#eee", x: x, y: y - textBackgroundHeight - 10, width: textLength, height: textBackgroundHeight, strokeWidth: 2, stroke: "black" });
                const deleteText = React.createElement("text", { fill: "Black", x: x + 6, y: y - textBackgroundHeight + 6, fontFamily: "HaskligBold", fontSize: "12" }, buttonText);
                const buttonableLayer = React.createElement("rect", { x: x, y: y - textBackgroundHeight - 10, width: textLength, height: textBackgroundHeight, onClick: event => onDeleteButtonClicked(), fill: "transparent" });
                return React.createElement("g", { key: Shapes.generateKey() },
                    backgroundRect,
                    deleteText,
                    buttonableLayer);
            }
            function createColorButtons(shape, state) {
                if (state.showLineGuides)
                    return React.createElement("g", { key: Shapes.generateKey() });
                const colors = ['red', 'black', 'blue']
                    .filter(x => shape.color !== x);
                const buttons = colors.map((color, index) => createSingleColorButton(color, index + 1, shape));
                return React.createElement("g", { key: Shapes.generateKey() }, buttons);
            }
            function createSingleColorButton(color, index, shape) {
                const x = shape.x - margin - 5 - index * (textBackgroundHeight + 5);
                function onSetColor() {
                    Shapes.Storage.setState(state => {
                        const newShapes = state.shapes.map(x => (Object.assign({}, x, { color: x.id === shape.id ? color : x.color })));
                        return Object.assign({}, state, { shapes: newShapes });
                    });
                }
                const button = React.createElement("rect", { x: x, y: shape.y - margin, width: textBackgroundHeight, height: textBackgroundHeight, fill: color, key: Shapes.generateKey(), onClick: event => onSetColor(), strokeWidth: "2", stroke: "black" });
                return button;
            }
            function changeShapeModelButtons(shape, state) {
                if (state.showLineGuides)
                    return [React.createElement("g", { key: Shapes.generateKey() })];
                function onChangeShapeType() {
                    Shapes.Storage.setState(state => {
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
                const y = shape.y + 1 * (textBackgroundHeight);
                const mainBackground = React.createElement("rect", { x: x, y: y, width: textBackgroundHeight, height: textBackgroundHeight, stroke: "black", key: Shapes.generateKey(), strokeWidth: "2", fill: "#eee" });
                const shapeSize = textBackgroundHeight - 10;
                const halfShape = shapeSize / 2;
                const shapeIcon = (shape.type === 'circle'
                    ? React.createElement("rect", { x: x + 5, y: y + 5, width: shapeSize, height: shapeSize, fill: "black" })
                    : React.createElement("circle", { cx: x + 5 + halfShape, cy: y + 5 + halfShape, r: shapeSize / 2, fill: "black" }));
                const transparentButtonableRect = React.createElement("rect", { x: x, y: y, height: textBackgroundHeight, width: textBackgroundHeight, onClick: event => onChangeShapeType(), fill: "transparent" });
                return [
                    mainBackground,
                    shapeIcon,
                    transparentButtonableRect,
                ];
            }
        })(SelectionTool = Render.SelectionTool || (Render.SelectionTool = {}));
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
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
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
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
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Render;
    (function (Render) {
        var HTMLLayers;
        (function (HTMLLayers) {
            var RightClick;
            (function (RightClick) {
                const iconSize = 30;
                const backgroundSize = iconSize + 14;
                function render(model) {
                    return ((model.speachRecognition.isRecording)
                        ? shapeOnWorkingMode(model)
                        : []);
                }
                RightClick.render = render;
                function shapeOnWorkingMode(model) {
                    return React.createElement("div", { key: Shapes.generateKey(), style: {
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
                    const { mouseX, mouseY } = model.speachRecognition;
                    return React.createElement("div", { style: {
                            backgroundColor: "black",
                            position: "fixed",
                            left: mouseX - (backgroundSize / 2),
                            top: mouseY - (backgroundSize / 2),
                            padding: (backgroundSize - iconSize) / 2,
                            width: iconSize,
                            height: iconSize,
                        } },
                        React.createElement("div", { className: "recoderIcon", style: {
                                width: iconSize,
                                height: iconSize,
                                borderRadius: iconSize / 2,
                                backgroundColor: "red",
                            } }));
                }
                function createTextView(model) {
                    const { mouseX, mouseY, currentText } = model.speachRecognition;
                    if (currentText === "")
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
                        } },
                        React.createElement("div", { style: {
                                padding: "5px 10px 7px 10px",
                            } }, currentText),
                        React.createElement("div", { style: {
                                borderTopColor: "black",
                                borderTopWidth: 2,
                                borderTopStyle: "dashed",
                                padding: "5px 10px 7px 10px"
                            } }, Shapes.DesignTalk.isParsable(currentText)
                            ? "Looks Good"
                            : "Can't Understand"));
                }
            })(RightClick = HTMLLayers.RightClick || (HTMLLayers.RightClick = {}));
        })(HTMLLayers = Render.HTMLLayers || (Render.HTMLLayers = {}));
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Render;
    (function (Render) {
        function renderApp(model) {
            const container = document.getElementById('container');
            const scene = createScence(model);
            ReactDOM.render(scene, container);
        }
        Render.renderApp = renderApp;
        function createScence(model) {
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
            return React.createElement("svg", { style: { width: "100vw", height: "100vh" }, key: Shapes.generateKey() }, layers);
        }
        function renderLayer(layer, elements) {
            return React.createElement("g", { key: Shapes.generateKey() }, elements);
        }
        function renderOnResize() {
            Shapes.Storage.setState(state => {
                const { innerHeight, innerWidth } = window;
                const newShapes = state.shapes.map(shape => (Object.assign({}, shape, { x: ((shape.x + shape.width < innerWidth)
                        ? shape.x
                        : innerWidth - shape.width - 10), y: ((shape.y + shape.height < innerHeight)
                        ? shape.y
                        : innerHeight - shape.height - 10) })));
                return Object.assign({}, state, { shapes: newShapes });
            });
        }
        Render.renderOnResize = renderOnResize;
    })(Render = Shapes.Render || (Shapes.Render = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var Storage;
    (function (Storage) {
        const StorageContainer = new Array();
        const StorageSubcriptions = [
            Shapes.Render.renderApp,
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
            for (const subscriber of StorageSubcriptions)
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
    })(Storage = Shapes.Storage || (Shapes.Storage = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var ScreenDriver;
    (function (ScreenDriver) {
        ScreenDriver.PointSize = 0;
        function init() {
            const div = document.getElementById('dpi');
            div.style.width = '1pt';
            var result = window
                .getComputedStyle(div, null)
                .getPropertyValue('width');
            const pointSize = parseFloat(result);
            ScreenDriver.PointSize = pointSize;
        }
        ScreenDriver.init = init;
    })(ScreenDriver = Shapes.ScreenDriver || (Shapes.ScreenDriver = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var StateManipulotrs;
    (function (StateManipulotrs) {
        StateManipulotrs.ShapeDeleteManipulator = (state) => (Object.assign({}, state, { shapes: state.shapes.filter(x => !x.remove) }));
    })(StateManipulotrs = Shapes.StateManipulotrs || (Shapes.StateManipulotrs = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var StateManipulotrs;
    (function (StateManipulotrs) {
        function init() {
            Shapes.Storage.addManipulationFunction(StateManipulotrs.ShapeDeleteManipulator);
        }
        StateManipulotrs.init = init;
    })(StateManipulotrs = Shapes.StateManipulotrs || (Shapes.StateManipulotrs = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    window.onload = () => {
        Shapes.Storage.initStorage();
        Shapes.StateManipulotrs.init();
        Shapes.MouseDriver.init();
        Shapes.ScreenDriver.init();
        window.onresize = () => Shapes.Render.renderOnResize();
    };
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
        function isParsable(code) {
            try {
                DesignTalk.Core.parse(code);
                return true;
            }
            catch (_a) {
                return false;
            }
        }
        DesignTalk.isParsable = isParsable;
        function runWithGivenState(code, state) {
            return DesignTalk.Core.run(code, state);
        }
        DesignTalk.runWithGivenState = runWithGivenState;
        function runAndApply(code) {
            Shapes.Storage.setState(state => DesignTalk.Core.run(code, state));
        }
        DesignTalk.runAndApply = runAndApply;
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
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
                        generateChackerForColor(query),
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
                function generateChackerForColor(query) {
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
                    const comparisionFunction = composeComparisionFunction(sizeQuery.operator);
                    const { size, unit } = sizeQuery.size;
                    const comparable = Core.convertSizeToPixel(size, unit);
                    const checker = (shape) => {
                        const baseSize = ((sizeQuery.dimension === "width")
                            ? shape.width
                            : shape.height);
                        return comparisionFunction(baseSize, comparable);
                    };
                    return checker;
                }
                function generateCheckerForSize2DQuery(sizeQuery) {
                    const comparisionFunction = composeComparisionFunction(sizeQuery.operator);
                    const { width, height, unit } = sizeQuery.size;
                    const widthSize = Core.convertSizeToPixel(width, unit);
                    const heightSize = Core.convertSizeToPixel(height, unit);
                    const checker = (shape) => comparisionFunction(shape.width, widthSize) &&
                        comparisionFunction(shape.height, heightSize);
                    return checker;
                }
                function composeComparisionFunction(operator) {
                    let comparisionFunction = (a, b) => true;
                    switch (operator.operator) {
                        case '=':
                            comparisionFunction =
                                (a, b) => a === b;
                            break;
                        case '>':
                            comparisionFunction =
                                (a, b) => a > b;
                            break;
                        case '<':
                            comparisionFunction =
                                (a, b) => a < b;
                            break;
                        case '<=':
                            comparisionFunction =
                                (a, b) => a <= b;
                            break;
                        case '>=':
                            comparisionFunction =
                                (a, b) => a >= b;
                            break;
                    }
                    const functionWithNegationApplied = (operator.negation
                        ? (a, b) => !comparisionFunction(a, b)
                        : comparisionFunction);
                    return functionWithNegationApplied;
                }
                function generateRangeFilterFunction(query, checker) {
                    switch (query.range.mode) {
                        case "biggest":
                            return createSmalletsBiggestRangeSelector(query, checker, (a, b) => a - b);
                        case "smallest":
                            return createSmalletsBiggestRangeSelector(query, checker, (a, b) => a + b);
                        case "all":
                        default:
                            return (shapes) => shapes.filter(checker);
                    }
                }
                function createSmalletsBiggestRangeSelector(query, checker, operator) {
                    return (shapes) => {
                        const filteredShapes = shapes.filter(checker);
                        const rangeFilteredShapes = filteredShapes
                            .sort((a, b) => operator((b.width * b.height), (a.width * b.height)))
                            .splice(0, query.range.range);
                        return rangeFilteredShapes;
                    };
                }
            })(QueryCompiler = Core.QueryCompiler || (Core.QueryCompiler = {}));
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
        var Core;
        (function (Core) {
            var CommandCompiler;
            (function (CommandCompiler) {
                function generate(instruction) {
                    switch (instruction.command) {
                        case "remove":
                            return CommandCompiler.generateRemoveIntruction(instruction);
                        default:
                            return (shapes) => shapes;
                    }
                }
                CommandCompiler.generate = generate;
            })(CommandCompiler = Core.CommandCompiler || (Core.CommandCompiler = {}));
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
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
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
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
                return points * Shapes.ScreenDriver.PointSize;
            }
            Core.pointToPixel = pointToPixel;
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
var Shapes;
(function (Shapes) {
    var DesignTalk;
    (function (DesignTalk) {
        var Core;
        (function (Core) {
            var CommandCompiler;
            (function (CommandCompiler) {
                function generateRemoveIntruction(instruction) {
                    return (shapes) => shapes.map(shape => (Object.assign({}, shape, { remove: true })));
                }
                CommandCompiler.generateRemoveIntruction = generateRemoveIntruction;
            })(CommandCompiler = Core.CommandCompiler || (Core.CommandCompiler = {}));
        })(Core = DesignTalk.Core || (DesignTalk.Core = {}));
    })(DesignTalk = Shapes.DesignTalk || (Shapes.DesignTalk = {}));
})(Shapes || (Shapes = {}));
//# sourceMappingURL=core.js.map