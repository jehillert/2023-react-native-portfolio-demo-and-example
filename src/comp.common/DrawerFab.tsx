import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircledDoubleArrows } from '../assets';
import { useKeyboard } from '../hooks';
import { richToolbarHeight } from '../constants';

type Quadrant = 1 | 2 | 3 | 4;

type OffsetUnit = '%' | 'px';

/**
 * @prop quadrant - the corner to position the fab
 * @prop offsetX - the horizontal offset from the nearest side (left/right)
 * @prop offsetY - the vertical offset from the nearest side (top/bottom)
 */
type Props = {
  quadrant?: Quadrant;
  isRichToolbar?: boolean;
  offsetX?: number;
  offsetY?: number;
  unitX?: OffsetUnit;
  unitY?: OffsetUnit;
} & TouchableOpacityProps;

const DrawerFab = ({
  quadrant = 1,
  isRichToolbar = false,
  offsetX = 16,
  offsetY = 16,
  unitX = 'px',
  unitY = 'px',
  ...rest
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const { keyboardShown } = useKeyboard();
  const toolbarOffset = isRichToolbar ? richToolbarHeight : 0;
  const isBottom = quadrant === 2 || quadrant === 3;
  const bottomOffset = keyboardShown ? toolbarOffset : bottom;
  const _offsetY = isBottom ? offsetY + bottomOffset : offsetY;

  return (
    <FabContainer
      quadrant={quadrant}
      offsetX={offsetX}
      offsetY={_offsetY}
      unitX={unitX}
      unitY={unitY}
      {...rest}>
      <CircledDoubleArrows />
    </FabContainer>
  );
};

const FabContainer = styled(TouchableOpacity)<{
  quadrant: Quadrant;
  offsetX: number;
  offsetY: number;
  unitX: OffsetUnit;
  unitY: OffsetUnit;
}>`
  position: absolute;
  ${({ quadrant, offsetX, offsetY, unitX, unitY }) => {
    switch (quadrant) {
      case 1:
        return `
          top: ${offsetY}${unitY};
          right: ${offsetX}${unitX};
        `;
      case 2:
        return `
          bottom: ${offsetY}${unitY};
          right: ${offsetX}${unitX};
        `;
      case 3:
        return `
          bottom: ${offsetY}${unitY};
          left: ${offsetX}${unitX};
        `;
      case 4:
        return `
          top: ${offsetY}${unitY};
          left: ${offsetX}${unitX};
        `;
      default:
        break;
    }
  }}
  justify-content: flex-end;
  align-items: flex-end;
  elevation: 1000;
  z-index: 1000;
`;

export default DrawerFab;
