import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectThemeId } from '../../store/selectors';
import { ThemeSelection, setThemeId } from '../../store/slices';
import RadioPanel from '../RadioPanel';

type Props = {};

const DrawerView = styled(View)`
  flex: 1;
`;

const ThemeSettingContainer = styled(View)`
  flex: 1;
`;

const AppSettingsDrawerContent = ({}: Props) => {
  const dispatch = useAppDispatch();
  const themeId = useAppSelector(selectThemeId);
  const handleSelect = (themeId: ThemeSelection) => {
    dispatch(setThemeId(themeId));
  };

  return (
    <DrawerView>
      <ThemeSettingContainer>
        <RadioPanel
          title={'Appearance'}
          labels={['System', 'Light', 'Dark']}
          setSelectedValue={handleSelect}
          selectedValue={themeId}
        />
      </ThemeSettingContainer>
    </DrawerView>
  );
};

export default AppSettingsDrawerContent;
