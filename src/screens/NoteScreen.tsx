// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/
import React, { useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text as RNText, ColorValue, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useKeyboard } from '../hooks';
import { Text } from '../components';
import { isAndroid } from '../constants';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const richText = useRef<RichEditor>(null);
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

  return (
    <KeyboardAwareScrollView contentContainerStyle={kbAwareSVStyles}>
      <Text.H6>Description:</Text.H6>
      <RichEditor
        ref={richText}
        onChange={descriptionText => {
          console.log('descriptionText:', descriptionText);
        }}
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
    </KeyboardAwareScrollView>
  );
};

export default NoteScreen;
