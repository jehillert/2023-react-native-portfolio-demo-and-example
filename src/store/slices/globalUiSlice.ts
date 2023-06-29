import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IglobalUi {
  activeNoteId: string | null;
}

const initialState: IglobalUi = {
  activeNoteId: null,
};

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    activeNoteIdSet(state, { payload }: PayloadAction<string>) {
      state.activeNoteId = payload;
    },
  },
});

export const { activeNoteIdSet } = globalUiSlice.actions;
export default globalUiSlice.reducer;
