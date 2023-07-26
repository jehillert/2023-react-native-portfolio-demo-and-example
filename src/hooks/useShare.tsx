import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { useEffect } from 'react';
import { addClipboard, addWebpage } from '../store/slices';
import { useAppDispatch } from './useRedux';
import { navigate } from '../navigation';
import { ScreenEnum } from '../constants';

export type SharedContent = {
  contentUri?: string | null;
  extension?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  mimeType?: string | null;
  subject?: string | null;
  text?: string | null;
  weblink?: string | null;
};

const useShare = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (incomingContent: SharedContent[]) => {
        const sharedContent = incomingContent[0];
        const subject = sharedContent?.subject ?? '';
        const text = sharedContent?.text ?? '';
        const weblink = sharedContent?.weblink ?? '';

        if (weblink) {
          dispatch(addWebpage({ subject, weblink }));
          navigate(ScreenEnum.MARKUP, {});
        } else if (text) {
          dispatch(addClipboard({ clipboard: text }));
        }
      },
      (error: Error) => {
        console.log(error);
      },
      'org.reactjs.native.example.jnotes',
    );
  }, []);
};

export { useShare };
