import React, { useState } from 'react';

import { View } from 'react-native';
import { IconButton, Card as RNPCard } from 'react-native-paper';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import { EntityId } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import { styled, useTheme } from 'styled-components/native';

import EntityRow from './EntityRow';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectProjectById } from '../../../store/selectors';
import { EntityEnum, ScreenEnum } from '../../../constants';
import { TextPaper } from '../../../components/TextPaper';
import { AccordionItem } from '../../../components';
import { ProjectMenu } from './ProjectMenu';
import {
  Project,
  setWebpageIds,
  webpagesAdapter,
  setActiveProjectId,
  clipboardsAdapter,
  setClipboardIds,
} from '../../../store/slices';

type Props = {
  projectId: EntityId;
  renameCallback: (id: EntityId, entityType: EntityEnum) => () => void;
};

const Card = styled(RNPCard)`
  margin: 16px;
  border-radius: ${({ theme }) => theme.dimensions.cardBorderRadius}px;
`;

const CardHeader = styled(RNPCard.Content)`
  border-top-left-radius: ${({ theme }) => theme.dimensions.cardBorderRadius}px;
  border-top-right-radius: ${({ theme }) =>
    theme.dimensions.cardBorderRadius}px;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 16px 8px 16px 16px;
  background-color: ${({ theme }) => theme.colors.primaryContainer};
  color: ${({ theme }) => theme.colors.onPrimaryContainer};
`;

const CardActions = styled(RNPCard.Actions)`
  flex-direction: row;
  flex-wrap: nowrap;
  padding-horizontal: 0px;
`;

const SpacerView = styled(View)`
  margin-top: 3px;
`;

const ProjectCard = ({ projectId, renameCallback }: Props) => {
  const { colors, dimensions } = useTheme();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const project = useAppSelector(() => selectProjectById(projectId)) as Project;

  const [expanded, setExpanded] = useState(false);

  const { projectTitle, clipboardIds, documentIds, webpageIds, notes } =
    project;

  const handleDragEnd =
    (entityType: EntityEnum) =>
    ({ data }: { data: EntityId[] }) => {
      if (entityType === EntityEnum.WEBPAGE) {
        webpagesAdapter.sortComparer = false;
        dispatch(setWebpageIds(data.map(item => item)));
      }

      if (entityType === EntityEnum.CLIPBOARD) {
        clipboardsAdapter.sortComparer = false;
        dispatch(setClipboardIds(data.map(item => item)));
      }
    };

  const handlePressClipboard = () => {
    dispatch(setActiveProjectId(projectId));
    navigation.navigate(ScreenEnum.MARKUP, {
      projectId,
      targetEntity: EntityEnum.CLIPBOARD,
    });
  };

  const handlePressNotes = () => {
    dispatch(setActiveProjectId(projectId));
    navigation.navigate(ScreenEnum.EDITOR, {
      projectId,
      targetEntity: EntityEnum.NOTE,
    });
  };

  const renderWebpageRowItem = ({
    item: webpageId,
  }: RenderItemParams<EntityId>) => {
    return (
      <EntityRow
        id={webpageId}
        onPressRename={renameCallback(webpageId, EntityEnum.WEBPAGE)}
      />
    );
  };

  const webpageRows = !!webpageIds && (
    <DraggableFlatList
      data={webpageIds}
      renderItem={renderWebpageRowItem}
      keyExtractor={(item: EntityId) => `draggable-webpage-item-${item}`}
      onDragEnd={handleDragEnd(EntityEnum.WEBPAGE)}
      ItemSeparatorComponent={SpacerView}
      bounces={false}
    />
  );

  // TODO: HAVE A "QUICK NOTE" PROJECT THAT CNA BE PINNED AS WELL
  // TODO: GOTTA GET THE HEADER ON THE CLIPBOARD AND NOTES SCREENS
  return (
    <Card>
      <CardHeader>
        <TextPaper.TitleLarge
          onLongPress={renameCallback(projectId, EntityEnum.PROJECT)}>
          {projectTitle}
        </TextPaper.TitleLarge>
        <ProjectMenu projectId={projectId} />
      </CardHeader>
      <AccordionItem
        expanded={expanded}
        title=""
        onHeaderPress={() => setExpanded(prevExpanded => !prevExpanded)}>
        {webpageRows}
      </AccordionItem>
      <CardActions>
        <IconButton
          icon="clipboard"
          iconColor={colors.onSecondary}
          onPress={handlePressClipboard}
          size={dimensions.iconMedium}
          containerColor="transparent"
          mode="contained"
        />
        <IconButton
          icon="note-edit"
          iconColor={colors.onSecondary}
          onPress={handlePressNotes}
          size={dimensions.iconMedium}
          containerColor="transparent"
          mode="contained"
        />
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
