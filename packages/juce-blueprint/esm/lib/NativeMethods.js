System.register([], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", new Proxy(window.__BlueprintNative__, {
                get: function (target, propKey, receiver) {
                    if (target.hasOwnProperty(propKey) && typeof target[propKey] === 'function') {
                        return function __nativeWrapper__() {
                            var _a;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            (_a = target[propKey]).call.apply(_a, __spreadArrays([null], args));
                        };
                    }
                    console.warn('WARNING: Attempt to access an undefined NativeMethod.');
                    return function noop() { };
                }
            }));
        }
    };
});
