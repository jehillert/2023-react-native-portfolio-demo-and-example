import React, { useEffect, useRef } from 'react';
import BaseWebView, { WebViewMessageEvent } from 'react-native-webview';
import { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import { Alert, View } from 'react-native';
import { styled } from 'styled-components';

import {
  selectActiveNote,
  selectActiveNoteId,
  selectNoteById,
} from '../../store/selectors';
import { ColorCallback } from '../../components/palettes/ColorPalette';
import { highlight2Colors, shadeColors } from '../../constants';
import { initInject, markupGlobally } from './markupUtils';
import { MarkupScreenProps } from '../../navigation';
import { useTheme } from 'styled-components/native';
import { ColorPalette } from '../../components';
import { hScale } from '../../theme/themeUtils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setMarkup } from '../../store/slices';
import { MarkupTag } from './markupTypes';
import { useIsFocused } from '@react-navigation/native';
import { selectActiveMarkups } from '../../store/selectors/markupSelectors';

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
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const activeMarkups = useAppSelector(selectActiveMarkups);
  const activeNote = useAppSelector(selectActiveNote);
  const content = activeNote?.content ?? '';
  const webviewRef = useRef<BaseWebView>(null);

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

  useEffect(() => {
    if (isFocused) {
      console.log(
        'The active NOTE:',
        JSON.stringify(activeMarkups, undefined, 2),
      );
    }
  }, [isFocused]);

  const handleColorPress =
    (tag: MarkupTag): ColorCallback =>
    styles => {
      webviewRef.current?.injectJavaScript(markupGlobally({ tag, styles }));
    };

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    dispatch(setMarkup(JSON.parse(data)));
    console.log(JSON.stringify(JSON.parse(data), undefined, 2));
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
        onPressColor={handleColorPress('global-highlight')}
        positioning={{
          quadrant: 1,
          offsetX: 8,
        }}
      />
      <ColorPalette
        colors={shadeColors}
        onPressColor={handleColorPress('shade')}
        positioning={{ isRichToolbar: true, quadrant: 3 }}
        row
      />
    </MarkupScreenContainer>
  );
};

export default MarkupScreen;
