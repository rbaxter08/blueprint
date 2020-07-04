System.register(["events"], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var events_1, EventBridge;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (events_1_1) {
                events_1 = events_1_1;
            }
        ],
        execute: function () {
            // @ts-ignore
            EventBridge = new events_1.default();
            EventBridge.setMaxListeners(30);
            // An internal hook for the native side, from which we propagate events through
            // the EventEmitter interface.
            window.__BlueprintNative__.dispatchEvent = function dispatchEvent(eventType) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                EventBridge.emit.apply(EventBridge, __spreadArrays([eventType], args));
            };
            exports_1("default", EventBridge);
        }
    };
});
