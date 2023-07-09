import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { Alert, View } from 'react-native';
import BaseWebView, { WebViewMessageEvent } from 'react-native-webview';

import { selectActiveNoteId, selectNoteById } from '../../store/selectors';
import { ColorCallback } from '../../components/palettes/ColorPalette';
import { highlight2Colors, shadeColors } from '../../constants';
import { listener, initInject } from './webviewUtils';
import { useAppSelector } from '../../hooks/useRedux';
import { MarkupScreenProps } from '../../navigation';
import { useTheme } from 'styled-components/native';
import { ColorPalette } from '../../components';
import { hScale } from '../../theme/themeUtils';

type Props = {} & MarkupScreenProps;

type MenuSelectionCallback =
  | ((event: {
      nativeEvent: {
        label: string;
        key: string;
        selectedText: string;
      };
    }) => void)
  | undefined;

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
  const content = document.getElementsByTagName("body")[0].innerHTML;
  window.ReactNativeWebView.postMessage(content);
  `;

  const bodyStyle = `
  background-color: ${colors.backgroundPaper};
  color: ${colors.textPrimary};
  font-size: 20px;
  margin: 32px;
`;

  const injected = `document.body.style = ${bodyStyle}`;

  useEffect(() => {
    webview?.injectJavaScript(listener);
  }, []);

  const clearSelection = () =>
    webviewRef.current?.postMessage(JSON.stringify({ what: 'clearSelection' }));

  const handlePressShade: ColorCallback = ({ bg }) => {
    webview?.injectJavaScript(getWebViewContent);
  };

  const handlePressHighlight: ColorCallback = ({ bg, fg }) => {
    const message = JSON.stringify({
      // target: 'webview',
      action: 'globalHighlight',
      args: { colors: { bg, fg } },
    });
    webview?.postMessage(message);
  };

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    Alert.alert('Message received from JS: ', data);
    // console.log(data);
    // const { content } = JSON.parse(data);
    // console.log(content);
  };

  return (
    <>
      <MarkupScreenContainer>
        <WebView
          ref={webviewRef}
          source={{ html: initInject(content, bodyStyle) }}
          automaticallyAdjustContentInsets={false}
          menuItems={[]}
          injectedJavaScript={injected}
          // injectedJavaScriptBeforeContentLoaded={listener}
          onMessage={handleMessage}
        />
        <ColorPalette
          colors={highlight2Colors}
          onPressColor={handlePressHighlight}
          positioning={{
            quadrant: 1,
            offsetX: 8,
          }}
        />
        <ColorPalette
          colors={shadeColors}
          onPressColor={handlePressShade}
          positioning={{ isRichToolbar: true, quadrant: 3 }}
          row
        />
      </MarkupScreenContainer>
    </>
  );
};

export default MarkupScreen;
