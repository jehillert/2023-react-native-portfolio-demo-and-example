import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IglobalUi {
  activeNoteId: string | null;
  untitledNoteCount: number;
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
}

const initialState: IglobalUi = {
  activeNoteId: null,
  untitledNoteCount: 0,
  leftDrawerOpen: false,
  rightDrawerOpen: false,
};

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    activeNoteIdSet(state, { payload }: PayloadAction<string>) {
      state.activeNoteId = payload;
    },
    untitledNoteCountSet(state, { payload }: PayloadAction<number>) {
      state.untitledNoteCount = payload;
    },
    leftDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.leftDrawerOpen = payload;
    },
    rightDrawerOpened(state, { payload }: PayloadAction<boolean>) {
      state.rightDrawerOpen = payload;
    },
  },
});

export const {
  activeNoteIdSet,
  leftDrawerOpened,
  rightDrawerOpened,
  untitledNoteCountSet,
} = globalUiSlice.actions;

export default globalUiSlice.reducer;
