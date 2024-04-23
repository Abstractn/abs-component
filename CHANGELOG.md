Changelog
=========

### 1.2.1

Module codebase:

* [NEW] Updated `CHANGELOG.md` with tags for types of log
* [NEW] Added Development section in `README.md` with short guide and notes on how to setup the project for development
* [EDIT] `init` function inside components is now optional too
* [EDIT] Minor code syntax improvements
* [FIX] Fixed issue where initializing a subset of components with `initComponents(scopeNode)`, after one or more components have been already inizialized before, makes the already initialized components' `ready()` get called even though they are not contained within `scopeNode`

Repository management:

* [EDIT] For ease of setup the module "copyfiles" is now installed as dev dependency and not used as globally installed; the build script has been edited accordingly

### 1.2.0

* [NEW] Added `getRegisteredComponents(): string[]` that returns the list of currently registered components
* [EDIT] Added optional parameter `scopeNode?: HTMLElement` to `initComponents()` (new method signature is now `initComponents(scopeNode?: HTMLElement): void`) to apply node scope restriction when initializing components in bulk

### 1.0.1

* -

### 1.0.0

* Forwarded version for stable codebase milestone

### 0.1.1

* Changed module core structure to class export

### 0.1.0

* Initial port from non-module files