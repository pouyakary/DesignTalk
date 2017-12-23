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
            for (let i = 0; i < 10; i++)
                someShapes.push(createShape(i));
            return {
                shapes: someShapes,
                hoveredId: null,
                selectedId: null,
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
                height: 100,
                id: BasiceShapeEditor.generateKey(),
                type: type,
                width: 100,
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
                    BasiceShapeEditor.Storage.setState(state => (Object.assign({}, state, { hoveredId: this.props.shape.id })));
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
                        return Object.assign({}, state, { selectedId: this.props.shape.id, shapes: newShapes });
                    });
                }
                createCircle(shape, color) {
                    const radius = shape.width / 2;
                    return React.createElement("circle", { cx: shape.x + radius, cy: shape.y + radius, fill: color, r: radius, key: BasiceShapeEditor.generateKey(), onMouseEnter: event => this.onMouseEnter(), onMouseLeave: event => this.onMouseLeave(), onClick: event => this.onClick() });
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
    }
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var SelectionTool;
        (function (SelectionTool) {
            function render(model) {
                if (model.selectedId)
                    return createSelectionTool(model);
                else
                    return [undefined];
            }
            SelectionTool.render = render;
            function createSelectionTool(model) {
                const shape = model.shapes.find(shape => shape.id === model.selectedId);
                const storkeWidth = 2;
                const margin = 10;
                const x = shape.x - margin;
                const y = shape.y - margin;
                const size = shape.width + margin * 2;
                const descriptionText = 'X: ' + x + ' / Y: ' + y + ' / Size: ' + size;
                const rectangle = React.createElement("rect", { fill: "transparent", stroke: "black", strokeWidth: "2", x: x, y: y, width: size, height: size });
                const descriptionBackgroundHeight = 25;
                const descriptionBackground = React.createElement("rect", { fill: "yellow", x: x, y: y - descriptionBackgroundHeight - 10, width: descriptionText.length * 7.5 + 10, height: descriptionBackgroundHeight, stroke: "black", strokeWidth: 2 });
                const description = React.createElement("text", { x: x + storkeWidth + 6, y: y - descriptionBackgroundHeight + 6, fill: "black", "font-family": "HaskligBold", "font-size": "12" }, descriptionText);
                return [
                    rectangle,
                    descriptionBackground,
                    description,
                ];
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
//# sourceMappingURL=core.js.map