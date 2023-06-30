export const config = {
  screens: {
    Directory: {
      path: 'directory/:id?',
      parse: {
        id: (id: String) => `${id}`,
      },
    },
    Note: {
      path: 'note/:id?',
      parse: {
        id: (id: String) => `${id}`,
      },
    },
  },
};
