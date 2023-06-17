# Mocking Node Modules
- Mocks of node modules should be placed in the __mocks__ directory adjacent to node_modules
- Automatically mocked. There's no need to explicitly call jest.mock('module_name')

# Mocking Built-in Node Modules
- explicitly call (e.g. `jest.mock('path')`, `jest.mock('fs')`) is required, because build-in modules are not mocked by default.

# Manual Mocks
- Manual mocks are defined by writing a module in a __mocks__/ subdirectory immediately adjacent to the module

# References
[Jest Docs - Manual Mocks](https://jestjs.io/docs/manual-mocks)