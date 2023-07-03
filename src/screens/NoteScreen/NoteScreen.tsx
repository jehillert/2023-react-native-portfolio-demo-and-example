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

import ColorPalette from '../../components/ColorPalette';
import DrawerRight from './DrawerRight';
import DrawerLeft from './DrawerLeft';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useDebounce, useKeyboard } from '../../hooks';
import { isAndroid, shades } from '../../constants';
import { CircledDoubleArrows } from '../../assets';
import { SvgFab } from '../../components';
import {
  selectActiveNoteId,
  selectLeftDrawerOpen,
  selectNoteById,
  selectRightDrawerOpen,
} from '../../store/selectors';
import {
  rightDrawerOpened,
  leftDrawerOpened,
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
  const leftDrawerOpen = useAppSelector(selectLeftDrawerOpen);
  const rightDrawerOpen = useAppSelector(selectRightDrawerOpen);

  const showFab = !leftDrawerOpen && !rightDrawerOpen;
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

  const handleFabPress = useCallback(() => {
    Keyboard.dismiss();
    dispatch(rightDrawerOpened(true));
  }, [rightDrawerOpen]);

  const handleLongPress = useCallback(() => {
    Keyboard.dismiss();
    dispatch(leftDrawerOpened(true));
  }, [leftDrawerOpen]);

  return (
    <>
      <DrawerLeft>
        <DrawerRight>
          <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
            <RichEditor
              ref={editorRef}
              initialFocus
              useContainer={false}
              onChange={handleContentChange}
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
            <ColorPalette colors={shades} row positioning={{ quadrant: 1 }} />
            {showFab && (
              <SvgFab
                onPress={handleFabPress}
                onLongPress={handleLongPress}
                SvgIcon={CircledDoubleArrows}
                positioning={{ isRichToolbar: true, quadrant: 2 }}
              />
            )}
          </KeyboardAwareScrollView>
        </DrawerRight>
      </DrawerLeft>
    </>
  );
};

export default NoteScreen;
