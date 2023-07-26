import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectThemeId = (state: RootState) => state.settings.themeId;

const selectToolbarActions = (state: RootState) =>
  state.settings.toolbarActions;

const selectSaveUrlContent = (state: RootState) =>
  state.settings.saveUrlContent;

const selectShowCardAccordions = (state: RootState) =>
  state.settings.showCardAccordions;

const selectMarkupUI = (state: RootState) => state.settings.MarkupUI;

const selectShowCopy = createSelector(
  selectMarkupUI,
  markupUI => markupUI.showCopy,
);

const selectShowParaJumper = createSelector(
  selectMarkupUI,
  markupUI => markupUI.showParaJumper,
);

const selectShowEraseMarkup = createSelector(
  selectMarkupUI,
  markupUI => markupUI.showEraseMarkup,
);

const selectShowEraseMarkups = createSelector(
  selectMarkupUI,
  markupUI => markupUI.showEraseMarkups,
);

const selectShowInlineComment = createSelector(
  selectMarkupUI,
  markupUI => markupUI.showInlineComment,
);

export {
  selectSaveUrlContent,
  selectShowCardAccordions,
  selectShowCopy,
  selectShowEraseMarkup,
  selectShowEraseMarkups,
  selectShowInlineComment,
  selectShowParaJumper,
  selectThemeId,
  selectToolbarActions,
};
