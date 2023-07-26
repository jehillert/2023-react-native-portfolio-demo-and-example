import { EntityId, createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Clipboard, clipboardsAdapter } from '../slices/clipboardsSlice';

const clipboardsSelectors = clipboardsAdapter.getSelectors<RootState>(
  state => state.clipboards,
);

const { selectAll, selectEntities, selectById, selectIds, selectTotal } =
  clipboardsSelectors;

const selectClipboardIds = () => selectIds(store.getState());

const selectUntitledClipboardCount = (state: RootState) =>
  state.clipboards.untitledClipboardCount;

const selectClipboardById = (id: EntityId) => selectById(store.getState(), id);

const selectSortedClipboards = createSelector(
  selectIds,
  selectAll,
  (clipboardIds, clipboards) => {
    return clipboardIds.length
      ? (clipboardIds.map(id =>
          clipboards.find(clipboard => clipboard.clipboardId === id),
        ) as Clipboard[])
      : [];
  },
);

export {
  selectEntities as selectClipboards,
  selectClipboardById,
  selectClipboardIds,
  selectSortedClipboards,
  selectUntitledClipboardCount,
};
