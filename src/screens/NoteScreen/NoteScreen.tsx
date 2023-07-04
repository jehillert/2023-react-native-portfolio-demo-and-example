// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useCallback, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import {
  Keyboard,
  Text as RNText,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import ColorPalette, {
  ColorCallback,
} from '../../components/palettes/ColorPalette';
import DrawerRight from './DrawerRight';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useDebounce, useKeyboard } from '../../hooks';
import {
  fontColors,
  highlight2Colors,
  highlightColors,
  isAndroid,
  shadeColors,
} from '../../constants';
import {
  selectActiveNoteId,
  // selectLeftDrawerOpen,
  selectNoteById,
  selectRightDrawerOpen,
} from '../../store/selectors';
import {
  rightDrawerOpened,
  // leftDrawerOpened,
  updateNote,
} from '../../store/slices';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const keyboardHeight = useKeyboard().keyboardHeight;

  const activeNoteId = useAppSelector(selectActiveNoteId);
  const activeNote = useAppSelector(() => selectNoteById(activeNoteId));

  const rightDrawerOpen = useAppSelector(selectRightDrawerOpen);

  // editorRef.current.
  // const showFab = !leftDrawerOpen && !rightDrawerOpen;
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

  const handlePressShade: ColorCallback = ({ bg }) =>
    editorRef.current?.setHiliteColor(bg);

  const handlePressHighlight: ColorCallback = ({ bg, fg }) => {
    fg && editorRef.current?.setForeColor(fg);
    editorRef.current?.setHiliteColor(bg);
  };

  const handleForeColor = useCallback(() => {
    editorRef.current?.setForeColor('blue');
  }, []);

  const handleHaliteColor = useCallback(() => {
    editorRef.current?.setHiliteColor('red');
  }, []);

  return (
    <>
      <DrawerRight>
        <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
          <RichEditor
            ref={editorRef}
            // initialFocus
            useContainer={false}
            onChange={handleContentChange}
            initialContentHTML={savedContent}
          />
          {!!editorRef?.current?.isKeyboardOpen && (
            <RichToolbar
              editor={editorRef}
              actions={[
                actions.foreColor,
                actions.hiliteColor,
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
              foreColor={handleForeColor}
              hiliteColor={handleHaliteColor}
            />
          )}
          <ColorPalette
            colors={highlight2Colors}
            onPressColor={handlePressHighlight}
            positioning={{ quadrant: 1 }}
          />
          <ColorPalette
            colors={shadeColors}
            onPressColor={handlePressShade}
            positioning={{ isRichToolbar: true, quadrant: 3 }}
            row
          />
        </KeyboardAwareScrollView>
      </DrawerRight>
    </>
  );
};

export default NoteScreen;
