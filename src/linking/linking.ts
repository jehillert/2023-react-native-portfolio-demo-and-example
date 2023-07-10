const linking = {
  prefixes: ['https://*', 'http://*'],
  config: {
    screens: {
      Directory: {
        path: 'Directory',
      },
      Note: {
        path: 'Note',
      },
    },
  },
};

/*
export const linking = {
  prefixes: ['https://', 'http://'],
  config: {
    screens: {
      initialRouteName: 'Markup',
      screens: {
        Directory: {
          path: 'directory',
        },
        Markup: {
          path: 'note',
        },
        Note: {
          path: 'note/',
        },
      },
    },
  },
};

*/
export { linking };
