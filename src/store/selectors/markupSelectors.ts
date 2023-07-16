import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { markupsAdapter } from '../slices';
import { selectActiveMarkupIds } from './notesSelectors';

const markupSelectors = markupsAdapter.getSelectors<RootState>(
  state => state.markups,
);

const { selectAll, selectEntities, selectById, selectIds } = markupSelectors;

const selectSelectedMarkupId = (state: RootState) =>
  state.markups.selectedMarkupId;

const selectMarkupIds = () => selectIds(store.getState());

const selectMarkup = () => selectAll(store.getState());

const selectMarkupById = (id: string) => selectById(store.getState(), id);

const selectActiveMarkups = createSelector(
  selectActiveMarkupIds,
  selectEntities,
  (activeMarkupIds, entities) =>
    activeMarkupIds.map(markupId => entities[markupId]),
);

export {
  selectActiveMarkups,
  selectSelectedMarkupId,
  selectMarkupById,
  selectMarkupIds,
  selectMarkup,
};
