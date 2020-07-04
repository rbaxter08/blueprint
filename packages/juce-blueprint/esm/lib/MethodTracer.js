System.register(["util"], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var util_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                get: function (target, propKey, receiver) {
                    var f = target[propKey];
                    if (typeof f === 'undefined') {
                        console.log('MethodTrace: Stubbing undefined property access for', propKey);
                        return function _noop() {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            console.log.apply(console, __spreadArrays(['MethodTrace Stub:', propKey], args.map(function (arg) {
                                return util_1.inspect(arg, { depth: 1 });
                            })));
                        };
                    }
                    if (typeof f === 'function') {
                        return function _traced() {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            console.log.apply(console, __spreadArrays(['MethodTrace:', propKey], args.map(function (arg) {
                                return util_1.inspect(arg, { depth: 1 });
                            })));
                            return f.apply(this, args);
                        };
                    }
                    return f;
                }
            });
        }
    };
});
