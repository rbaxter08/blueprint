System.register(["./lib/BlueprintBackend", "./lib/BlueprintRenderer", "react", "invariant", "./lib/NativeMethods", "./lib/EventBridge"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var BlueprintBackend_1, BlueprintRenderer_1, react_1, invariant_1, Canvas, __renderStarted, __preferredRenderer;
    var __moduleName = context_1 && context_1.id;
    // We'll need to wrap the default native components in stuff like this so that
    // you can use <View> in your JSX. Otherwise we need the dynamic friendliness
    // of the createElement call (note that the type is a string...);
    function View(props) {
        return react_1.default.createElement('View', props, props.children);
    }
    exports_1("View", View);
    function Text(props) {
        return react_1.default.createElement('Text', props, props.children);
    }
    exports_1("Text", Text);
    function Image(props) {
        return react_1.default.createElement('Image', props, props.children);
    }
    exports_1("Image", Image);
    function bindCanvasContextProperties(ctx) {
        Object.defineProperty(ctx, 'fillStyle', {
            enumerable: false,
            configurable: false,
            get: function () {
                return 'Not Supported';
            },
            set: function (value) {
                this.__setFillStyle(value);
            }
        });
        Object.defineProperty(ctx, 'strokeStyle', {
            enumerable: false,
            configurable: false,
            get: function () {
                return 'Not Supported';
            },
            set: function (value) {
                this.__setStrokeStyle(value);
            }
        });
        Object.defineProperty(ctx, 'lineWidth', {
            enumerable: false,
            configurable: false,
            get: function () {
                return 'Not Supported';
            },
            set: function (value) {
                this.__setLineWidth(value);
            }
        });
        Object.defineProperty(ctx, 'font', {
            enumerable: false,
            configurable: false,
            get: function () {
                return 'Not Supported';
            },
            set: function (value) {
                this.__setFont(value);
            }
        });
        Object.defineProperty(ctx, 'textAlign', {
            enumerable: false,
            configurable: false,
            get: function () {
                return 'Not Supported';
            },
            set: function (value) {
                this.__setTextAlign(value);
            }
        });
    }
    exports_1("bindCanvasContextProperties", bindCanvasContextProperties);
    function ScrollViewContentView(props) {
        return react_1.default.createElement('ScrollViewContentView', props, props.children);
    }
    function ScrollView(props) {
        var child = react_1.default.Children.only(props.children);
        invariant_1.default(child.type === ScrollViewContentView, 'ScrollView must have only one child, and that child must be a ScrollView.ContentView.');
        return react_1.default.createElement('ScrollView', props, child);
    }
    exports_1("ScrollView", ScrollView);
    return {
        setters: [
            function (BlueprintBackend_1_1) {
                BlueprintBackend_1 = BlueprintBackend_1_1;
            },
            function (BlueprintRenderer_1_1) {
                BlueprintRenderer_1 = BlueprintRenderer_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (invariant_1_1) {
                invariant_1 = invariant_1_1;
            },
            function (NativeMethods_1_1) {
                exports_1({
                    "NativeMethods": NativeMethods_1_1["default"]
                });
            },
            function (EventBridge_1_1) {
                exports_1({
                    "EventBridge": EventBridge_1_1["default"]
                });
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function (_super) {
                __extends(Canvas, _super);
                function Canvas(props) {
                    var _this = _super.call(this, props) || this;
                    _this._onMeasure = _this._onMeasure.bind(_this);
                    _this._onDraw = _this._onDraw.bind(_this);
                    _this.state = {
                        width: 0,
                        height: 0
                    };
                    return _this;
                }
                Canvas.prototype._onMeasure = function (width, height) {
                    this.setState({
                        width: width,
                        height: height
                    });
                    if (typeof this.props.onMeasure === 'function') {
                        this.props.onMeasure(width, height);
                    }
                };
                Canvas.prototype._onDraw = function (ctx) {
                    if (typeof this.props.onDraw === 'function') {
                        bindCanvasContextProperties(ctx);
                        if (this.props.autoclear) {
                            ctx.clearRect(0, 0, this.state.width, this.state.height);
                        }
                        this.props.onDraw(ctx);
                    }
                };
                Canvas.prototype.render = function () {
                    var _this = this;
                    //TODO: Check whether need to use below arrow function for "this" binding
                    //      is a bug in duktape. Possible this only occurs on linux. Does not 
                    //      appear to occur on mac.
                    return react_1.default.createElement('CanvasView', Object.assign({}, this.props, {
                        onDraw: function (ctx) { _this._onDraw(ctx); },
                        onMeasure: function (width, height) { _this._onMeasure(width, height); }
                    }), this.props.children);
                };
                return Canvas;
            }(react_1.Component));
            exports_1("Canvas", Canvas);
            ScrollView.ContentView = ScrollViewContentView;
            View.ClickEventFlags = {
                disableClickEvents: 0,
                allowClickEvents: 1,
                allowClickEventsExcludingChildren: 2,
                allowClickEventsOnlyOnChildren: 3,
            };
            Image.PlacementFlags = {
                xLeft: 1,
                xRight: 2,
                xMid: 4,
                yTop: 8,
                yBottom: 16,
                yMid: 32,
                stretchToFit: 64,
                fillDestination: 128,
                onlyReduceInSize: 256,
                onlyIncreaseInSize: 512,
                doNotResize: 256 | 512,
                centred: 4 + 32,
            };
            Text.WordWrap = {
                none: 0,
                byWord: 1,
                byChar: 2,
            };
            Text.FontStyleFlags = {
                plain: 0,
                bold: 1,
                italic: 2,
                underlined: 4,
            };
            Text.JustificationFlags = {
                left: 1,
                right: 2,
                horizontallyCentred: 4,
                top: 8,
                bottom: 16,
                verticallyCentred: 32,
                horizontallyJustified: 64,
                centred: 36,
                centredLeft: 33,
                centredRight: 34,
                centredTop: 12,
                centredBottom: 20,
                topLeft: 9,
                topRight: 10,
                bottomLeft: 17,
                bottomRight: 18,
            };
            __renderStarted = false;
            __preferredRenderer = BlueprintRenderer_1.default;
            exports_1("default", {
                getRootContainer: function () {
                    return BlueprintBackend_1.default.getRootContainer();
                },
                render: function (element, container, callback) {
                    console.log('Render started...');
                    // Create a root Container if it doesnt exist
                    if (!container._rootContainer) {
                        container._rootContainer = __preferredRenderer.createContainer(container, false);
                    }
                    // Update the root Container
                    return __preferredRenderer.updateContainer(element, container._rootContainer, null, callback);
                },
                enableMethodTrace: function () {
                    if (__renderStarted) {
                        throw new Error('Cannot enable method trace after initial render.');
                    }
                    __preferredRenderer = BlueprintRenderer_1.BlueprintTracedRenderer;
                },
            });
        }
    };
});
