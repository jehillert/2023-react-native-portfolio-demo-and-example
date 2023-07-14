import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum DrawerId {
  APP_SETTINGS = 'AppSettings',
  DOCUMENT_MAP = 'DocumentMap',
  MARKUP_TOOLS = 'MarkupTools',
}

interface IglobalUi {
  initialUrl: string | null;
  headerHeight: number | null;
  drawerState: { [key in DrawerId]: boolean };
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
}

const initialState: IglobalUi = {
  initialUrl: null,
  headerHeight: null,
  leftDrawerOpen: false,
  rightDrawerOpen: false,
  drawerState: {
    [DrawerId.APP_SETTINGS]: false,
    [DrawerId.MARKUP_TOOLS]: false,
    [DrawerId.DOCUMENT_MAP]: false,
  },
};

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    setDrawer(
      state,
      { payload }: PayloadAction<{ drawerId: DrawerId; newState: boolean }>,
    ) {
      const { drawerId, newState } = payload;
      for (const id in state.drawerState) {
        const isOpen = state.drawerState[id as DrawerId];
        if (id !== drawerId && isOpen) {
          state.drawerState[id as DrawerId] = false;
        } else {
          state.drawerState[drawerId] = newState;
        }
      }
    },
    setHeaderHeight(state, { payload }: PayloadAction<number | null>) {
      state.headerHeight = payload;
    },
    setInitialUrl(state, { payload }: PayloadAction<string | null>) {
      state.initialUrl = payload;
    },
  },
});

export const { setDrawer, setHeaderHeight, setInitialUrl } =
  globalUiSlice.actions;
export { DrawerId };
export default globalUiSlice.reducer;
