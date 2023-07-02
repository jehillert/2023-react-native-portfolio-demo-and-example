// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useCallback, useEffect, useRef } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { DrawerLeft, DrawerRight } from '../comp.drawers';
import { highlights, isAndroid, shades } from '../constants';
import { useDebounce, useKeyboard } from '../hooks';
import {
  selectActiveNoteId,
  selectLeftDrawerOpen,
  selectNoteById,
  selectRightDrawerOpen,
} from '../store/selectors';
import {
  FloatingActionGroup as DrawerFab,
  FloatingActionGroup,
} from '../comp.utility';
import { CircledDoubleArrows } from '../assets';
import { Fab } from '../comp.common';
import {
  rightDrawerOpened,
  leftDrawerOpened,
  updateNote,
} from '../store/slices';
import ColorPalette from '../comp.common/ColorPalette';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  /*
   handleUnhandledTouches(){
   Keyboard.dismiss
   return false;
 }

 render(){
    <View style={{ flex: 1 }} onStartShouldSetResponder={this.handleUnhandledTouches}>
       <MyApp>
    </View>
  }
  */

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

  const shadePalette = <ColorPalette colors={shades} />;
  const highlightPalette = <ColorPalette colors={highlights} />;

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
            {showFab && (
              <Fab
                onPress={handleFabPress}
                onLongPress={handleLongPress}
                quadrant={2}
                isRichToolbar
                Icon={CircledDoubleArrows}
              />
            )}
            <FloatingActionGroup quadrant={4}>
              {highlightPalette}
            </FloatingActionGroup>
            <FloatingActionGroup>{shadePalette}</FloatingActionGroup>
          </KeyboardAwareScrollView>
        </DrawerRight>
      </DrawerLeft>
    </>
  );
};

export default NoteScreen;
