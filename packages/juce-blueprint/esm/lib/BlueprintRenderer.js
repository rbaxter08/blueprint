System.register(["./MethodTracer", "react-reconciler", "./BlueprintBackend", "invariant"], function (exports_1, context_1) {
    "use strict";
    var __rest = (this && this.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var MethodTracer_1, react_reconciler_1, BlueprintBackend_1, invariant_1, HostConfig, BlueprintTracedRenderer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (MethodTracer_1_1) {
                MethodTracer_1 = MethodTracer_1_1;
            },
            function (react_reconciler_1_1) {
                react_reconciler_1 = react_reconciler_1_1;
            },
            function (BlueprintBackend_1_1) {
                BlueprintBackend_1 = BlueprintBackend_1_1;
            },
            function (invariant_1_1) {
                invariant_1 = invariant_1_1;
            }
        ],
        execute: function () {
            HostConfig = {
                /** Time provider. */
                now: Date.now,
                /** Indicates to the reconciler that our DOM tree supports mutating operations
                 *  like appendChild, removeChild, etc.
                 */
                supportsMutation: true,
                /** Provides the context for rendering the root level element.
                 *
                 *  Really only using this and `getChildHostContext` for enforcing nesting
                 *  constraints, such as that raw text content must be a child of a <Text>
                 *  element.
                 *
                 *  @param {Container} rootContainerInstance
                 */
                getRootHostContext: function (rootContainerInstance) {
                    return {
                        isInTextParent: false,
                    };
                },
                /** Provides the context for rendering a child element.
                 *
                 *  @param {Object} parentHostContext
                 *  @param {String} elementType
                 *  @param {Container} rootContainerInstance
                 */
                getChildHostContext: function (parentHostContext, elementType, rootContainerInstance) {
                    var isInTextParent = parentHostContext.isInTextParent ||
                        elementType === 'Text';
                    return { isInTextParent: isInTextParent };
                },
                prepareForCommit: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                },
                resetAfterCommit: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                },
                /** Called to determine whether or not a new text value can be set on an
                 *  existing node, or if a new text node needs to be created.
                 *
                 *  This is essentially born from the fact in that in a Web DOM, there are certain
                 *  nodes, such as <textarea>, that support a `textContent` property. Setting the
                 *  node's `textContent` property is different from creating a TextNode and appending
                 *  it to the node's children array. This method signals which option to take.
                 *
                 *  In our case, we return `false` always because we have no nodes in the JUCE
                 *  backend that support this kind of behavior. All text nodes must be created as
                 *  RawTextViewInstances as children of a TextViewInstance.
                 *
                 *  @param {String} elementType
                 *  @param {Object} props
                 */
                shouldSetTextContent: function (elementType, props) {
                    return false;
                },
                /** Create a new DOM node.
                 *
                 *  @param {String} elementType
                 *  @param {Object} props
                 *  @param {Container} rootContainerInstance
                 *  @param {Object} hostContext
                 *  @param {Object} internalInstanceHandle
                 */
                createInstance: function (elementType, props, rootContainerInstance, hostContext, internalInstanceHandle) {
                    invariant_1.default(!hostContext.isInTextParent, 'Nesting elements inside of <Text> is currently not supported.');
                    return BlueprintBackend_1.default.createViewInstance(elementType, props, rootContainerInstance);
                },
                /** Create a new text node.
                 *
                 *  @param {String} text
                 *  @param {Container} rootContainerInstance
                 *  @param {Object} hostContext
                 *  @param {Object} internalInstanceHandle
                 */
                createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
                    invariant_1.default(hostContext.isInTextParent, 'Raw text strings must be rendered within a <Text> element.');
                    return BlueprintBackend_1.default.createTextViewInstance(text);
                },
                /** Mount the child to its container.
                 *
                 *  @param {Instance} parentInstance
                 *  @Param {Instance} child
                 */
                appendInitialChild: function (parentInstance, child) {
                    parentInstance.appendChild(child);
                },
                /** For each newly constructed node, once we finish the assignment of children
                 *  this method will be called to finalize the node. We take this opportunity
                 *  to propagate relevant properties to the node.
                 *
                 *  @param {Instance} instance
                 *  @param {String} elementType
                 *  @param {Object} props
                 *  @param {Instance} rootContainerInstance
                 */
                finalizeInitialChildren: function (instance, elementType, props, rootContainerInstance) {
                    Object.keys(props).forEach(function (propKey) {
                        if (propKey !== 'children') {
                            instance.setProperty(propKey, props[propKey]);
                        }
                    });
                },
                /** During a state change, this method will be called to identify the set of
                 *  properties that need to be updated. This is more-or-less an opportunity
                 *  for us to diff our props before propagating.
                 *
                 *  @param {Instance} instance
                 *  @param {String} elementType
                 *  @param {Object} oldProps
                 *  @param {Object} newProps
                 *  @param {Instance} rootContainerInstance
                 *  @param {Object} hostContext
                 */
                prepareUpdate: function (domElement, elementType, oldProps, newProps, rootContainerInstance, hostContext) {
                    // The children prop will be handled separately via the tree update.
                    var oldChildren = oldProps.children, op = __rest(oldProps, ["children"]);
                    var newChildren = newProps.children, np = __rest(newProps, ["children"]);
                    // We construct a new payload of property values that are either new or
                    // have changed for this element.
                    var payload = {};
                    for (var key in np) {
                        if (np.hasOwnProperty(key) && np[key] !== op[key]) {
                            payload[key] = np[key];
                        }
                    }
                    return payload;
                },
                /** Following from `prepareUpdate` above, this is our opportunity to apply
                 *  the update payload to a given instance.
                 *
                 *  @param {Instance} instance
                 *  @param {Object} updatePayload
                 *  @param {String} elementType
                 *  @param {Object} oldProps
                 *  @param {Object} newProps
                 *  @param {Object} internalInstanceHandle
                 */
                commitUpdate: function (instance, updatePayload, elementType, oldProps, newProps, internalInstanceHandle) {
                    Object.keys(updatePayload).forEach(function (propKey) {
                        instance.setProperty(propKey, updatePayload[propKey]);
                    });
                },
                /** Similar to the previous method, this is our opportunity to apply text
                 *  updates to a given instance.
                 *
                 *  @param {Instance} instance
                 *  @param {String} oldText
                 *  @param {String} newText
                 */
                commitTextUpdate: function (instance, oldText, newText) {
                    if (typeof newText === 'string' && oldText !== newText) {
                        instance.setTextValue(newText);
                    }
                },
                /** TODO
                 *
                 *  @param {Instance} instance
                 *  @param {String} type
                 *  @param {Object} newProps
                 *  @param {Instance} internalInstanceHandle
                 */
                commitMount: function (instance, type, newProps, internalInstanceHandle) {
                    // Noop
                },
                /** Append a child to a parent instance.
                 *
                 *  @param {Instance} parentInstance
                 *  @Param {Instance} child
                 */
                appendChild: function (parentInstance, child) {
                    parentInstance.appendChild(child);
                },
                /** Append a child to a parent container.
                 *  TODO: Not really sure how this is different from the above.
                 *
                 *  @param {Container} parentContainer
                 *  @Param {Instance} child
                 */
                appendChildToContainer: function (parentContainer, child) {
                    parentContainer.appendChild(child);
                },
                /** Inserts a child node into a parent's children array, just before the
                 *  second given child node.
                 *
                 *  @param {Instance} parentInstance
                 *  @Param {Instance} child
                 *  @Param {Instance} beforeChild
                 */
                insertBefore: function (parentInstance, child, beforeChild) {
                    var index = parentInstance.getChildIndex(beforeChild);
                    if (index < 0)
                        throw new Error('Failed to find child instance for insertBefore operation.');
                    parentInstance.insertChild(child, index);
                },
                /** Remove a child from a parent instance.
                 *
                 *  @param {Instance} parentInstance
                 *  @Param {Instance} child
                 */
                removeChild: function (parentInstance, child) {
                    parentInstance.removeChild(child);
                },
                /** Remove a child from a parent container.
                 *
                 *  @param {Container} parentContainer
                 *  @Param {Instance} child
                 */
                removeChildFromContainer: function (parentContainer, child) {
                    parentContainer.removeChild(child);
                },
            };
            exports_1("default", react_reconciler_1.default(HostConfig));
            exports_1("BlueprintTracedRenderer", BlueprintTracedRenderer = react_reconciler_1.default(new Proxy(HostConfig, MethodTracer_1.default)));
        }
    };
});
