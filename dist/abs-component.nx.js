class AbsComponentManager {
    constructor(config) {
        this.components = {};
        this.componentsClassList = {};
        this.nodeAttributeSelector = (config === null || config === void 0 ? void 0 : config.nodeAttributeSelector) || AbsComponentManager.DEFAULT_NODE_ATTRIBUTE_SELECTOR;
    }
    registerComponent(templateReferenceName, scriptClass) {
        this.componentsClassList[templateReferenceName] = scriptClass;
    }
    initComponents() {
        try {
            document.querySelectorAll(`[${this.nodeAttributeSelector}]`).forEach((componentNode) => {
                const componentClassName = componentNode.getAttribute(this.nodeAttributeSelector);
                if (componentClassName === null)
                    throw [`[ABS] The following node's component data attribute value is null:`, componentNode];
                if (this.componentsClassList[componentClassName] === undefined)
                    throw `[ABS] Component initializer error: component "${componentClassName}" is not registered`;
                if (this.components[componentClassName] === undefined) {
                    this.components[componentClassName] = [];
                }
                const ComponentClass = this.componentsClassList[componentClassName];
                const componentInstance = new ComponentClass(componentNode);
                componentInstance.init();
                this.components[componentClassName].push(componentInstance);
            });
            Object.keys(this.components).forEach(componentName => {
                this.components[componentName].forEach(component => {
                    if (component.ready) {
                        component.ready();
                    }
                });
            });
        }
        catch (error) {
            if (Array.isArray(error)) {
                console.error(...error);
            }
            else {
                console.error(error);
            }
        }
    }
    initComponent(componentNode) {
        try {
            const componentClassName = componentNode.getAttribute(this.nodeAttributeSelector);
            if (componentClassName === null)
                throw [`[ABS] The following node's component data attribute value is null:`, componentNode];
            if (this.componentsClassList[componentClassName] === undefined)
                throw `[ABS] Component initializer error: component "${componentClassName}" is not registered`;
            if (this.components[componentClassName] === undefined) {
                this.components[componentClassName] = [];
            }
            const ComponentClass = this.componentsClassList[componentClassName];
            const componentInstance = new ComponentClass(componentNode);
            componentInstance.init();
            this.components[componentClassName].push(componentInstance);
            if (componentInstance.ready) {
                componentInstance.ready();
            }
        }
        catch (error) {
            if (Array.isArray(error)) {
                console.error(...error);
            }
            else {
                console.error(error);
            }
        }
    }
    getComponentByNode(componentNode) {
        let res = null;
        const componentName = componentNode.getAttribute(this.nodeAttributeSelector);
        if (componentName && this.components[componentName]) {
            const componentSearchResult = this.components[componentName].find(componentInstance => componentInstance.node === componentNode);
            if (componentSearchResult) {
                res = componentSearchResult;
            }
        }
        return res;
    }
    destroyComponent(component) {
        Object.keys(this.components).forEach(componentName => {
            const componentSearchResult = this.components[componentName].find(componentInstance => componentInstance === component);
            if (componentSearchResult) {
                const subComponentsNodeList = component.node.querySelectorAll(`[${this.nodeAttributeSelector}]`);
                subComponentsNodeList.forEach(subComponentNode => {
                    const subComponentReference = this.getComponentByNode(subComponentNode);
                    if (subComponentReference)
                        this.destroyComponent(subComponentReference);
                });
                if (component.destroy)
                    component.destroy();
                component.node.remove();
                const componentIndex = this.components[componentName].indexOf(component);
                this.components[componentName].splice(componentIndex, 1);
            }
        });
    }
    purgeComponentsList() {
        Object.keys(this.components).forEach(componentName => {
            this.components[componentName].forEach(component => {
                const componentAttributeName = component.node.getAttribute(this.nodeAttributeSelector);
                const isComponentAlive = Boolean(document.querySelector(`[${this.nodeAttributeSelector}="${componentAttributeName}"]`));
                if (!isComponentAlive)
                    this.destroyComponent(component);
            });
        });
    }
}
AbsComponentManager.DEFAULT_NODE_ATTRIBUTE_SELECTOR = 'data-abs-component';
//# sourceMappingURL=abs-component.js.map