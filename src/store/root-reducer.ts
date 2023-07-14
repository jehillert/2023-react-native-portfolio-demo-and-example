import { combineReducers } from '@reduxjs/toolkit';
import {
  globalUiReducer,
  markupsReducer,
  notesReducer,
  settingsReducer,
} from './slices';

const rootReducer = combineReducers({
  globalUi: globalUiReducer,
  markups: markupsReducer,
  notes: notesReducer,
  settings: settingsReducer,
});

export default rootReducer;
