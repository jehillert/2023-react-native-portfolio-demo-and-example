// redux-toolkit.js.org/api/createEntityAdapter#selectid
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import { CSSProperties } from 'react';
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  MarkupTag,
  SearchConfig,
} from '../../screens/MarkupScreen/markupTypes';

type Markup = {
  id?: string;
  tag: MarkupTag;
  parentNoteId?: string;
  searchConfig: SearchConfig;
  searchText: string;
  styles: CSSProperties;
};

export const markupsAdapter = createEntityAdapter<Markup>({
  selectId: ({ id, searchText }) => (id ? id : searchText),
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

export const {
  removeAllMarkups,
  removeMarkup,
  removeMarkups,
  setMarkup,
  setMarkups,
} = markupsSlice.actions;

export type { Markup };
export default markupsSlice.reducer;
