import React from 'react';
import { View } from 'react-native';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectThemeId } from '../../store/selectors';
import { ThemeSelection, setThemeId } from '../../store/slices';
import RadioPanel from '../RadioPanel';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { toTitleCase } from '../../utils';

type Props = {};

const DrawerView = styled(View)`
  flex: 1;
  padding: 8px;
`;

const ThemeSettingContainer = styled(View)`
  flex: 1;
`;

const AppSettingsDrawerContent = ({}: Props) => {
  const dispatch = useAppDispatch();
  const themeId = useAppSelector(selectThemeId);
  const themeIdTxt = toTitleCase(themeId);

  const handleSelect = (themeId: ThemeSelection) => {
    dispatch(setThemeId((themeId as string).toLowerCase() as ThemeSelection));
  };

  return (
    <Provider store={store}>
      <DrawerView>
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
      </DrawerView>
    </Provider>
  );
};

export default AppSettingsDrawerContent;
