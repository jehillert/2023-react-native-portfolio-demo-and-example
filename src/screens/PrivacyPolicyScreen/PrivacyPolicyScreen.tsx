import React from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { styled } from 'styled-components';

const ScreenContainer = styled(View)<{}>`
  flex: 1;
`;

const PrivacyPolicyScreen = () => {
  return (
    <ScreenContainer>
      <WebView
        source={{ uri: 'https://www.iubenda.com/privacy-policy/17152811' }}
        style={{ width: '100%', height: '100%' }}
        onShouldStartLoadWithRequest={event => {
          console.log('onShouldStartLoadWithRequest', event);
          return true;
        }}
        onLoadStart={event => {
          console.log('onLoadStart', event.nativeEvent);
        }}
      />
    </ScreenContainer>
  );
};

export default PrivacyPolicyScreen;
