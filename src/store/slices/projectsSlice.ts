// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
// projects are really "Inquiries", but only in user-facing text.
import { compareDesc, getTime } from 'date-fns';

import {
  EntityId,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { uuid } from '../../utils';
import { addWebpage, deleteWebpage } from './webpagesSlice';
import { addClipboard, deleteClipboard } from './clipboardsSlice';

type Project = {
  projectId: EntityId;
  projectTitle?: string;
  noteId?: EntityId; // This is one Note entity for the whole projecdt
  documentIds?: EntityId[];
  webpageIds?: EntityId[];
  clipboardIds?: EntityId[];
  lastActive?: number;
};

export const projectsAdapter = createEntityAdapter<Project>({
  selectId: project => project.projectId,
  sortComparer: (
    { lastActive: dateLeft = 0 }: Project,
    { lastActive: dateRight = 0 }: Project,
  ) => compareDesc(dateLeft, dateRight),
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState({
    activeProjectId: '' as EntityId,
    pinnedProjectId: '' as EntityId,
  }),
  reducers: {
    addProject: {
      reducer: (state, { payload }: PayloadAction<Project>) => {
        state.activeProjectId = payload.projectId;
        projectsAdapter.addOne(state, {
          ...payload,
          webpageIds: [],
          clipboardIds: [],
          documentIds: [],
          lastActive: getTime(new Date()),
        });

        if (state.ids.length === 1) {
          state.pinnedProjectId = payload.projectId;
        }
      },
      prepare: (projectTitle: string) => ({
        payload: {
          projectTitle,
          projectId: `project-${uuid()}`,
          noteId: `note-${uuid()}` as EntityId,
        },
      }),
    },
    removeProjects: projectsAdapter.removeMany,
    updateProject: projectsAdapter.upsertOne,
    updateProjects: projectsAdapter.upsertMany,
    setActiveProjectId(state, { payload }: PayloadAction<EntityId>) {
      state.activeProjectId = payload;
    },
    setPinnedProjectId(state, { payload }: PayloadAction<EntityId>) {
      state.activeProjectId = payload;
    },
    deleteProject(state, { payload: project }: PayloadAction<Project>) {
      projectsAdapter.removeOne(state, project.projectId);
      state.activeProjectId = state?.pinnedProjectId ?? state?.ids?.[0] ?? '';
    },
    setProjectIds(state, { payload }: PayloadAction<EntityId[]>) {
      state.ids = payload;
    },
  },
  // TODO: Use adapter methods where available
  extraReducers: builder => {
    builder
      .addCase(deleteWebpage, (state, { payload: webpage }) => {
        const { entities, activeProjectId } = state;
        const { webpageId: targetId } = webpage;
        const project = entities[activeProjectId];
        let webpageIds = project?.webpageIds ?? [];
        projectsAdapter.updateOne(state, {
          id: activeProjectId,
          changes: {
            webpageIds: webpageIds.filter(webpageId => webpageId !== targetId),
          },
        });
      })
      .addCase(deleteClipboard, (state, { payload: clipboard }) => {
        const { entities, activeProjectId } = state;
        const { clipboardId: targetId } = clipboard;
        const project = entities[activeProjectId];
        let clipboardIds = project?.clipboardIds ?? [];
        projectsAdapter.updateOne(state, {
          id: activeProjectId,
          changes: {
            clipboardIds: clipboardIds.filter(
              clipboardId => clipboardId !== targetId,
            ),
          },
        });
      })
      .addMatcher(
        ({ type }) =>
          type.endsWith('addWebpage') || type.endsWith('addClipboard'),
        (state, { payload }) => {
          const { entities, activeProjectId } = state;
          const { projectId, webpageId, clipboardId } = payload ?? {};
          const project = projectId
            ? entities[projectId]
            : entities[activeProjectId];
          let { webpageIds = [], clipboardIds = [] } = project ?? {};
          const isNewWebpage = webpageId && !webpageIds?.includes(webpageId);
          const isNewClipboard =
            clipboardId && !clipboardIds?.includes(clipboardId);

          if (!webpageIds?.includes(webpageId)) {
            projectsAdapter.updateOne(state, {
              id: projectId ? projectId : activeProjectId,
              changes: {
                webpageIds: isNewWebpage
                  ? [...webpageIds, webpageId]
                  : webpageIds,
                clipboardIds: isNewClipboard
                  ? [...clipboardIds, clipboardId]
                  : clipboardIds,
              },
            });
          }
        },
      );
  },
});

export const {
  addProject,
  deleteProject,
  removeProjects,
  setActiveProjectId,
  setPinnedProjectId,
  setProjectIds,
  updateProject,
  updateProjects,
} = projectsSlice.actions;

export type { Project };
export default projectsSlice.reducer;
