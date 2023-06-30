import { RootState } from '../store';

const selectLeftDrawerOpen = (state: RootState) =>
  state.globalUi.leftDrawerOpen;

const selectRightDrawerOpen = (state: RootState) =>
  state.globalUi.rightDrawerOpen;

export { selectLeftDrawerOpen, selectRightDrawerOpen };
