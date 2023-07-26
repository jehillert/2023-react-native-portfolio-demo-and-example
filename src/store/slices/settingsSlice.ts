import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actions as ToolbarAction } from 'react-native-pell-rich-editor';

const defaultToolbarActions: ToolbarAction[] = [
  ToolbarAction.insertImage,
  ToolbarAction.undo,
  ToolbarAction.redo,
  ToolbarAction.setBold,
  ToolbarAction.setItalic,
  ToolbarAction.setUnderline,
  ToolbarAction.outdent,
  ToolbarAction.indent,
  ToolbarAction.alignLeft,
  ToolbarAction.alignCenter,
  ToolbarAction.alignRight,
  ToolbarAction.blockquote,
  ToolbarAction.checkboxList,
  ToolbarAction.heading1,
];

type ThemeSelection = 'light' | 'dark' | 'system';

interface ISettings {
  saveUrlContent: boolean;
  themeId: ThemeSelection;
  toolbarActions: ToolbarAction[];
  showCardAccordions: boolean;
  MarkupUI: {
    showCopy: boolean;
    showParaJumper: boolean;
    showEraseMarkup: boolean;
    showEraseMarkups: boolean;
    showInlineComment: boolean;
  };
}

const initialState: ISettings = {
  showCardAccordions: false,
  themeId: 'system',
  saveUrlContent: false,
  toolbarActions: defaultToolbarActions,
  MarkupUI: {
    showCopy: false,
    showParaJumper: false,
    showEraseMarkup: true,
    showEraseMarkups: true,
    showInlineComment: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeId(state, { payload: themeId }: PayloadAction<ThemeSelection>) {
      state.themeId = themeId;
    },
    setShowCardAccordions(
      state,
      { payload: showCardAccordions }: PayloadAction<boolean>,
    ) {
      state.showCardAccordions = showCardAccordions;
    },
    setToolbarActions(
      state,
      { payload: toolbarActions }: PayloadAction<ToolbarAction[]>,
    ) {
      state.toolbarActions = toolbarActions;
    },
  },
});

export type { ThemeSelection };
export const { setShowCardAccordions, setThemeId, setToolbarActions } =
  settingsSlice.actions;
export default settingsSlice.reducer;
