import { notesAdapter } from '../slices';
import { RootState, store } from '../store';

const notesSelectors = notesAdapter.getSelectors<RootState>(
  state => state.notes,
);

const selectAllNotes = () => notesSelectors.selectAll(store.getState());

const selectNoteById = (id: string) =>
  notesSelectors.selectById(store.getState(), id);

export { notesSelectors, selectAllNotes, selectNoteById };
