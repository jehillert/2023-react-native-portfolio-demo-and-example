import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import {
  Text,
  Platform,
  KeyboardAvoidingView as BaseKeyboardAvoidingView,
  SafeAreaView,
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

const EditorScrollView = styled(ScrollView)`
  background-color: yellow;
`;

const EditorContainer = styled(View)`
  background-color: blue;
  height: 100px;
`;

const KeyboardAvoidingView = styled(BaseKeyboardAvoidingView)`
  background-color: lightgreen;
`;

const handleHead = ({ tintColor }: { tintColor: ColorValue }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const NoteScreen = () => {
  const richText = useRef<RichEditor>(null);
  const { keyboardShown } = useKeyboard();
  const [toolbarRef, dimensions] = useViewDimensions();

  useEffect(() => {}, []);

  return (
    <>
      <EditorScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text>Description:</Text>
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
        <View>
          <RichToolbar
            ref={richToolbarRef}
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.indent,
              actions.outdent,
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
