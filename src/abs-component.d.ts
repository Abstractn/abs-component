declare module 'AbsComponentManager' {
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
    constructor (config?: AbsComponentManagerConfig);
    static readonly DEFAULT_NODE_ATTRIBUTE_SELECTOR: string;
    readonly nodeAttributeSelector: string;
    readonly components: AbsComponentList;
    registerComponent(templateReferenceName: string, scriptClass: new (node: HTMLElement) => AbsComponent): void;
    initComponents(): void;
    initComponent(componentNode: HTMLElement): void;
    getComponentByNode(componentNode: HTMLElement): AbsComponent | undefined;
    destroyComponent(component: AbsComponent): void;
  }
}