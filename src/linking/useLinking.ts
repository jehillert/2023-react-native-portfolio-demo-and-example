import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

// not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
const useLinking = () => {
  useEffect(() => {
    const handleOpenURL = async (event: { url: string }) => {
      const url = event.url;
      console.log(`🔵🔵🔵🔵\n${url}\n🔵🔵🔵🔵`);
    };

    Linking.addEventListener('url', handleOpenURL);

    return () => Linking.removeAllListeners('url');
  }, []);
};

const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
};

export { useInitialURL, useLinking };
