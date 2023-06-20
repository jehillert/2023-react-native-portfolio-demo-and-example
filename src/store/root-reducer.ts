import { combineReducers } from '@reduxjs/toolkit';
import { notesReducer, settingsReducer } from './slices';

const rootReducer = combineReducers({
  notes: notesReducer,
  settings: settingsReducer,
});

export default rootReducer;
