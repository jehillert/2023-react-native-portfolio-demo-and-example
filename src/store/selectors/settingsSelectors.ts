import { RootState } from '../store';

const setThemeId = (state: RootState) => state.settings.themeId;

const setToolbarActions = (state: RootState) => state.settings.toolbarActions;

export { setThemeId, setToolbarActions };
