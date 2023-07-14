import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Markup, markupsAdapter } from '../slices';

const markupSelectors = markupsAdapter.getSelectors<RootState>(
  state => state.markups,
);

const { selectAll, selectEntities, selectById, selectIds } = markupSelectors;

const selectSelectedMarkupId = (state: RootState) =>
  state.markups.selectedMarkupId;

const selectMarkupIds = () => selectIds(store.getState());

const selectMarkup = () => selectAll(store.getState());

const selectMarkupById = (id: string) => selectById(store.getState(), id);

export {
  selectSelectedMarkupId,
  selectEntities,
  selectMarkupById,
  selectMarkupIds,
  selectMarkup,
};
