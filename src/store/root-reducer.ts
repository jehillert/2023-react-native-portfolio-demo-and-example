import { combineReducers } from '@reduxjs/toolkit';
import {
  clipboardsReducer,
  globalUiReducer,
  markupsReducer,
  notesReducer,
  projectsReducer,
  settingsReducer,
  webpagesReducer,
} from './slices';

const rootReducer = combineReducers({
  projects: projectsReducer,
  webpages: webpagesReducer,
  markups: markupsReducer,
  clipboards: clipboardsReducer,
  notes: notesReducer,
  settings: settingsReducer,
  globalUi: globalUiReducer,
});

export default rootReducer;
