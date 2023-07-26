import React from 'react';
import { Pressable, View } from 'react-native';
import { styled } from 'styled-components/native';

import Divider from '../Divider';
import { TextPaper } from '../TextPaper';
import RadioPanel from '../RadioPanel';
import _DrawerContent from '../DrawerContent';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectThemeId } from '../../store/selectors';
import { navigate } from '../../navigation';
import { toTitleCase } from '../../utils';
import {
  DrawerId,
  ThemeSelection,
  setDrawer,
  setThemeId,
} from '../../store/slices';
import { ScreenEnum } from '../../constants';

type Props = {
  drawerId: DrawerId;
};

const DrawerContent = styled(_DrawerContent)`
  flex: 1;
`;

const PressableLink = styled(Pressable)``;

const LinksContainer = styled(View)`
  padding: 8px 16px 18px 16px;
  row-gap: 18px;
`;

const ThemeSettingContainer = styled(View)`
  margin: 24px 16px 0px 16px;
`;

const AppSettingsDrawerContent = ({ drawerId }: Props) => {
  const dispatch = useAppDispatch();
  const _themeId = useAppSelector(selectThemeId);
  const themeIdTxt = toTitleCase(_themeId);

  const handlePress = (screen: ScreenEnum) => () => {
    navigate(screen, {});
    dispatch(setDrawer({ drawerId, newState: false }));
  };

  const handleSelect = (themeId: ThemeSelection) => {
    dispatch(setThemeId((themeId as string).toLowerCase() as ThemeSelection));
  };

  return (
    <DrawerContent drawerId={drawerId}>
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
      <Divider marginVertical={16} />
      <LinksContainer>
        <PressableLink onPress={handlePress(ScreenEnum.TERMS_OF_SERVICE)}>
          <TextPaper.BodyMedium>
            {ScreenEnum.TERMS_OF_SERVICE}
          </TextPaper.BodyMedium>
        </PressableLink>
        <PressableLink onPress={handlePress(ScreenEnum.PRIVACY_POLICY)}>
          <TextPaper.BodyMedium>
            {ScreenEnum.PRIVACY_POLICY}
          </TextPaper.BodyMedium>
        </PressableLink>
      </LinksContainer>
    </DrawerContent>
  );
};

export default AppSettingsDrawerContent;
