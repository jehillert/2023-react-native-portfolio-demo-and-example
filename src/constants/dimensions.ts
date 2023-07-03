import { Dimensions } from 'react-native';

const richToolbarHeight = 44;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

/**
 * Width of display, rounded down to nearest dimensionless pixel.
 */
const windowWidthRoundedDown = Math.floor(Dimensions.get('window').width);

/**
 * Height of display, rounded down to nearest dimensionless pixel.
 */
const windowHeightRoundedDown = Math.floor(Dimensions.get('window').height);

/**
 * Height of display, rounded down to nearest dimensionless pixel,
 * and calculated using getStatusBarHeight(skipAndroid = true);
 */

const windowAspectRatio = windowWidthRoundedDown / windowHeightRoundedDown;

export {
  windowAspectRatio,
  windowWidth,
  windowHeight,
  windowHeightRoundedDown,
  windowWidthRoundedDown,
  richToolbarHeight,
};
