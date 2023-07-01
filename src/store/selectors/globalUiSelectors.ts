import { RootState } from '../store';

const selectInitialUrl = (state: RootState) => state.globalUi.initialUrl;

const selectLeftDrawerOpen = (state: RootState) =>
  state.globalUi.leftDrawerOpen;

const selectRightDrawerOpen = (state: RootState) =>
  state.globalUi.rightDrawerOpen;

export { selectInitialUrl, selectLeftDrawerOpen, selectRightDrawerOpen };
