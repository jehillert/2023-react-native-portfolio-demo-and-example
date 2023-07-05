import { RootState } from '../store';

const selectThemeId = (state: RootState) => state.settings.themeId;

const selectToolbarActions = (state: RootState) =>
  state.settings.toolbarActions;

export { selectThemeId, selectToolbarActions };
