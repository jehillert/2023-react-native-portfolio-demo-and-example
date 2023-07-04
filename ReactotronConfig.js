import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import { storage } from './src/store/store';
import appConfig from './src/appConfig';

const isAsyncStorage = appConfig.STORAGE_TYPE === 'AsyncStorage';

const reactotron = isAsyncStorage
  ? Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure() // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .connect()
  : Reactotron.configure({
      host: 'http:/localhost:8081', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'JNotes',
    })
      .use(reactotronRedux())
      .use(mmkvPlugin({ storage }))
      .useReactNative()
      .connect();

export default reactotron;
