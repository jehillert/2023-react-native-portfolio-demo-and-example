// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import { getTime } from 'date-fns';
import {
  EntityId,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addProject } from './projectsSlice';

type Note = {
  content?: string;
  noteId: EntityId;
  title?: string;
  dateCreated?: number;
  dateUpdated: number;
};

export const notesAdapter = createEntityAdapter<Note>({
  selectId: note => note.noteId,
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState({}),
  reducers: {
    removeNote: notesAdapter.removeOne,
    replaceNote: notesAdapter.setOne,
    replaceNotes: notesAdapter.setMany,
    updateNote: notesAdapter.upsertOne,
    updateNotes: notesAdapter.upsertMany,
    deleteNote(state, { payload: note }: PayloadAction<Note>) {
      notesAdapter.removeOne(state, note.noteId);
    },
    setNoteIds(state, { payload }: PayloadAction<EntityId[]>) {
      state.ids = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addProject, (state, { payload }) => {
      const { noteId } = payload ?? {};
      const dateCreated = getTime(new Date());

      notesAdapter.addOne(state, {
        noteId,
        title: 'Notes',
        dateCreated,
        dateUpdated: dateCreated,
        content: '',
      });
    });
  },
});

export const {
  addNote,
  deleteNote,
  removeNote,
  replaceNote,
  replaceNotes,
  setNoteIds,
  updateNote,
  updateNotes,
} = notesSlice.actions;

export type { Note };
export default notesSlice.reducer;
