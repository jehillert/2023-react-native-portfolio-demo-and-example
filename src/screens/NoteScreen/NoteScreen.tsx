// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { Text as RNText, ColorValue, StyleProp, ViewStyle } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import { selectActiveNoteId, selectNoteById } from '../../store/selectors';
import { useTheme } from 'styled-components/native';
import { NoteScreenProps } from '../../navigation';
import { updateNote } from '../../store/slices';
import { isAndroid } from '../../constants';
import { getTime } from 'date-fns';
import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useKeyboard,
} from '../../hooks';

type Props = {} & NoteScreenProps;

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = (props: Props) => {
  const { colors } = useTheme();
  const { keyboardHeight } = useKeyboard();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const activeNote = useAppSelector(() => selectNoteById(activeNoteId));
  const savedContent = activeNote?.content ?? '';
  const contentRef = useRef(savedContent);
  const editorRef = useRef<RichEditor>(null);
  const editor = editorRef.current;
  let content = contentRef?.current;

  const contentStyle = {
    backgroundColor: colors.backgroundPaper,
    color: colors.textPrimary,
    caretColor: colors.textPrimary,
    placeholderColor: colors.textSecondary,
  };

  const kbAwareSVStyles: StyleProp<ViewStyle> = {
    position: 'absolute',
    height: isAndroid ? '100%' : undefined,
    width: '100%',
    top: 0,
    bottom: keyboardHeight,
  };

  const debouncedRequest = useDebounce(() =>
    dispatch(
      updateNote({
        id: activeNoteId,
        content: content,
        dateUpdated: getTime(new Date()),
        markups: [],
      }),
    ),
  );

  useEffect(() => {
    console.log(savedContent);
  }, [savedContent]);

  useEffect(() => {
    if (editorRef?.current) {
      isFocused && editor?.focusContentEditor;
      !isFocused && editorRef?.current?.blurContentEditor;
    }
  }, [isFocused]);

  const handleContentChange = (html: string) => {
    content = html;
    debouncedRequest();
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
        <RichEditor
          ref={editorRef}
          useContainer={false}
          onChange={handleContentChange}
          initialContentHTML={savedContent}
          editorStyle={contentStyle}
          initialFocus
        />
        {!!editorRef?.current?.isKeyboardOpen && (
          <RichToolbar
            editor={editorRef}
            actions={[
              actions.insertImage,
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.outdent,
              actions.indent,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.blockquote,
              actions.checkboxList,
              actions.heading1,
            ]}
            iconMap={{ [actions.heading1]: handleHead }}
          />
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

export default NoteScreen;
