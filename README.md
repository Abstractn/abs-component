# Introduction:

This module allows you to define classes and associate an instance of them to an HTML node so that these nodes can behave as autonomous components.

Its implementation remains rather simple and the main goal in mind is to give users a basic way of organizing the scripts for different elements in a page, especially in small projects such as static websites.

# CDN:
Direct CDN url:
```https://abstractn.github.io/lib/abs-component.nx.js```

Script import from HTML:
```<script src="https://abstractn.github.io/lib/abs-component.nx.js"></script>```

# Usage example:
1) Firstly create an instance of the module class optionally passing to the constructor a config object with your preferred options.
```typescript
import { AbsComponentManager } from '@abs/component';
import { AbsComponentManagerConfig } from '@abs/component';

const absComponentManagerConfig: AbsComponentManagerConfig = {};
const absComponentManager = new AbsComponentManager(absComponentManagerConfig);
```

2) Define a component class
```typescript
import { AbsComponent } from '@abs/component';

interface MyComponent {
  myCustomParameter: string;
}

class MyComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init(): void {
    this.myCustomParameter: string = 'bar';
  }

  ready(): void {
    this.myCustomMethod();
  }

  destroy(): void {
    console.log('Goodbye world');
  }

  myCustomMethod(): string {
    return this.myCustomParameter;
  }
}
```

3) Register your newly defined component
```typescript
absComponentManager.registerComponent('my-component', MyComponent);
```

4) After all components are defined and registered, initialize them all together with a single method
```typescript
absComponentManager.initComponents();
```

# Module lifecycle
The component initialization will select all HTML nodes having the component name data-attribute and call their `init()` method sequentially.
After all components have been inited the same will be done calling their `ready()` method.

NOTE: if you want a component to interact with another writing code inside the `init()` method, one of the components may not exist yet depending on their order in the page. It is suggested to write inside `init()` for internal declarations and component preparation while the proper logic should go inside `ready()`;

```mermaid
flowchart TB
    a[define a component class] --> b[register the component]
    b[register the component] --> a[define a component class]
    b[register the component] --> c[initialize components]
    c[initialize components] -- the order depends on how components are placed in DOM --> d([all components' `init` called sequentially])
    d([all components' `init` called sequentially]) --> e([all components' `ready` called sequentially])
```