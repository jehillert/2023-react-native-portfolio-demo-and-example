import { combineReducers } from '@reduxjs/toolkit';
import { globalUiReducer, notesReducer, settingsReducer } from './slices';

const rootReducer = combineReducers({
  globalUi: globalUiReducer,
  notes: notesReducer,
  settings: settingsReducer,
});

export default rootReducer;
