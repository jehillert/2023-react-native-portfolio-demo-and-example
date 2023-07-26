import React, { useState, useEffect } from 'react';

import { getTime } from 'date-fns';
import { View, FlatList, ListRenderItem } from 'react-native';

import { EntityId } from '@reduxjs/toolkit';
import styled, { useTheme } from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';

import { EntityEnum } from '../../constants';
import { CircledPlusSign } from '../../assets';
import ProjectCard from './DirectoryScreenComponents/ProjectCard';
import { SvgFab, InputModal } from '../../components';
import { DirectoryScreenProps } from '../../navigation/types';
import { useAppDispatch, useAppSelector, useBackHandler } from '../../hooks';
import {
  selectProjectIds,
  selectHeaderHeight,
  selectActiveWebpage,
  selectActiveProject,
  selectActiveProjectId,
} from '../../store/selectors';
import {
  addProject,
  upsertWebpage,
  setProjectIds,
  updateProject,
  projectsAdapter,
  setHeaderHeight,
  setActiveWebpageId,
  setActiveProjectId,
} from '../../store/slices';

type Props = {} & DirectoryScreenProps;

type ModalVariant = 'rename-project' | 'name-project' | 'rename-webpage';

const DirectoryScreen = ({ navigation }: Props) => {
  useBackHandler();
  const dispatch = useAppDispatch();
  const rnHeaderHeight = useHeaderHeight();
  const { colors, dimensions, shadow } = useTheme();

  const projectIds = useAppSelector(selectProjectIds);
  const headerHeight = useAppSelector(selectHeaderHeight);
  const activeWebpage = useAppSelector(selectActiveWebpage);
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const activeProject = useAppSelector(selectActiveProject);

  const [isVisible, setIsVisible] = useState(false);
  const [modalVariant, setModalVariant] =
    useState<ModalVariant>('name-project');

  const { projectTitle } = activeProject ?? {};
  const { title: webpageTitle } = activeWebpage ?? {};

  const closeModal = () => setIsVisible(false);

  const getModalProps = (modalVariant: ModalVariant) => {
    const isNameProject = modalVariant === 'name-project';
    const isRenameProject = modalVariant === 'rename-project';
    const isRenameWebpage = modalVariant === 'rename-webpage';

    const title = isNameProject
      ? 'Please name your Inquiry'
      : isRenameProject
      ? 'Rename Project'
      : 'Rename Webpage';

    const placeholder = isNameProject
      ? ''
      : isRenameProject
      ? projectTitle
      : webpageTitle;

    const handlePressLeft = closeModal;

    const handlePressRight = (inputText: string) => {
      if (!inputText) return;
      if (isRenameProject && activeProjectId) {
        dispatch(
          updateProject({
            projectId: activeProjectId,
            projectTitle: inputText,
            lastActive: getTime(new Date()),
          }),
        );
      }
      if (isNameProject) {
        dispatch(addProject(inputText));
      }
      if (isRenameWebpage && activeWebpage) {
        console.log(
          `activeWebpage: ${JSON.stringify(activeWebpage, undefined, 2)}`,
        );
        dispatch(
          upsertWebpage({
            ...activeWebpage,
            title: inputText,
            dateUpdated: getTime(new Date()),
          }),
        );
      }
      setIsVisible(false);
    };

    return {
      title,
      placeholder,
      handlePressLeft,
      handlePressRight,
    };
  };

  useEffect(() => {
    if (headerHeight !== rnHeaderHeight) {
      dispatch(setHeaderHeight(rnHeaderHeight));
    }
  }, []);

  const renameCallback = (id: EntityId, entityType: EntityEnum) => () => {
    switch (entityType) {
      case EntityEnum.PROJECT:
        setModalVariant(`rename-project`);
        dispatch(setActiveProjectId(id));
        break;
      case EntityEnum.WEBPAGE:
        setModalVariant(`rename-webpage`);
        dispatch(setActiveWebpageId(id));
        break;
      default:
        break;
    }
    setIsVisible(true);
  };

  const handleAddProject = () => {
    setModalVariant('name-project');
    setIsVisible(true);
  };

  const handleDragEnd = ({ data }: { data: EntityId[] }) => {
    projectsAdapter.sortComparer = false;
    dispatch(setProjectIds(data.map(item => item)));
  };

  const renderItem: ListRenderItem<EntityId> = ({ item: projectId }) => {
    return (
      <ProjectCard projectId={projectId} renameCallback={renameCallback} />
    );
  };

  return (
    <>
      <InputModal
        closeModal={closeModal}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        {...getModalProps(modalVariant)}
      />
      <FlatList
        bounces={false}
        data={projectIds}
        renderItem={renderItem}
        style={{ flex: 1 }}
      />
      <SvgFab
        SvgIcon={CircledPlusSign}
        positioning={{ quadrant: 2, offsetX: 32, offsetY: 32 }}
        onPress={handleAddProject}
        iconProps={{
          height: dimensions.iconFab,
          width: dimensions.iconFab,
          color: colors.primaryContainer,
          fill: colors.onPrimary,
          style: shadow.fabObj,
        }}
      />
    </>
  );
};

export default DirectoryScreen;
