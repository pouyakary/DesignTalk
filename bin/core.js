"use strict";
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
            for (let i = 0; i < 20; i++)
                someShapes.push(createShape());
            return {
                shapes: someShapes,
                selectedId: null
            };
        }
        Storage.createInitialModelState = createInitialModelState;
        function chooseRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        function getRandomCoordinates() {
            const randomSize = (size) => Math.floor(Math.random() * (size - 200)) + 100;
            return {
                x: randomSize(window.innerWidth),
                y: randomSize(window.innerHeight),
            };
        }
        function createShape() {
            const color = chooseRandom(['red', 'black', 'blue']);
            const type = chooseRandom(['rect', 'circle']);
            const { x, y } = getRandomCoordinates();
            return {
                color: color,
                height: 100,
                id: BasiceShapeEditor.generateKey(),
                type: type,
                width: 100,
                x: x,
                y: y,
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
                render() {
                    return this.renderShape(this.props.shape);
                }
                isShapeSelected() {
                    return this.props.shape.id === BasiceShapeEditor.Storage.getState().selectedId;
                }
                renderShape(shape) {
                    const color = (this.isShapeSelected()
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
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { selectedId: this.props.shape.id })));
                }
                onMouseLeave() {
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { selectedId: null })));
                }
                createCircle(shape, color) {
                    const radius = shape.width / 2;
                    return React.createElement("circle", { cx: shape.x + radius, cy: shape.y + radius, fill: color, r: radius, key: BasiceShapeEditor.generateKey(), onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave() });
                }
                createRect(shape, color) {
                    return React.createElement("rect", { x: shape.x, y: shape.y, width: shape.width, height: shape.height, key: BasiceShapeEditor.generateKey(), fill: color, onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave() });
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
            var Shapes;
            (function (Shapes) {
                function render(model) {
                    return model.shapes.map(shape => React.createElement(Render.Editor.Shape, { shape: shape }));
                }
                Shapes.render = render;
            })(Shapes = Layers.Shapes || (Layers.Shapes = {}));
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
                Render.Layers.Shapes.render(model)
            ];
            const layers = layerElements.map((elements, index) => renderLayer(index, elements));
            return createMainSVG(layers);
        }
        function createMainSVG(layers) {
            return React.createElement("svg", { style: {
                    width: "100vw",
                    height: "100vh",
                } }, layers);
        }
        function renderLayer(layer, elements) {
            return React.createElement("g", { key: BasiceShapeEditor.generateKey(), style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: layer,
                } }, elements);
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
        const state = BasiceShapeEditor.Storage.createInitialModelState();
        BasiceShapeEditor.Render.renderApp(state);
    }
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
