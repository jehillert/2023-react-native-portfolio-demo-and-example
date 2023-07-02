// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text as RNText, ColorValue, StyleProp, ViewStyle } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  rightDrawerOpened,
  leftDrawerOpened,
  updateNote,
} from '../store/slices';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { DrawerLeft, DrawerRight } from '../comp.drawers';
import { isAndroid } from '../constants';
import { useDebounce, useKeyboard } from '../hooks';
import { selectActiveNoteId, selectNoteById } from '../store/selectors';
import { FloatingActionGroup as DrawerFab } from '../comp.utility';
import { CircledDoubleArrows } from '../assets';
import { Fab } from '../comp.common';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const keyboardHeight = useKeyboard().keyboardHeight;

  const activeNoteId = useAppSelector(selectActiveNoteId);
  const activeNote = useAppSelector(() => selectNoteById(activeNoteId));
  const savedContent = activeNote?.content ?? '';
  const contentRef = useRef(savedContent);
  const editorRef = useRef<RichEditor>(null);

  let content = contentRef?.current;

  const kbAwareSVStyles: StyleProp<ViewStyle> = {
    position: 'absolute',
    height: isAndroid ? '100%' : undefined,
    width: '100%',
    top: 0,
    bottom: keyboardHeight,
  };

  useEffect(() => {
    console.log(savedContent);
  }, [savedContent]);

  const debouncedRequest = useDebounce(() =>
    dispatch(updateNote({ id: activeNoteId, content: content })),
  );

  useEffect(() => {
    if (editorRef?.current) {
      isFocused && editorRef.current.focusContentEditor;
      !isFocused && editorRef?.current?.blurContentEditor;
    }
  }, [isFocused]);

  const handleContentChange = (html: string) => {
    content = html;
    debouncedRequest();
  };

  const handleFabPress = () => dispatch(rightDrawerOpened(true));

  const handleLongPress = () => dispatch(leftDrawerOpened(true));

  return (
    <>
      <DrawerLeft>
        <DrawerRight>
          <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
            <RichEditor
              ref={editorRef}
              initialFocus
              onChange={handleContentChange}
              useContainer={false}
              initialContentHTML={savedContent}
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
            <Fab
              onPress={handleFabPress}
              onLongPress={handleLongPress}
              quadrant={2}
              isRichToolbar
              Icon={CircledDoubleArrows}
            />
          </KeyboardAwareScrollView>
        </DrawerRight>
      </DrawerLeft>
    </>
  );
};

export default NoteScreen;
