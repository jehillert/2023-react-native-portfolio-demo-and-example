// redux-toolkit.js.org/api/createEntityAdapter#selectid
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { uuid } from '../../utils';
import { AppThunk } from '../store';
import { selectUntitledNoteCount } from '../selectors';
import { activeNoteIdSet, untitledNoteCountSet } from '.';

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

const createNote =
  (note: Note): AppThunk =>
  (dispatch, getState) => {
    const { id: _id, content, path: _path, title: _title } = note;
    const id = _id ? _id : uuid();
    const path = _path ?? '/';

    let title = _title;

    if (!title) {
      const untitledNoteCount = selectUntitledNoteCount(getState());
      const newUntitledNoteCount = untitledNoteCount + 1;
      title = `note-${newUntitledNoteCount}`;
      dispatch(untitledNoteCountSet(newUntitledNoteCount));
    }

    dispatch(activeNoteIdSet(id));

    const newNote = {
      id,
      content,
      path,
      title,
    };

    dispatch(noteAdded(newNote));
  };

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

export { createNote };

export default notesSlice.reducer;
