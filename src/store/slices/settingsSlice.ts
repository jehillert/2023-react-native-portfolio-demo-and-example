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
  selectedTheme: ThemeSelection;
  toolbarActions: ToolbarAction[];
}

const initialState: ISettings = {
  selectedTheme: 'light',
  toolbarActions: defaultToolbarActions,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSelectedTheme(state, { payload: theme }: PayloadAction<ThemeSelection>) {
      state.selectedTheme = theme;
    },
    setToolbarActions(state, { payload: toolbarActions }: PayloadAction<ToolbarAction[]>) {
      state.toolbarActions = toolbarActions;
    },
  },
});

export const { setSelectedTheme, setToolbarActions } = settingsSlice.actions;
export default settingsSlice.reducer;
