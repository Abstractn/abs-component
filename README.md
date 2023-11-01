# abs-component

(this is a draft)

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