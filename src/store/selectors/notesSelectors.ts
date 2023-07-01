import { createSelector } from '@reduxjs/toolkit';
import { notesAdapter } from '../slices';
import { RootState, store } from '../store';

const notesSelectors = notesAdapter.getSelectors<RootState>(
  state => state.notes,
);

const selectActiveNoteId = (state: RootState) => state.notes.activeNoteId;

const selectNoteIds = () => notesSelectors.selectIds(store.getState());

const selectNotes = () => notesSelectors.selectAll(store.getState());

const selectUntitledNoteCount = (state: RootState) =>
  state.notes.untitledNoteCount;

const selectNoteById = (id: string) =>
  notesSelectors.selectById(store.getState(), id);

const selectSortedNotes = createSelector(
  notesSelectors.selectIds,
  notesSelectors.selectAll,
  (noteIds, notes) => {
    return noteIds.length
      ? (noteIds.map(id => notes.find(note => note.id === id)) as Note[])
      : [];
  },
);

export {
  selectActiveNoteId,
  selectNoteById,
  selectNoteIds,
  selectNotes,
  selectSortedNotes,
  selectUntitledNoteCount,
};
