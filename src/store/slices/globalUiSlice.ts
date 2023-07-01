import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IglobalUi {
  initialUrl: string | null;
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
}

const initialState: IglobalUi = {
  initialUrl: null,
  leftDrawerOpen: false,
  rightDrawerOpen: false,
};

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    // not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
    setInitialUrl(state, { payload }: PayloadAction<string | null>) {
      state.initialUrl = payload;
    },
    leftDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.leftDrawerOpen = payload;
    },
    rightDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.rightDrawerOpen = payload;
    },
  },
});

export const { leftDrawerOpened, rightDrawerOpened, setInitialUrl } =
  globalUiSlice.actions;

export default globalUiSlice.reducer;
