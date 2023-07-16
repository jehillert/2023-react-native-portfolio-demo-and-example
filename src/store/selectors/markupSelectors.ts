import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Markup, markupsAdapter } from '../slices';
import { selectActiveMarkupIds, selectActiveNote } from './notesSelectors';
import { jogger } from '../../utils/jogger';

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
  selectAll,
  (activeMarkupIds, markups) => {
    jogger.orange(JSON.stringify(activeMarkupIds, undefined, 2));
    return activeMarkupIds.map(markupId =>
      markups.find(markup => markup.id === markupId),
    );
  },
);

export {
  selectActiveMarkups,
  selectSelectedMarkupId,
  selectMarkupById,
  selectMarkupIds,
  selectMarkup,
};
