import { RootState } from '../store';

const selectActiveNoteId = (state: RootState) => state.globalUi.activeNoteId;

export { selectActiveNoteId };
