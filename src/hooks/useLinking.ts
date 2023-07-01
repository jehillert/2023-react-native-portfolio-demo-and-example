import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useAppDispatch, useAppSelector } from './useRedux';
import { selectInitialUrl } from '../store/selectors';
import { setInitialUrl } from '../store/slices';

// not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
const useLinking = () => {
  useEffect(() => {
    const handleOpenURL = async (event: { url: string }) => {
      const url = event.url;
      console.log(`🔥🔥🔥🔥\n${url}\n🔥🔥🔥🔥`);
    };

    Linking.addEventListener('url', handleOpenURL);

    return () => Linking.removeAllListeners('url');
  }, []);
};

// not gonna work until you add android assetLinks.json (https://medium.com/@ertemishakk/deep-linking-with-react-native-c7fbaac25127)
const useInitialURL = () => {
  const dispatch = useAppDispatch();
  const initialUrl = useAppSelector(selectInitialUrl);

  useEffect(() => {
    initialUrl && console.log(`🔥🔥🔥🔥\ninitialUrl: ${initialUrl}\n🔥🔥🔥🔥`);
  }, [initialUrl]);

  useEffect(() => {
    const getUrlAsync = async () => {
      const url = await Linking.getInitialURL().catch(err =>
        console.error('An error occurred', err),
      );
      initialUrl && console.log(`🔥🔥🔥🔥\nurl: ${url}\n🔥🔥🔥🔥`);
      !!url && dispatch(setInitialUrl(url));
    };

    getUrlAsync();
  }, []);
};

export { useLinking, useInitialURL };
