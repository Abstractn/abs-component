export module AbsComponent {
  export interface AbsComponent {
    init: () => void;
    ready?: () => void;
    destroy?: () => void;
    node: HTMLElement;
  }
  
  export type AbsComponentList = Record<string, AbsComponent[]>;
  
  export interface AbsComponentManagerConfig {
    nodeAttributeSelector?: string;
  }
  
  export class AbsComponentManager {
    constructor (config?: AbsComponentManagerConfig) {
      this.nodeAttributeSelector = config?.nodeAttributeSelector || AbsComponentManager.DEFAULT_NODE_ATTRIBUTE_SELECTOR;
    }
  
    public static readonly DEFAULT_NODE_ATTRIBUTE_SELECTOR = 'data-abs-component';
  
    public readonly nodeAttributeSelector: string;
    public readonly components: AbsComponentList = {};
  
    private componentsClassList: Record<string, new (node: HTMLElement) => AbsComponent> = {};
  
    public registerComponent(templateReferenceName: string, scriptClass: new (node: HTMLElement) => AbsComponent): void {
      this.componentsClassList[templateReferenceName] = scriptClass;
    }
  
    public initComponents(): void {
      try {
        document.querySelectorAll(`[${this.nodeAttributeSelector}]`).forEach((componentNode) => {
          const componentClassName = componentNode.getAttribute(this.nodeAttributeSelector);
          if(componentClassName === null) throw [`[ABS] The following node's component data attribute value is null:`, componentNode];
          if(this.componentsClassList[componentClassName] === undefined) throw `[ABS] Component initializer error: component "${componentClassName}" is not registered`;
          if(this.components[componentClassName] === undefined) {
            this.components[componentClassName] = [];
          }
          const ComponentClass = this.componentsClassList[componentClassName];
          const componentInstance = new ComponentClass(componentNode as HTMLElement);
          componentInstance.init();
          this.components[componentClassName].push(componentInstance);
        });
        Object.keys(this.components).forEach(componentName => {
          this.components[componentName].forEach(component => {
            if(component.ready) {
              component.ready();
            }
          })
        });
      } catch (error) {
        if(Array.isArray(error)) {
          console.error(...error);
        } else {
          console.error(error);
        }
      }
    }
  
    public initComponent(componentNode: HTMLElement): void {
      try {
        const componentClassName = componentNode.getAttribute(this.nodeAttributeSelector);
        if(componentClassName === null) throw [`[ABS] The following node's component data attribute value is null:`, componentNode];
        if(this.componentsClassList[componentClassName] === undefined) throw `[ABS] Component initializer error: component "${componentClassName}" is not registered`;
        if(this.components[componentClassName] === undefined) {
          this.components[componentClassName] = [];
        }
        const ComponentClass = this.componentsClassList[componentClassName];
        const componentInstance = new ComponentClass(componentNode);
        componentInstance.init();
        this.components[componentClassName].push(componentInstance);
        if(componentInstance.ready) {
          componentInstance.ready();
        }
      } catch (error) {
        if(Array.isArray(error)) {
          console.error(...error);
        } else {
          console.error(error);
        }
      }
    }
  
    public getComponentByNode(componentNode: HTMLElement): AbsComponent | null {
      let res: AbsComponent | null = null;
      const componentName = componentNode.getAttribute(this.nodeAttributeSelector);
      if(componentName && this.components[componentName]) {
        const componentSearchResult = this.components[componentName].find(componentInstance => componentInstance.node === componentNode);
        if(componentSearchResult) {
          res = componentSearchResult;
        }
      }
      return res;
    }
  
    public destroyComponent(component: AbsComponent): void {
      Object.keys(this.components).forEach(componentName => {
        const componentSearchResult = this.components[componentName].find(componentInstance => componentInstance === component);
        if(componentSearchResult) {
          const subComponentsNodeList = component.node.querySelectorAll(`[${this.nodeAttributeSelector}]`);
          subComponentsNodeList.forEach(subComponentNode => {
            const subComponentReference = this.getComponentByNode(subComponentNode as HTMLElement);
            if(subComponentReference) this.destroyComponent(subComponentReference);
          });
          if(component.destroy) component.destroy();
          
          component.node.remove();
          
          const componentIndex = this.components[componentName].indexOf(component);
          this.components[componentName].splice(componentIndex, 1);
        }
      });
    }
  
    public purgeComponentsList(): void {
      Object.keys(this.components).forEach(componentName => {
        this.components[componentName].forEach(component => {
          const componentAttributeName = component.node.getAttribute(this.nodeAttributeSelector);
          const isComponentAlive = Boolean(
            document.querySelector(`[${this.nodeAttributeSelector}="${componentAttributeName}"]`)
          );
          
          if(!isComponentAlive) this.destroyComponent(component);
        });
      });
    }
  }
}