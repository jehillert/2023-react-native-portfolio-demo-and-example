import { EntityId, createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Webpage, webpagesAdapter } from '../slices/webpagesSlice';

const webpagesSelectors = webpagesAdapter.getSelectors<RootState>(
  state => state.webpages,
);

const { selectAll, selectEntities, selectById, selectIds, selectTotal } =
  webpagesSelectors;

const selectActiveWebpageId = (state: RootState) =>
  state.webpages.activeWebpageId;

const selectWebpageIds = () => selectIds(store.getState());

const selectWebpages = () => selectAll(store.getState());

const selectUntitledWebpageCount = (state: RootState) =>
  state.webpages.untitledWebpageCount;

const selectWebpageById = (id: EntityId) => selectById(store.getState(), id);

const selectActiveWebpage = createSelector(
  selectActiveWebpageId,
  selectEntities,
  (activeWebpageId, entities) => entities[activeWebpageId],
);

const selectSortedWebpages = createSelector(
  selectIds,
  selectAll,
  (webpageIds, webpages) => {
    return webpageIds.length
      ? (webpageIds.map((webpageId: EntityId) =>
          webpages.find(webpage => webpage.webpageId === webpageId),
        ) as Webpage[])
      : [];
  },
);

const selectActiveWebpageMarkupIds = createSelector(
  selectActiveWebpage,
  activeWebpage => activeWebpage?.markups ?? [],
);

export {
  selectActiveWebpageMarkupIds,
  selectActiveWebpage,
  selectActiveWebpageId,
  selectWebpageById,
  selectWebpageIds,
  selectWebpages,
  selectSortedWebpages,
  selectUntitledWebpageCount,
};
