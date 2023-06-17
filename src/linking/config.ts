export const config = {
  screens: {
    Home: {
      path: 'directory/:id?',
      parse: {
        id: (id: String) => `${id}`,
      },
    },
    Billing: {
      path: 'note/:id?',
      parse: {
        id: (id: String) => `${id}`,
      },
    },
  },
};
