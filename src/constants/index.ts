import { Dimensions, Platform } from 'react-native';
import { Note } from '../store/slices';

/*
Height x Width
================================
iPhone 14 Pro Max     932 x 430
Pixel 3 XL            919 x 484 (rounded)
*/
const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const richToolbarHeight = 44;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const emptyNote: Note = {
  content: '',
  title: '',
};

export {
  emptyNote,
  isAndroid,
  isIos,
  richToolbarHeight,
  windowWidth,
  windowHeight,
};
