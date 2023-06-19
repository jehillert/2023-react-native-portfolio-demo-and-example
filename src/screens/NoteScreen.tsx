// testing
// https://coolsoftware.dev/blog/testing-react-native-webview-with-react-native-testing-library/

import React, { useRef } from 'react';
import { Text as RNText, ColorValue } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useKeyboard } from '../hooks';
import { Text } from '../components';

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <RNText style={{ color: tintColor }}>H1</RNText>
);

const NoteScreen = () => {
  const richText = useRef<RichEditor>(null);
  const { keyboardShown, keyboardHeight } = useKeyboard();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: keyboardHeight,
      }}>
      <Text.H6>Description:</Text.H6>
      <RichEditor
        ref={richText}
        onChange={descriptionText => {
          console.log('descriptionText:', descriptionText);
        }}
        useContainer={false}
      />
      {keyboardShown && (
        <RichToolbar
          editor={richText}
          actions={[
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
