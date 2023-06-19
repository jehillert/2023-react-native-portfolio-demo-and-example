import { Dimensions, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export { isAndroid, isIos, windowWidth, windowHeight };
