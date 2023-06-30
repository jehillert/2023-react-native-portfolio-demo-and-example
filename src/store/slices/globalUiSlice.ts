import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IglobalUi {
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
}

const initialState: IglobalUi = {
  leftDrawerOpen: false,
  rightDrawerOpen: false,
};

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    leftDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.leftDrawerOpen = payload;
    },
    rightDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.rightDrawerOpen = payload;
    },
  },
});

export const { leftDrawerOpened, rightDrawerOpened } = globalUiSlice.actions;

export default globalUiSlice.reducer;
