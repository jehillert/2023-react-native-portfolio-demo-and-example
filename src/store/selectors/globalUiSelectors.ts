import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DrawerId } from '../slices/globalUiSlice';

const selectInitialUrl = (state: RootState) => state.globalUi.initialUrl;

const selectDrawerState = (state: RootState) => state.globalUi.drawerState;

const selectDrawer = (state: RootState, drawerId: DrawerId) => drawerId;

const selectHeaderHeight = (state: RootState) => state.globalUi.headerHeight;

const selectDrawerStateById = createSelector(
  [selectDrawerState, selectDrawer],
  (drawerState, drawerId) => drawerState[drawerId] ?? false,
);

export {
  selectHeaderHeight,
  selectInitialUrl,
  selectDrawerState,
  selectDrawerStateById,
};
