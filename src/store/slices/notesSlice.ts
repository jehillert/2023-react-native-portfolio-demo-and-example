// redux-toolkit.js.org/api/createEntityAdapter#selectid
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { uuid } from '../../utils';
import { AppThunk } from '../store';
import { selectUntitledNoteCount } from '../selectors/notesSelectors';
import { setMarkup } from './markupsSlice';

type Note = {
  content?: string;
  id: string;
  path?: string;
  title?: string;
  dateCreated?: number;
  dateUpdated?: number | null;
  markups: string[];
};

export const notesAdapter = createEntityAdapter<Note>({
  sortComparer: ({ title: aTitle = '' }: Note, { title: bTitle = '' }: Note) =>
    aTitle.localeCompare(bTitle),
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState({
    activeNoteId: '',
    untitledNoteCount: 0,
  }),
  reducers: {
    addNewNote: notesAdapter.addOne,
    addProps2Note: notesAdapter.updateOne,
    addProps2Notes: notesAdapter.updateMany,
    removeAllNotes: notesAdapter.removeAll,
    removeNote: notesAdapter.removeOne,
    removeNotes: notesAdapter.removeMany,
    replaceNote: notesAdapter.setOne,
    replaceNotes: notesAdapter.setMany,
    updateNote: notesAdapter.upsertOne,
    updateNotes: notesAdapter.upsertMany,
    setActiveNoteId(state, { payload }: PayloadAction<string>) {
      state.activeNoteId = payload;
    },
    setIds(state, { payload }: PayloadAction<string[]>) {
      state.ids = payload;
    },
    setUntitledNoteCount(state, { payload }: PayloadAction<number>) {
      state.untitledNoteCount = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setMarkup, (state, action) => {
      const { parentNoteId, id } = action.payload;
      if (parentNoteId) {
        id && state.entities[parentNoteId]?.markups.push(id);
      } else {
        id && state.entities[state.activeNoteId]?.markups.push(id);
      }
    });
  },
});

const createNote =
  (path: string = '/'): AppThunk =>
  (dispatch, getState) => {
    const id = uuid() as string;
    const untitledNoteCount = selectUntitledNoteCount(getState());
    const newUntitledNoteCount = untitledNoteCount + 1;
    const title = `note-${newUntitledNoteCount}`;
    const timeStamp = new Date().getTime();
    dispatch(setUntitledNoteCount(newUntitledNoteCount));
    dispatch(setActiveNoteId(id));

    const newNote = {
      id,
      title,
      path,
      dateCreated: timeStamp,
      dateUpdated: null,
      content: '',
      markups: [],
    };

    dispatch(addNewNote(newNote));
  };

export const {
  addNewNote,
  addProps2Note,
  addProps2Notes,
  removeAllNotes,
  removeNote,
  removeNotes,
  replaceNote,
  replaceNotes,
  setActiveNoteId,
  setIds,
  setUntitledNoteCount,
  updateNote,
  updateNotes,
} = notesSlice.actions;

export type { Note };
export { createNote };
export default notesSlice.reducer;
