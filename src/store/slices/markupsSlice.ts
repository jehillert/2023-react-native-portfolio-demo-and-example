// redux-toolkit.js.org/api/createEntityAdapter#selectid
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import { CSSProperties } from 'react';
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { SearchConfig } from '../../screens/MarkupScreen/markupTypes';
import { selectActiveNoteId, selectNoteById } from '../selectors';
import { AppThunk } from '../store';
import { updateNote } from './notesSlice';

type Markup = {
  count?: number;
  searchConfig: SearchConfig;
  searchText: string;
  styles: CSSProperties;
};

export const markupsAdapter = createEntityAdapter<Markup>({
  selectId: markup => markup.searchText,
});

const markupsSlice = createSlice({
  name: 'markups',
  initialState: markupsAdapter.getInitialState({
    selectedMarkupId: '',
  }),
  reducers: {
    removeAllMarkups: markupsAdapter.removeAll,
    removeMarkup: markupsAdapter.removeOne,
    removeMarkups: markupsAdapter.removeMany,
    setMarkup: markupsAdapter.setOne,
    setMarkups: markupsAdapter.setMany,
    setSelectedMarkupId(state, { payload }: PayloadAction<string>) {
      state.selectedMarkupId = payload;
    },
  },
});

const addMarkup =
  ({ searchText, ...rest }: Markup): AppThunk =>
  (dispatch, getState) => {
    const activeNoteId = selectActiveNoteId(getState());
    const activeNote = selectNoteById(activeNoteId);

    activeNote && updateNote(activeNote);
  };

export const {
  removeAllMarkups,
  removeMarkup,
  removeMarkups,
  setMarkup,
  setMarkups,
} = markupsSlice.actions;

export type { Markup };
export default markupsSlice.reducer;
