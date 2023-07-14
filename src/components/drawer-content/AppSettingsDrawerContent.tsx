import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components';

import { DrawerId, ThemeSelection, setThemeId } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectThemeId } from '../../store/selectors';
import { toTitleCase } from '../../utils';
import _BaseDrawerContent from './BaseDrawerContent';
import RadioPanel from '../RadioPanel';

type Props = {
  drawerId: DrawerId;
};

const BaseDrawerContent = styled(_BaseDrawerContent)`
  padding: 8px;
`;

const ThemeSettingContainer = styled(View)`
  flex: 1;
  padding: 8px;
`;

const AppSettingsDrawerContent = ({ drawerId }: Props) => {
  const dispatch = useAppDispatch();
  const themeId = useAppSelector(selectThemeId);
  const themeIdTxt = toTitleCase(themeId);

  const handleSelect = (themeId: ThemeSelection) => {
    dispatch(setThemeId((themeId as string).toLowerCase() as ThemeSelection));
  };

  return (
    <BaseDrawerContent drawerId={drawerId}>
      <ThemeSettingContainer>
        <RadioPanel
          title={'Appearance'}
          labels={['System', 'Light', 'Dark']}
          labelPosition="left"
          styleCheckbox={{ marginRight: 0 }}
          setSelectedValue={handleSelect}
          selectedValue={themeIdTxt}
          variant="check"
        />
      </ThemeSettingContainer>
    </BaseDrawerContent>
  );
};

export default AppSettingsDrawerContent;
