import { RootState } from '../store';

const selectActiveNoteId = (state: RootState) => state.globalUi.activeNoteId;

const selectUntitledNoteCount = (state: RootState) =>
  state.globalUi.untitledNoteCount;

export { selectActiveNoteId, selectUntitledNoteCount };
