import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import { reactotronRedux } from 'reactotron-redux';
import { storage } from './src/store/store';

const reactotron = Reactotron.configure()
  .use(mmkvPlugin({ storage }))
  .use(reactotronRedux())
  .connect();

export default reactotron;
