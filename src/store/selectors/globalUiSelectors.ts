import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DrawerId } from '../slices';

const selectInitialUrl = (state: RootState) => state.globalUi.initialUrl;

const selectDrawerState = (state: RootState) => state.globalUi.drawerState;

const selectDrawer = (state: RootState, drawerId: DrawerId) => drawerId;

const selectDrawerStateById = createSelector(
  [selectDrawerState, selectDrawer],
  (drawerState, drawerId) => drawerState[drawerId] ?? false,
);

export { selectInitialUrl, selectDrawerState, selectDrawerStateById };
