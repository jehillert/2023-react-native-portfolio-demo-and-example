import React, { ReactNode, useRef, useState } from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import { TextInput as RNGHTextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { TextPaper } from '../TextPaper';

const ButtonRowView = styled(View)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const ModalContent = styled(View)`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.secondaryContainer};
  border-radius: 16px;
  padding: 16px;
  margin-horizontal: 8px;
  row-gap: 16px;
`;

const TextInput = styled(RNGHTextInput)`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.onPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding-horizontal: 16px;
`;

const TitleText = styled(TextPaper.TitleMedium)``;

type Props = Partial<ModalProps> & {
  children?: ReactNode;
  closeModal: () => void;
  handlePressLeft: () => void;
  handlePressRight: (textInput: string) => void | Promise<void>;
  isVisible: boolean;
  labelLeft?: string;
  labelRight?: string;
  placeholder?: string;
  setIsVisible: (show: boolean) => void;
  style?: StyleProp<ViewStyle>;
  styleModalContent?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<TextStyle>;
  title?: string;
};

const InputModal = ({
  children,
  closeModal,
  handlePressLeft,
  handlePressRight,
  isVisible,
  labelLeft = 'Cancel',
  labelRight = 'Ok',
  placeholder,
  setIsVisible,
  style,
  styleModalContent,
  styleTextInput,
  title,
  ...rest
}: Props) => {
  const [inputValue, setInputValue] = useState(title ?? '');
  const inputRef = useRef<RNGHTextInput>(null);

  return (
    <Modal
      animationIn="slideInDown"
      isVisible={isVisible}
      useNativeDriver={true}
      onShow={() => inputRef.current?.focus()}
      onModalShow={() => inputRef.current?.focus()}
      style={[styles.modal, style]}
      {...rest}>
      <ModalContent style={styleModalContent}>
        <TitleText>{title}</TitleText>
        <TextInput
          ref={inputRef}
          style={styleTextInput}
          onChangeText={text => setInputValue(text)}
          placeholder={placeholder}
        />
        <ButtonRowView>
          <Button onPress={handlePressLeft}>{labelLeft}</Button>
          <Button onPress={() => handlePressRight(inputValue)}>
            {labelRight}
          </Button>
        </ButtonRowView>
      </ModalContent>
    </Modal>
  );
};

export type { Props as InputModalProps };
export default InputModal;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: '25%',
  },
});
