import { EntityId, createSelector } from '@reduxjs/toolkit';

import { store, RootState } from '../store';
import { Project, projectsAdapter } from '../slices/projectsSlice';

const projectsSelectors = projectsAdapter.getSelectors<RootState>(
  state => state.projects,
);

const { selectAll, selectEntities, selectById, selectIds, selectTotal } =
  projectsSelectors;

const selectActiveProjectId = (state: RootState) =>
  state.projects.activeProjectId;

const selectPinnedProjectId = (state: RootState) =>
  state.projects.pinnedProjectId;

const selectProjectIds = () => selectIds(store.getState());

const selectProjects = () => selectAll(store.getState());

const selectProjectById = (id: EntityId) => selectById(store.getState(), id);

const selectActiveProject = createSelector(
  selectActiveProjectId,
  selectEntities,
  (activeProjectId, entities) => entities[activeProjectId],
);

const selectSortedProjects = createSelector(
  selectIds,
  selectAll,
  (projectIds, projects) => {
    return projectIds.length
      ? (projectIds.map(id =>
          projects.find(project => project.projectId === id),
        ) as Project[])
      : [];
  },
);

export {
  selectActiveProject,
  selectActiveProjectId,
  selectPinnedProjectId,
  selectProjectById,
  selectProjectIds,
  selectProjects,
  selectSortedProjects,
};
