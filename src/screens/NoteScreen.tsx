import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import {
  Platform,
  KeyboardAvoidingView as BaseKeyboardAvoidingView,
  ScrollView,
  ColorValue,
  StyleSheet,
  View,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import { useKeyboard, useViewDimensions } from '../hooks';
import { Text } from '../components';
import { windowHeight } from '../constants';

const EditorScrollView = styled(ScrollView)<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  background-color: yellow;
`;

const EditorContainer = styled(View)`
  border: 1px blue solid;
  height: 100%;
`;

const KeyboardAvoidingView = styled(BaseKeyboardAvoidingView)<{
  $height: number;
}>`
  height: ${({ $height }) => $height}px;
  background-color: darkgrey;
`;

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <Text.H1 style={{ color: tintColor }}>H1</Text.H1>
);

const NoteScreen = () => {
  const richText = useRef<RichEditor>(null);
  const { keyboardShown, keyboardHeight } = useKeyboard();
  const [toolbarContainerRef, dimensions] = useViewDimensions();
  const { height: toolbarHeight } = dimensions;
  const heightAboveKeyboard = windowHeight - toolbarHeight - keyboardHeight;

  useEffect(() => {}, []);

  return (
    <>
      <EditorScrollView $height={heightAboveKeyboard}>
        <KeyboardAvoidingView
          $height={heightAboveKeyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <Text.H6>Description:</Text.H6>
          </View>
          <EditorContainer>
            <RichEditor
              ref={richText}
              onChange={descriptionText => {
                console.log('descriptionText:', descriptionText);
              }}
              useContainer={false}
            />
          </EditorContainer>
        </KeyboardAvoidingView>
      </EditorScrollView>
      {keyboardShown && (
        <View ref={toolbarContainerRef}>
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
              actions.fontSize,
              actions.foreColor,
              actions.heading1,
            ]}
            iconMap={{ [actions.heading1]: handleHead }}
          />
        </View>
      )}
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  editor: {
    height: 300,
    flex: 1,
  },
});
