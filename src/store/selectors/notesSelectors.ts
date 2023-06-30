import { notesAdapter } from '../slices';
import { RootState, store } from '../store';

const selectActiveNoteId = (state: RootState) => state.notes.activeNoteId;

const selectUntitledNoteCount = (state: RootState) =>
  state.notes.untitledNoteCount;

const notesSelectors = notesAdapter.getSelectors<RootState>(
  state => state.notes,
);

const selectNotes = () => notesSelectors.selectAll(store.getState());

const selectNoteIds = () => notesSelectors.selectIds(store.getState());

const selectNoteById = (id: string) =>
  notesSelectors.selectById(store.getState(), id);

export {
  selectActiveNoteId,
  selectNoteById,
  selectNoteIds,
  selectNotes,
  selectUntitledNoteCount,
};
