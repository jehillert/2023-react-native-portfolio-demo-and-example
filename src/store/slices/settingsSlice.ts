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
  themeId: ThemeSelection;
  toolbarActions: ToolbarAction[];
}

const initialState: ISettings = {
  themeId: 'light',
  toolbarActions: defaultToolbarActions,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    themeIdSet(state, { payload: theme }: PayloadAction<ThemeSelection>) {
      state.themeId = theme;
    },
    toolbarActionsSet(state, { payload: toolbarActions }: PayloadAction<ToolbarAction[]>) {
      state.toolbarActions = toolbarActions;
    },
  },
});

export const { themeIdSet, toolbarActionsSet } = settingsSlice.actions;
export default settingsSlice.reducer;
