import React from 'react';
import { Pressable, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { styled } from 'styled-components/native';

import Text from '../TextPaper';
import RadioPanel from '../RadioPanel';
import _BaseDrawerContent from './BaseDrawerContent';
import { toTitleCase } from '../../utils';
import { selectThemeId } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DrawerId, ThemeSelection, setThemeId } from '../../store/slices';
import { ScreensEnum, navigate } from '../../navigation';

type Props = {
  drawerId: DrawerId;
};

const BaseDrawerContent = styled(_BaseDrawerContent)`
  flex: 1;
`;

const PressableLink = styled(Pressable)`
  margin: 8px;
`;

const ThemeSettingContainer = styled(View)`
  padding: 8px;
  margin: 8px;
`;

const LinksContainer = styled(View)`
  padding: 8px;
  margin: 8px;
`;

const AppSettingsDrawerContent = ({ drawerId }: Props) => {
  const dispatch = useAppDispatch();
  const _themeId = useAppSelector(selectThemeId);
  const themeIdTxt = toTitleCase(_themeId);

  const handlePress = (screen: ScreensEnum) => () => navigate(screen, {});

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
      <Divider />
      <PressableLink>
        <Text.BodyMedium>{ScreensEnum.TERMS_OF_SERVICE}</Text.BodyMedium>
      </PressableLink>
      <PressableLink>
        <Text.BodyMedium>{ScreensEnum.PRIVACY_POLICY}</Text.BodyMedium>
      </PressableLink>
    </BaseDrawerContent>
  );
};

export default AppSettingsDrawerContent;
