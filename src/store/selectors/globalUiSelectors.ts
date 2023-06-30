import { RootState } from '../store';

const selectActiveNoteId = (state: RootState) => state.globalUi.activeNoteId;

const selectUntitledNoteCount = (state: RootState) =>
  state.globalUi.untitledNoteCount;

const selectLeftDrawerOpen = (state: RootState) =>
  state.globalUi.leftDrawerOpen;

const selectRightDrawerOpen = (state: RootState) =>
  state.globalUi.rightDrawerOpen;

export {
  selectActiveNoteId,
  selectLeftDrawerOpen,
  selectRightDrawerOpen,
  selectUntitledNoteCount,
};
