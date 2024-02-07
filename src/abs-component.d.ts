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
export declare class AbsComponentManager {
  constructor(config?: AbsComponentManagerConfig);
  static readonly DEFAULT_NODE_ATTRIBUTE_SELECTOR = "data-abs-component";
  readonly nodeAttributeSelector: string;
  readonly components: AbsComponentList;
  private registeredComponentsList;
  registerComponent(templateReferenceName: string, scriptClass: new (node: HTMLElement) => AbsComponent): void;
  initComponents(scopeNode?: HTMLElement): void;
  initComponent(componentNode: HTMLElement): void;
  getComponentByNode(componentNode: HTMLElement): AbsComponent | null;
  destroyComponent(component: AbsComponent): void;
  purgeComponentsList(): void;
}