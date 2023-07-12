import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { useEffect, useState } from 'react';

export type ShareFile = {
  filePath?: string;
  text?: string;
  weblink?: string;
  mimeType?: string;
  contentUri?: string;
  fileName?: string;
  extension?: string;
};

const useShare = () => {
  const [share, setShare] = useState<ShareFile[] | undefined>(undefined);

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: ShareFile[]) => {
        // files returns as JSON Array example
        //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
        console.log('Received Files', files);
        setShare(files);
      },
      (error: Error) => {
        console.log(error);
      },
      'org.reactjs.native.example.jnotes',
    );
  }, []);

  return share;
};

export { useShare };
