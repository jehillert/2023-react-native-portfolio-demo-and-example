import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Note, notesAdapter } from '../slices/notesSlice';

const notesSelectors = notesAdapter.getSelectors<RootState>(
  state => state.notes,
);

const { selectAll, selectEntities, selectById, selectIds, selectTotal } =
  notesSelectors;

const selectActiveNoteId = (state: RootState) => state.notes.activeNoteId;

const selectNoteIds = () => selectIds(store.getState());

const selectNotes = () => selectAll(store.getState());

const selectUntitledNoteCount = (state: RootState) =>
  state.notes.untitledNoteCount;

const selectNoteById = (id: string) => selectById(store.getState(), id);

const selectActiveNote = createSelector(
  selectActiveNoteId,
  selectEntities,
  (activeNoteId, entities) => entities[activeNoteId],
);

const selectSortedNotes = createSelector(
  selectIds,
  selectAll,
  (noteIds, notes) => {
    return noteIds.length
      ? (noteIds.map(id => notes.find(note => note.id === id)) as Note[])
      : [];
  },
);

const selectActiveMarkupIds = createSelector(
  selectActiveNote,
  activeNote => activeNote?.markups ?? [],
);

export {
  selectActiveMarkupIds,
  selectActiveNote,
  selectActiveNoteId,
  selectNoteById,
  selectNoteIds,
  selectNotes,
  selectSortedNotes,
  selectTotal,
  selectUntitledNoteCount,
};
