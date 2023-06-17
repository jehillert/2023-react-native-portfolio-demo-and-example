# Mocking Node Modules
- Mocks of node modules should be placed in the __mocks__ directory adjacent to node_modules
- Automatically mocked. There's no need to explicitly call jest.mock('module_name')
  - FOR THIS TO WORK, THE EXACT NAME OF THE DEPENDENCY IN NODE_MODULES HAS TO BE USED.
  - For nested dependencies, recreate the folder structure leading to the module.
  - Otherwise, the mock needs to be referenced in `setupFiles[]` or `setupFilesAfterEnv[]` in `jest.config.js`.

# Mocking Built-in Node Modules
- explicitly call (e.g. `jest.mock('path')`, `jest.mock('fs')`) is required, because build-in modules are not mocked by default.

# Manual Mocks
- Manual mocks are defined by writing a module in a __mocks__/ subdirectory immediately adjacent to the module

# References
[Jest Docs - Manual Mocks](https://jestjs.io/docs/manual-mocks)