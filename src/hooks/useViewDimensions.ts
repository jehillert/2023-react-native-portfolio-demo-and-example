import { useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useKeyboard } from './useKeyboard';
import { RichEditor } from 'react-native-pell-rich-editor';

export type WatchablePrimitive = boolean | number | string | null | undefined;

type ViewRect = {
  x: number;
  y: number;
  height: number;
  width: number;
};

/**
 * useViewDimensions
 * @description Provides refs to { x, y, width and height } of a View assigned to ref.
 * @prop variant: whether { x, y, width and height } are tracked with a ref (useRef) or state (useState);
 * Unlike state, using refs means x,y, width and height will not trigger rerenders.
 * @prop extraData: array of values that trigger recalculation.  Similar to extraData for FlatList
 * @returns { ref, x, y, width, height }
 */
type Props = {
  extraData?: string | number | null | undefined;
  variant: 'ref' | 'state';
};

const useViewDimensions = (variant = 'ref', watchValues = []) => {
  const ref = useRef<View>(null);
  const initialViewRect = { x: 0, y: 0, width: 0, height: 0 };
  const dimensionsRef = useRef<ViewRect>(initialViewRect);
  const [dimensionsState, setDimensionsState] = useState(initialViewRect);

  const viewRefIsAssigned = ref?.current !== null;
  const keyboardShown = useKeyboard();

  useLayoutEffect(() => {
    ref?.current?.measureInWindow((x, y, width, height) => {
      if (variant === 'ref') {
        dimensionsRef.current = { x, y, width, height };
      } else {
        setDimensionsState({ x, y, width, height });
      }
    });
  }, [keyboardShown, viewRefIsAssigned, ...watchValues]);

  return [ref, variant === 'ref' ? dimensionsRef.current : dimensionsState];
};

export { useViewDimensions };
