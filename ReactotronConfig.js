import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import { reactotronRedux } from 'reactotron-redux';
import { storage } from './src/store/store';

const reactotron = Reactotron.configure({
  host: 'http:/localhost:8081', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
  name: 'JNotes',
})
  .use(reactotronRedux())
  .use(mmkvPlugin({ storage }))
  .useReactNative()
  .connect();

export default reactotron;
