System.register(["core-js/es6/set", "core-js/es6/map"], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var EventLoop, el;
    var __moduleName = context_1 && context_1.id;
    /** This is the native hook that the juce backend looks to call. */
    function __schedulerInterrupt__() {
        el.tick();
    }
    /** A simple global setTimeout wrapper around the event loop instance. */
    function __setTimeout__(a, b, c, d, e, f, g) {
        return el.setTimeout(a, b, c, d, e, f, g);
    }
    /** A global setInterval implementation which falls back to setTimeout. */
    function __setInterval__(cb, wait, c, d, e, f, g) {
        // TODO: This isn't quite correct because we'll generate a new timer id
        // on each iteration and the id returned to the caller will become invalid
        // by the second iteration.
        return el.setTimeout(function () {
            cb.call(null, c, d, e, f, g);
            el.setTimeout(cb, wait, c, d, e, f, g);
        }, wait);
    }
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            /** The EventLoop manages all outstanding timers, invoking callbacks and
             *  clearing the registry in response to a regular interrupt from the JUCE
             *  backend.
             *
             *  This is not a proper event loop; just a thin wrapper for polyfilling
             *  timer methods in the global scope.
             */
            EventLoop = /** @class */ (function () {
                function EventLoop() {
                    this._timers = {};
                    this._nextId = 0;
                }
                EventLoop.prototype.setTimeout = function (fn, time) {
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    var id = this._nextId++;
                    this._timers[id] = {
                        f: fn,
                        eventTime: performance.now() + time,
                        vargs: __spreadArrays(args),
                    };
                };
                EventLoop.prototype.clearTimeout = function (id) {
                    if (this._timers.hasOwnProperty(id)) {
                        delete this._timers[id];
                    }
                };
                EventLoop.prototype.tick = function () {
                    for (var key in this._timers) {
                        if (this._timers.hasOwnProperty(key)) {
                            var timer = this._timers[key];
                            var eventTime = timer.eventTime;
                            if (performance.now() >= eventTime) {
                                timer.f.apply(null, timer.vargs);
                                delete this._timers[key];
                            }
                        }
                    }
                };
                return EventLoop;
            }());
            /** Our polyfills all operate over a single event loop instance. */
            el = new EventLoop();
            /** Attach our polyfills */
            // @ts-ignore
            global.__schedulerInterrupt__ = __schedulerInterrupt__;
            // @ts-ignore
            global.setTimeout = __setTimeout__;
            // @ts-ignore
            global.setInterval = __setInterval__;
        }
    };
});
