import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { Alert, View } from 'react-native';
import BaseWebView, { WebViewMessageEvent } from 'react-native-webview';

import { selectActiveNoteId, selectNoteById } from '../../store/selectors';
import { ColorCallback } from '../../components/palettes/ColorPalette';
import { highlight2Colors, shadeColors } from '../../constants';
import { initInject, markupGlobally } from './markupUtils';
import { useAppSelector } from '../../hooks/useRedux';
import { MarkupScreenProps } from '../../navigation';
import { useTheme } from 'styled-components/native';
import { ColorPalette } from '../../components';
import { hScale } from '../../theme/themeUtils';
import { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';

type Props = {} & MarkupScreenProps;

const MarkupScreenContainer = styled(View)<{}>`
  flex: 1;
`;

const WebView = styled(BaseWebView)`
  flex: 1;
  padding-right: ${hScale(32)}px;
`;

const MarkupScreen = ({}: Props) => {
  const { colors } = useTheme();
  const activeNoteId = useAppSelector(selectActiveNoteId);
  const activeNote = useAppSelector(() => selectNoteById(activeNoteId));
  const content = activeNote?.content ?? '';
  const webviewRef = useRef<BaseWebView>(null);
  const webview = webviewRef.current;

  const getWebViewContent = `
  (function() {
    const content = document.getElementsByTagName("body")[0].innerHTML;
    window.ReactNativeWebView.postMessage(JSON.stringify(content));
  })()`;

  const bodyStyle = `
  background-color: ${colors.backgroundPaper};
  color: ${colors.textPrimary};
  font-size: 20px;
  margin: 32px;
`;

  const handleColorPress: ColorCallback = props => {
    webviewRef.current?.injectJavaScript(markupGlobally(props));
  };

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    Alert.alert('Message received from JS: ', data);
  };

  return (
    <MarkupScreenContainer>
      <WebView
        ref={webviewRef}
        source={{ html: initInject(content, bodyStyle) }}
        automaticallyAdjustContentInsets={false}
        menuItems={[]}
        onLoadEnd={() => console.log('onLoadEnd')}
        onMessage={handleMessage}
        onError={(event: WebViewErrorEvent) => {
          const { code, description, domain } = event.nativeEvent;
          console.log(`code: ${code}`);
          console.log(`description: ${description}`);
          console.log(`domain: ${domain}`);
        }}
      />
      <ColorPalette
        colors={highlight2Colors}
        onPressColor={handleColorPress}
        positioning={{
          quadrant: 1,
          offsetX: 8,
        }}
      />
      <ColorPalette
        colors={shadeColors}
        onPressColor={handleColorPress}
        positioning={{ isRichToolbar: true, quadrant: 3 }}
        row
      />
    </MarkupScreenContainer>
  );
};

export default MarkupScreen;
