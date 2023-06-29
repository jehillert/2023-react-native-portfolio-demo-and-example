import { Dimensions, Platform } from 'react-native';
import { Note } from '../store/slices';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const emptyNote: Note = {
  content: '',
  title: '',
};

export { emptyNote, isAndroid, isIos, windowWidth, windowHeight };
