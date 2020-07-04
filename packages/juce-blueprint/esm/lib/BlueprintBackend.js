/* global __BlueprintNative__:false */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var __rootViewInstance, __viewRegistry, ViewInstance, RawTextViewInstance;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {/* global __BlueprintNative__:false */
            __rootViewInstance = null;
            __viewRegistry = {};
            if (typeof window !== 'undefined') {
                // This is just a little shim so that I can build for web and run my renderer
                // in the browser, which can be helpful for debugging my renderer implementation.
                window.__BlueprintNative__ = {
                    appendChild: function (parent, child) {
                        // noop
                    },
                    getRootInstanceId: function () {
                        return 'rootinstanceid';
                    },
                    createViewInstance: function () {
                        return 'someviewinstanceid';
                    },
                    createTextViewInstance: function () {
                        return 'sometextviewinstanceid';
                    },
                    setViewProperty: function () {
                        // Noop
                    },
                };
            }
            ViewInstance = /** @class */ (function () {
                function ViewInstance(id, type, props) {
                    this._id = id;
                    this._type = type;
                    this._children = [];
                    this._props = props;
                }
                ViewInstance.prototype.getChildIndex = function (childInstance) {
                    for (var i = 0; i < this._children.length; ++i) {
                        if (this._children[i] === childInstance) {
                            return i;
                        }
                    }
                    return -1;
                };
                ViewInstance.prototype.appendChild = function (childInstance) {
                    this._children.push(childInstance);
                    return window.__BlueprintNative__.addChild(this._id, childInstance._id);
                };
                ViewInstance.prototype.insertChild = function (childInstance, index) {
                    this._children.splice(index, 0, childInstance);
                    return window.__BlueprintNative__.addChild(this._id, childInstance._id, index);
                };
                ViewInstance.prototype.removeChild = function (childInstance) {
                    var index = this._children.indexOf(childInstance);
                    if (index >= 0) {
                        this._children.splice(index, 1);
                        return window.__BlueprintNative__.removeChild(this._id, childInstance._id);
                    }
                };
                ViewInstance.prototype.setProperty = function (propKey, value) {
                    var _a;
                    this._props = Object.assign({}, this._props, (_a = {},
                        _a[propKey] = value,
                        _a));
                    return window.__BlueprintNative__.setViewProperty(this._id, propKey, value);
                };
                return ViewInstance;
            }());
            RawTextViewInstance = /** @class */ (function () {
                function RawTextViewInstance(id, text) {
                    this._id = id;
                    this._text = text;
                }
                RawTextViewInstance.prototype.setTextValue = function (text) {
                    this._text = text;
                    return window.__BlueprintNative__.setRawTextValue(this._id, text);
                };
                return RawTextViewInstance;
            }());
            window.__BlueprintNative__.dispatchViewEvent = function dispatchEvent(viewId, eventType) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                if (__viewRegistry.hasOwnProperty(viewId)) {
                    var instance = __viewRegistry[viewId];
                    var eventHandler = instance._props["on" + eventType];
                    // TODO: Could do manual event bubbling here. Form an "event" object, give it to the
                    // handler, and then walk up the parent chain giving the same object to every parent
                    // callback. Would require that ViewInstance carry pointers to parents but that should
                    // be trivial...
                    if (typeof eventHandler === 'function') {
                        eventHandler.call.apply(eventHandler, __spreadArrays([null], args));
                    }
                }
            };
            exports_1("default", {
                getRootContainer: function () {
                    if (__rootViewInstance !== null)
                        return __rootViewInstance;
                    var id = window.__BlueprintNative__.getRootInstanceId();
                    __rootViewInstance = new ViewInstance(id, 'View');
                    return __rootViewInstance;
                },
                createViewInstance: function (viewType, props, parentInstance) {
                    var id = window.__BlueprintNative__.createViewInstance(viewType);
                    var instance = new ViewInstance(id, viewType, props);
                    __viewRegistry[id] = instance;
                    return instance;
                },
                createTextViewInstance: function (text) {
                    var id = window.__BlueprintNative__.createTextViewInstance(text);
                    return new RawTextViewInstance(id, text);
                },
            });
        }
    };
});
