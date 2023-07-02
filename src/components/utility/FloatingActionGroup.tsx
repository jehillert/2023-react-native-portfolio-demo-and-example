import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '../../hooks';
import { richToolbarHeight } from '../../constants';

type Quadrant = 1 | 2 | 3 | 4;

type OffsetUnit = '%' | 'px';

type FabContainerProps = {
  quadrant: Quadrant;
  offsetX: number;
  offsetY: number;
  unitX: OffsetUnit;
  unitY: OffsetUnit;
};

/**
 * children
 * @prop quadrant - the corner to position the fab
 * @prop offsetX - the horizontal offset from the nearest side (left/right)
 * @prop offsetY - the vertical offset from the nearest side (top/bottom)
 * @prop isRichToolbar - is element meant to rest above a richToolbar at bottom of screen
 */
type Props = {
  children?: ReactNode;
  quadrant?: Quadrant;
  isRichToolbar?: boolean;
  offsetX?: number;
  offsetY?: number;
} & PressableProps;

const FloatingActionGroup = ({
  children,
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
      {children}
    </FabContainer>
  );
};

const FabContainer = styled(Pressable)<FabContainerProps>`
  position: absolute;
  ${({ quadrant, offsetX, offsetY }) => {
    switch (quadrant) {
      case 1:
        return `
          top: ${offsetY}px;
          right: ${offsetX}px;
        `;
      case 2:
        return `
          bottom: ${offsetY}px;
          right: ${offsetX}px;
        `;
      case 3:
        return `
          bottom: ${offsetY}px;
          left: ${offsetX}px;
        `;
      case 4:
        return `
          top: ${offsetY}px;
          left: ${offsetX}px;
        `;
      default:
        break;
    }
  }}
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1000;
`;

export type { OffsetUnit, Props };
export default FloatingActionGroup;
