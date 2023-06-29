// redux-toolkit.js.org/api/createEntityAdapter#selectid
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

type Note = {
  content: string;
  id?: string;
  path?: string;
  title: string;
};

export const notesAdapter = createEntityAdapter<Note>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState(),
  reducers: {
    allNotesRemoved: notesAdapter.removeAll,
    noteAdded: notesAdapter.addOne, // Fails if note already exists.
    noteRemoved: notesAdapter.removeOne,
    noteReplaced: notesAdapter.setOne,
    notesAdded: notesAdapter.addMany, // Fails if note already exists.
    notesRemoved: notesAdapter.removeMany,
    notesReplaced: notesAdapter.setMany,
    notesUpdated: notesAdapter.updateMany, // For adding properties not yet defined (optional Note properties)
    notesUpserted: notesAdapter.upsertMany, // Updates existing properties (shallow merge of old with new)
    noteUpdated: notesAdapter.updateOne, // For adding properties not yet defined (optional Note properties)
    noteUpserted: notesAdapter.upsertOne, // Updates existing properties (shallow merge of old with new)
    allNotesReplaced(state, action) {
      notesAdapter.setAll(state, action.payload.notes);
    },
  },
});

export const {
  allNotesRemoved,
  noteAdded,
  noteRemoved,
  noteReplaced,
  notesAdded,
  notesRemoved,
  notesReplaced,
  notesUpdated,
  notesUpserted,
  noteUpdated,
  noteUpserted,
} = notesSlice.actions;

export default notesSlice.reducer;
