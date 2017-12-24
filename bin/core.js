"use strict";
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Storage;
    (function (Storage) {
        let MouseMode;
        (function (MouseMode) {
            MouseMode[MouseMode["Move"] = 0] = "Move";
            MouseMode[MouseMode["Resize"] = 1] = "Resize";
        })(MouseMode = Storage.MouseMode || (Storage.MouseMode = {}));
    })(Storage = BasiceShapeEditor.Storage || (BasiceShapeEditor.Storage = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Storage;
    (function (Storage) {
        let EActionType;
        (function (EActionType) {
            EActionType[EActionType["Select"] = 0] = "Select";
        })(EActionType = Storage.EActionType || (Storage.EActionType = {}));
    })(Storage = BasiceShapeEditor.Storage || (BasiceShapeEditor.Storage = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    let __KeyValueStorage = 1;
    function generateKey() {
        return (__KeyValueStorage++).toString();
    }
    BasiceShapeEditor.generateKey = generateKey;
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Storage;
    (function (Storage) {
        function createInitialModelState() {
            const someShapes = new Array();
            for (let counter = 0; counter < 10; counter++)
                someShapes.push(createShape(counter));
            return {
                shapes: someShapes,
                showLineGuides: false,
                hoveredId: null,
                selectedId: null,
                mouseMode: Storage.MouseMode.Move
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
        function createShape(no) {
            const color = chooseRandom(['red', 'black', 'blue']);
            const type = chooseRandom(['rect', 'circle']);
            const { x, y } = getRandomCoordinates();
            return {
                color: color,
                id: BasiceShapeEditor.generateKey(),
                type: type,
                width: 100,
                height: 100,
                x: x,
                y: y,
                zIndex: no,
            };
        }
    })(Storage = BasiceShapeEditor.Storage || (BasiceShapeEditor.Storage = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var Editor;
        (function (Editor) {
            class Shape extends React.Component {
                constructor() {
                    super(...arguments);
                    this.lastState = BasiceShapeEditor.Storage.getState();
                }
                render() {
                    return this.renderShape(this.props.shape);
                }
                isShapedSelected() {
                    return this.props.shape.id === this.lastState.selectedId;
                }
                isShapeHovered() {
                    return this.props.shape.id === this.lastState.hoveredId;
                }
                renderShape(shape) {
                    const color = (!this.isShapedSelected() && this.isShapeHovered()
                        ? 'green'
                        : this.props.shape.color);
                    switch (shape.type) {
                        case 'rect':
                            return this.createRect(shape, color);
                        case 'circle':
                            return this.createCircle(shape, color);
                    }
                }
                onMouseEnter() {
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { hoveredId: this.props.shape.id, showLineGuides: false })));
                }
                onMouseLeave() {
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { hoveredId: null })));
                }
                onClick() {
                    BasiceShapeEditor.Storage.setState(state => {
                        const maxZindexOfShapes = Math.max(...this.lastState.shapes.map(x => x.zIndex));
                        const newShapes = state.shapes.map(shape => {
                            if (shape.id === this.props.shape.id)
                                shape.zIndex = maxZindexOfShapes + 1;
                            return shape;
                        });
                        return Object.assign({}, state, { selectedId: this.props.shape.id, hoveredId: null, shapes: newShapes });
                    });
                }
                createCircle(shape, color) {
                    const rX = shape.width / 2;
                    const rY = shape.height / 2;
                    return React.createElement("ellipse", { cx: shape.x + rX, cy: shape.y + rY, fill: color, rx: rX, ry: rY, key: BasiceShapeEditor.generateKey(), onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
                createRect(shape, color) {
                    return React.createElement("rect", { x: shape.x, y: shape.y, width: shape.width, height: shape.height, key: BasiceShapeEditor.generateKey(), fill: color, onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
                }
            }
            Editor.Shape = Shape;
        })(Editor = Render.Editor || (Render.Editor = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var Layers;
        (function (Layers) {
            var Background;
            (function (Background) {
                function render() {
                    return [
                        React.createElement("rect", { fill: "white", onClick: onClick, key: BasiceShapeEditor.generateKey(), style: { width: "100vw", height: "100vh" } })
                    ];
                }
                Background.render = render;
                function onClick() {
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { selectedId: null })));
                }
            })(Background = Layers.Background || (Layers.Background = {}));
        })(Layers = Render.Layers || (Render.Layers = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var Layers;
        (function (Layers) {
            var Shapes;
            (function (Shapes) {
                function render(model) {
                    const sortedShapes = model.shapes.sort((a, b) => a.zIndex - b.zIndex);
                    const elementedShapes = sortedShapes.map(shape => React.createElement(Render.Editor.Shape, { shape: shape, key: BasiceShapeEditor.generateKey() }));
                    return elementedShapes;
                }
                Shapes.render = render;
            })(Shapes = Layers.Shapes || (Layers.Shapes = {}));
        })(Layers = Render.Layers || (Render.Layers = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var MouseDriver;
    (function (MouseDriver) {
        MouseDriver.X = 0;
        MouseDriver.Y = 0;
        MouseDriver.Clicked = false;
        let shouldMove = false;
        function init() {
            mouseClcikeEvents();
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
            const state = BasiceShapeEditor.Storage.getState();
            if (MouseDriver.Clicked) {
                if (state.selectedId !== null) {
                    if (state.mouseMode == BasiceShapeEditor.Storage.MouseMode.Move) {
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
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { mouseMode: BasiceShapeEditor.Storage.MouseMode.Move })));
            }, 30);
            const selectedShape = state.shapes.find(x => x.id == state.selectedId);
            BasiceShapeEditor.Storage.setState(state => {
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
            BasiceShapeEditor.Storage.setState(state => {
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
        function mouseClcikeEvents() {
            document.body.onmousedown = () => MouseDriver.Clicked = true;
            document.body.onmouseup = () => MouseDriver.Clicked = false;
        }
    })(MouseDriver = BasiceShapeEditor.MouseDriver || (BasiceShapeEditor.MouseDriver = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var SelectionTool;
        (function (SelectionTool) {
            const margin = 10;
            const strokeWidth = 2;
            function render(model) {
                if (model.selectedId)
                    return createSelectionTool(model);
                else
                    return [undefined];
            }
            SelectionTool.render = render;
            function createSelectionTool(state) {
                const shape = state.shapes.find(shape => shape.id === state.selectedId);
                const guideLines = createGuideLines(shape, state);
                const tooltip = createToolTipShape(shape);
                const rectangle = createSelectionRectangle(shape);
                const resizeHandle = createResizeHandle(shape, state);
                return [
                    ...guideLines,
                    ...tooltip,
                    rectangle,
                    resizeHandle
                ];
            }
            function createSelectionRectangle(shape) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const width = shape.width + margin * 2;
                const height = shape.height + margin * 2;
                const onMouseLeave = () => BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { showLineGuides: false })));
                const rectangle = React.createElement("rect", { fill: "transparent", stroke: "black", strokeWidth: "2", key: BasiceShapeEditor.generateKey(), onMouseLeave: event => onMouseLeave(), x: x, y: y, width: width, height: height });
                return rectangle;
            }
            function createToolTipShape(shape) {
                const x = shape.x - margin;
                const y = shape.y - margin;
                const descriptionText = 'X ' + x + ' • Y ' + y + ' • SIZE ' + shape.width + ':' + shape.height;
                const descriptionBackgroundHeight = 25;
                const descriptionBackground = React.createElement("rect", { fill: "yellow", key: BasiceShapeEditor.generateKey(), x: x, y: y - descriptionBackgroundHeight - 10, width: descriptionText.length * 7.5 + 10, height: descriptionBackgroundHeight, stroke: "black", strokeWidth: 2 });
                const description = React.createElement("text", { x: x + strokeWidth + 6, y: y - descriptionBackgroundHeight + 6, key: BasiceShapeEditor.generateKey(), fill: "black", fontFamily: "HaskligBold", fontSize: "12" }, descriptionText);
                return [
                    descriptionBackground,
                    description,
                ];
            }
            function createGuideLines(shape, model) {
                if (!model.showLineGuides)
                    return [];
                const collectionOfHoroizontalPoints = new Set();
                const collectionOfVerticalPoints = new Set();
                model.shapes.map(obj => {
                    if (shape.id === obj.id)
                        return;
                    collectionOfVerticalPoints.add(obj.x);
                    collectionOfHoroizontalPoints.add(obj.y);
                    collectionOfVerticalPoints.add(obj.x + obj.width);
                    collectionOfHoroizontalPoints.add(obj.y + obj.width);
                });
                let LineDirection;
                (function (LineDirection) {
                    LineDirection[LineDirection["Horoizantal"] = 0] = "Horoizantal";
                    LineDirection[LineDirection["Vertical"] = 1] = "Vertical";
                })(LineDirection || (LineDirection = {}));
                const createLine = (x1, y1, x2, y2, direction) => {
                    const collection = (direction === LineDirection.Horoizantal
                        ? collectionOfHoroizontalPoints
                        : collectionOfVerticalPoints);
                    const isTherePoint = (collection.has(x1) || collection.has(y1) ||
                        collection.has(x2) || collection.has(y2));
                    const lineColor = (isTherePoint ? 'cyan' : '#ccc');
                    const lineStrokeWidth = (isTherePoint ? 2 : 1);
                    return React.createElement("line", { strokeWidth: lineStrokeWidth, stroke: lineColor, key: BasiceShapeEditor.generateKey(), x1: x1, y1: y1, x2: x2, y2: y2 });
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
                const setMouseMoveMode = (mode) => BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { mouseMode: mode })));
                const setToResize = () => setMouseMoveMode(BasiceShapeEditor.Storage.MouseMode.Resize);
                const setToMove = () => setMouseMoveMode(BasiceShapeEditor.Storage.MouseMode.Move);
                const radius = state.mouseMode === BasiceShapeEditor.Storage.MouseMode.Resize ? 5 : 7;
                return React.createElement("circle", { fill: "black", cx: x, cy: y, onMouseEnter: event => setToResize(), onMouseLeave: event => setToMove(), key: BasiceShapeEditor.generateKey(), r: radius });
            }
        })(SelectionTool = Render.SelectionTool || (Render.SelectionTool = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var Layers;
        (function (Layers) {
            var Selection;
            (function (Selection) {
                function render(model) {
                    return Render.SelectionTool.render(model);
                }
                Selection.render = render;
            })(Selection = Layers.Selection || (Layers.Selection = {}));
        })(Layers = Render.Layers || (Render.Layers = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
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
                Render.Layers.Background.render(),
                Render.Layers.Shapes.render(model),
                Render.Layers.Selection.render(model),
            ];
            const layers = layerElements.map((elements, index) => renderLayer(index, elements));
            return createMainSVG(layers);
        }
        function createMainSVG(layers) {
            return React.createElement("svg", { style: { width: "100vw", height: "100vh" } }, layers);
        }
        function renderLayer(layer, elements) {
            return React.createElement("g", { key: BasiceShapeEditor.generateKey() }, elements);
        }
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Storage;
    (function (Storage) {
        const StorageContainer = new Array();
        const StorageSubcriptions = [
            BasiceShapeEditor.Render.renderApp,
        ];
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
            const newState = setter(lastState);
            StorageContainer.push(newState);
            runSubscribersOnChange(newState);
        }
        Storage.setState = setState;
    })(Storage = BasiceShapeEditor.Storage || (BasiceShapeEditor.Storage = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    window.onload = () => main();
    function main() {
        BasiceShapeEditor.Storage.initStorage();
        BasiceShapeEditor.MouseDriver.init();
    }
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
//# sourceMappingURL=core.js.map