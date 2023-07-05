// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import {
  Text as RNText,
  ColorValue,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import DrawerRight from './DrawerRight';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useDebounce, useKeyboard } from '../../hooks';
import { highlight2Colors, isAndroid, shadeColors } from '../../constants';
import {
  selectActiveNoteId,
  selectNoteById,
  selectThemeId,
} from '../../store/selectors';
import { updateNote } from '../../store/slices';
import { useTheme } from 'styled-components/native';
import ColorPalette, {
  ColorCallback,
} from '../../components/palettes/ColorPalette';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const activeNote = useAppSelector(() => selectNoteById(activeNoteId));
  const themeId = useAppSelector(selectThemeId);
  //-webkit-touch-callout: none;
  /*
document.body.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
document.body.style.webkitLineClamp = 'none';
document.body.style.userSelect = 'none';

editor?.commandDOM(
  `$('body').style.webkitTapHighlightColor='rgba(0, 0, 0, 0)'`,
);
editor?.commandDOM(`$('body').style.webkitLineClamp='none'`);
editor?.commandDOM(`$('body').style.userSelect='none'`);
*/
  // editor?.commandDOM(`$('body').style.webkitTouchCallout='none'`);
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

  useEffect(() => {
    console.log(savedContent);
  }, [savedContent]);

  // useLayoutEffect(() => {
  //   editor?.dismissKeyboard();
  // }, [keyboardShown]);

  const debouncedRequest = useDebounce(() =>
    dispatch(updateNote({ id: activeNoteId, content: content })),
  );

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

  const handlePressShade: ColorCallback = ({ bg }) => {
    editor?.setHiliteColor(bg);
    if (themeId === 'dark') {
      editor?.setForeColor(colors.commonBlack);
    }
  };

  const handlePressHighlight: ColorCallback = ({ bg, fg }) => {
    fg && editor?.setForeColor(fg);
    editor?.setHiliteColor(bg);
  };

  return (
    <>
      <DrawerRight>
        <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
          <RichEditor
            ref={editorRef}
            useContainer={false}
            onChange={handleContentChange}
            initialContentHTML={savedContent}
            editorStyle={contentStyle}
            disabled
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
