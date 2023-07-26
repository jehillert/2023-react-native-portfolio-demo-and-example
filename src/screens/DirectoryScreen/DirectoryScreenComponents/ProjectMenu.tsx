import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Menu, IconButton } from 'react-native-paper';
import { EntityId } from '@reduxjs/toolkit';
import { useTheme } from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { Positioner } from '../../../components/utility';
import { deleteProject, setPinnedProjectId } from '../../../store/slices';
import { hScale, vScale } from '../../../theme/themeUtils';
import appConfig from '../../../appConfig';
import { selectProjectById } from '../../../store/selectors';

type Props = {
  projectId: EntityId;
};

const ProjectMenu = ({ projectId }: Props) => {
  const dispatch = useAppDispatch();
  const { colors, dimensions } = useTheme();
  const [visible, setVisible] = useState(false);
  const project = useAppSelector(() => selectProjectById(projectId));

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuButton = (
    <IconButton
      icon="dots-vertical"
      iconColor={colors.onSecondary}
      onPress={openMenu}
      size={dimensions.iconMedium}
    />
  );

  const handlePressPin = () => {
    dispatch(setPinnedProjectId(projectId));
    closeMenu();
  };

  const handlePressFullScreen = () => {
    closeMenu();
  };

  const handlePressDelete = () => {
    project && dispatch(deleteProject(project));
    closeMenu();
  };

  return (
    <Positioner position="relative" offsetX={0} offsetY={8}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={menuButton}
        anchorPosition="top"
        contentStyle={styles.menu}>
        <Menu.Item
          leadingIcon="pin"
          onPress={handlePressPin}
          title="Pin and Target"
          style={styles.menuItem}
          titleStyle={styles.title}
          contentStyle={styles.contentStyle}
        />
        <Menu.Item
          leadingIcon="arrow-expand-all"
          onPress={() => {}}
          title="Fullscreen"
        />
        <Menu.Item
          leadingIcon="fullscreen-exit"
          onPress={() => {}}
          title="Exit Fullscreen"
        />
        <Divider />
        <Menu.Item
          title="Delete"
          leadingIcon="trash-can-outline"
          onPress={handlePressDelete}
          key="menu-delete-card-Inquiry"
        />
      </Menu>
    </Positioner>
  );
};

export { ProjectMenu };

const styles = StyleSheet.create({
  menu: {
    marginRight: hScale(12),
    marginTop: vScale(4),
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
  },
});
