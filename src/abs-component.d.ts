export declare namespace AbsComponent {
  interface AbsComponent {
    init: () => void;
    ready?: () => void;
    destroy?: () => void;
    node: HTMLElement;
  }
  type AbsComponentList = Record<string, AbsComponent[]>;
  interface AbsComponentManagerConfig {
    nodeAttributeSelector?: string;
  }
  class AbsComponentManager {
    constructor(config?: AbsComponentManagerConfig);
    static readonly DEFAULT_NODE_ATTRIBUTE_SELECTOR = "data-abs-component";
    readonly nodeAttributeSelector: string;
    readonly components: AbsComponentList;
    private componentsClassList;
    registerComponent(templateReferenceName: string, scriptClass: new (node: HTMLElement) => AbsComponent): void;
    initComponents(): void;
    initComponent(componentNode: HTMLElement): void;
    getComponentByNode(componentNode: HTMLElement): AbsComponent | null;
    destroyComponent(component: AbsComponent): void;
    purgeComponentsList(): void;
  }
}