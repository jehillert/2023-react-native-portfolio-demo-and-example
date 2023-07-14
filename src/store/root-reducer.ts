import { combineReducers } from '@reduxjs/toolkit';
import {
  globalUiReducer,
  markupsReducer,
  notesReducer,
  settingsReducer,
} from './slices';

const rootReducer = combineReducers({
  markups: markupsReducer,
  notes: notesReducer,
  settings: settingsReducer,
  globalUi: globalUiReducer,
});

export default rootReducer;
