import { useEffect } from 'react';
import codePush from 'react-native-code-push';
import appConfig from '../appConfig';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const useCodePush = () => {
  const { CODEPUSH_ENABLED } = appConfig;

  useEffect(() => {
    CODEPUSH_ENABLED &&
      codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          appendReleaseDescription: false,
          mandatoryUpdateMessage:
            'An update is available and will be installed.',
          mandatoryContinueButtonLabel: 'Continue',
        },
      });
  }, []);
};

export { codePush, codePushOptions, useCodePush };
