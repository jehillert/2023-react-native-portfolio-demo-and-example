// jest.mock('react-native-code-push', () => {
//   const cp = (_: any) => (app: any) => app;
//   Object.assign(cp, {
//     InstallMode: {},
//     CheckFrequency: {},
//     SyncStatus: {},
//     UpdateState: {},
//     DeploymentStatus: {},
//     DEFAULT_UPDATE_DIALOG: {},

//     checkForUpdate: jest.fn(),
//     codePushify: jest.fn(),
//     getConfiguration: jest.fn(),
//     getCurrentPackage: jest.fn(),
//     getUpdateMetadata: jest.fn(),
//     log: jest.fn(),
//     notifyAppReady: jest.fn(),
//     notifyApplicationReady: jest.fn(),
//     sync: jest.fn(),
//   });
//   return cp;
// });
/*
const codePush = {
  InstallMode: {ON_NEXT_RESTART: 'ON_APP_RESTART'},
  CheckFrequency: {ON_APP_RESUME: 'ON_APP_RESUME'}
};

const cb = _ => app => app;
Object.assign(cb, codePush);
export default cb;


// index.js On my index.js file, I have:

import codePush from 'react-native-code-push';
import MyApp from './src/'

const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

export default codePush(codePushOptions)(MyApp);
*/

// jest.mock('react-native-code-push', () => {
//   return jest.fn(() => ({
//     InstallMode: {},
//     CheckFrequency: {},
//     CodePushComponent: jest.fn(),
//     codePushify: jest.fn(),
//   }));
// });

const cp = _ => app => app;

Object.assign(cp, {
  getUpdateMetadata: () => Promise.resolve(null),
  InstallMode: {},
  CheckFrequency: {},
  CodePushComponent: jest.fn(),
  codePushify: jest.fn(),
});

export default cp;
