// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useCallback, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Text as RNText,
  ColorValue,
  StyleProp,
  ViewStyle,
  Button,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { useKeyboard } from '../hooks';
import { emptyNote, isAndroid } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { FAB } from '../comp.common';
import { DrawerLeft, DrawerRight } from '../comp.drawers';
import { rightDrawerOpened, leftDrawerOpened } from '../store/slices';
import {
  selectActiveNoteId,
  selectLeftDrawerOpen,
  selectNoteById,
  selectRightDrawerOpen,
} from '../store/selectors';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const openRight = useAppSelector(selectRightDrawerOpen);
  const openLeft = useAppSelector(selectLeftDrawerOpen);
  const activeNote = activeNoteId ? selectNoteById(activeNoteId) : emptyNote;
  const richText = useRef<RichEditor>(null);
  const contentRef = useRef('');
  const isFocused = useIsFocused();
  const { keyboardHeight } = useKeyboard();
  const kbAwareSVStyles: StyleProp<ViewStyle> = {
    position: 'absolute',
    height: isAndroid ? '100%' : undefined,
    width: '100%',
    top: 0,
    bottom: keyboardHeight,
  };

  useEffect(() => {
    if (richText?.current) {
      isFocused && richText.current.focusContentEditor;
      !isFocused && richText?.current?.blurContentEditor;
    }
  }, [isFocused]);

  const handleEditorContentChange = (descriptionText: string) => {
    console.log('descriptionText:', descriptionText);
  };

  const handleContentChange = useCallback((html: string) => {
    contentRef.current = html;
  }, []);

  const handleOpenRight = () => dispatch(rightDrawerOpened(true));

  const handleOpenLeft = () => dispatch(leftDrawerOpened(true));

  const handleSave = () => {};

  const handleFabPress = () => {};

  return (
    <>
      <DrawerLeft>
        <DrawerRight>
          <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
            <Button title="save" onPress={handleSave} />
            <RichEditor
              ref={richText}
              initialFocus
              onChange={handleEditorContentChange}
              useContainer={false}
            />
            {!!richText?.current?.isKeyboardOpen && (
              <RichToolbar
                editor={richText}
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
            <FAB onPress={handleFabPress} quadrant={2} isRichToolbar />
          </KeyboardAwareScrollView>
        </DrawerRight>
      </DrawerLeft>
    </>
  );
};

export default NoteScreen;
