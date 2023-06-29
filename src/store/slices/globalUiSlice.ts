import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IglobalUi {
  activeNoteId: string | null;
  untitledNoteCount: number;
}

const initialState: IglobalUi = {
  activeNoteId: null,
  untitledNoteCount: 0,
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
  },
});

export const { activeNoteIdSet, untitledNoteCountSet } = globalUiSlice.actions;
export default globalUiSlice.reducer;
