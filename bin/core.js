"use strict";
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    let keyValue = 1;
    function generateKey() {
        return (keyValue++).toString();
    }
    BasiceShapeEditor.generateKey = generateKey;
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Storage;
    (function (Storage) {
        function createInitialModelState() {
            const someShapes = [
                createShape(100, 200),
                createShape(200, 500),
                createShape(400, 200),
            ];
            return {
                shapes: someShapes,
                selectedId: null
            };
        }
        Storage.createInitialModelState = createInitialModelState;
        function chooseRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        function createShape(x, y) {
            const color = chooseRandom(['red', 'black', 'blue']);
            const type = chooseRandom(['rect', 'circle']);
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
        var Helpers;
        (function (Helpers) {
            function renderShape(shape) {
                switch (shape.type) {
                    case 'rect':
                        return createRect(shape);
                    case 'circle':
                        return createCircle(shape);
                }
            }
            Helpers.renderShape = renderShape;
            function createCircle(shape) {
                return React.createElement("circle", { cx: shape.x, cy: shape.y, fill: shape.color, r: shape.height / 2, key: BasiceShapeEditor.generateKey() });
            }
            function createRect(shape) {
                return React.createElement("rect", { x: shape.x, y: shape.y, width: shape.width, height: shape.height, key: BasiceShapeEditor.generateKey() });
            }
        })(Helpers = Render.Helpers || (Render.Helpers = {}));
    })(Render = BasiceShapeEditor.Render || (BasiceShapeEditor.Render = {}));
})(BasiceShapeEditor || (BasiceShapeEditor = {}));
var BasiceShapeEditor;
(function (BasiceShapeEditor) {
    var Render;
    (function (Render) {
        var Editor;
        (function (Editor) {
            class ShapeContainer extends React.Component {
                constructor(props) {
                    super(props);
                }
                render() {
                    return Render.Helpers.renderShape(this.props.shape);
                }
            }
            Editor.ShapeContainer = ShapeContainer;
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
                    return model.shapes.map(shape => React.createElement(Render.Editor.ShapeContainer, { shape: shape }));
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
    window.onload = () => main();
    function main() {
        const state = BasiceShapeEditor.Storage.createInitialModelState();
        BasiceShapeEditor.Render.renderApp(state);
    }
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
