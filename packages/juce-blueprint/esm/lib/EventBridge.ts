import EventEmitter from 'events';

// @ts-ignore
const EventBridge = new EventEmitter();

EventBridge.setMaxListeners(30);

// An internal hook for the native side, from which we propagate events through
// the EventEmitter interface.
window.__BlueprintNative__.dispatchEvent = function dispatchEvent(eventType, ...args) {
  EventBridge.emit(eventType, ...args);
}

export default EventBridge;
