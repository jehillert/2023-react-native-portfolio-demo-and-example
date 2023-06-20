import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  path: string;
  content: string;
};

interface INotes {
  notes: Note[];
}

const initialState: INotes = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, { payload: note }: PayloadAction<Note>) {
      state.notes.push(note);
    },
    deleteNote(state, { payload: targetId }: PayloadAction<string>) {
      const targetIndex = state.notes.findIndex(note => note.id === targetId);
      state.notes.splice(targetIndex, 1);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
