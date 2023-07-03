import { PixelRatio } from 'react-native';
import { windowWidthRoundedDown, windowHeightRoundedDown } from '../constants';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 667;
const hpScale = 100 / DESIGN_WIDTH;
const vpScale = 100 / DESIGN_HEIGHT;

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover along with the percentage symbol (%).
 * @return {number} The calculated dp depending on current device's screen width.
 *
 * NOTE: This is a modified implementation of react-native-responsive-screen.
 * https://github.com/marudy/react-native-responsive-screen/blob/master/index.js
 */
const widthPercentageToDP = (widthPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(
    (windowWidthRoundedDown * elemWidth) / 100,
  );
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 *
 * NOTE: This is a modified implementation of react-native-responsive-screen.
 * https://github.com/marudy/react-native-responsive-screen/blob/master/index.js
 */
const heightPercentageToDP = (heightPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(
    (windowHeightRoundedDown * elemHeight) / 100,
  );
};

/**
 * Scales a given horizontal design dimension (e.g, value from Figma wire frame) to account for differences in device size and pixel density of a user's device. 'Design dimension' refers to a UI dimensional value provided by a wire frame, such as from a Figma or AdobeX design.
 * @param {designSize} The value in pixels of a horizontal design dimension.
 * @return The pixels scaled horizontally to account for differences in pixel ratio and width of the users device relative to model device of the Figma designs.
 */
const hScale = (designSize: number) =>
  widthPercentageToDP(`${designSize * hpScale}%`);

/**
 * Scales a given vertical design dimension to account for differences in device size and pixel density of a user's device.  'Design dimension' refers to a UI dimensional value provided by a wire frame, such as from a Figma or AdobeX design.
 * @param {designSize} The value in pixels of a vertical dimension.
 * @return The pixels scaled vertically to account for differences in pixel ratio and height of the users device relative to model device of the Figma designs.
 */
const vScale = (designSize: number) =>
  heightPercentageToDP(`${designSize * vpScale}%`);

export { hScale, vScale };
