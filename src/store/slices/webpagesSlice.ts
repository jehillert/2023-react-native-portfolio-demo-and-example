import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from '@reduxjs/toolkit';
import { uuid } from '../../utils';
import { deleteProject } from './projectsSlice';
import { removeMarkup, setMarkup } from './markupsSlice';
import { getTime } from 'date-fns';

type AddWebpageProps = {
  webpageId: EntityId;
  weblink?: string;
  subject?: string;
};

type Webpage = {
  webpageId: EntityId;
  title?: string;
  url?: string;
  dateCreated?: number;
  dateUpdated?: number | null;
  markups: EntityId[];
};

export const webpagesAdapter = createEntityAdapter<Webpage>({
  selectId: webpage => webpage.webpageId,
  sortComparer: (
    { title: aTitle = '' }: Webpage,
    { title: bTitle = '' }: Webpage,
  ) => aTitle.localeCompare(bTitle),
});

const webpagesSlice = createSlice({
  name: 'webpages',
  initialState: webpagesAdapter.getInitialState({
    activeWebpageId: '' as EntityId,
    untitledWebpageCount: 1,
  }),
  reducers: {
    addWebpage: {
      reducer: (state, { payload }: PayloadAction<AddWebpageProps>) => {
        const { webpageId, weblink = '', subject = '' } = payload ?? {};

        let title = subject;

        if (!title) {
          const untitledWebpageCount = state.untitledWebpageCount;
          title = `webpage-${untitledWebpageCount}`;
          state.untitledWebpageCount = untitledWebpageCount + 1;
        }

        state.activeWebpageId = webpageId;

        webpagesAdapter.addOne(state, {
          title,
          webpageId,
          markups: [],
          url: weblink,
          dateCreated: getTime(new Date()),
          dateUpdated: null,
        });
      },
      prepare: payload => ({
        payload: {
          ...payload,
          webpageId: `webpage-${uuid()}`,
        },
      }),
    },
    updateWebpage: webpagesAdapter.updateOne,
    upsertWebpage: webpagesAdapter.upsertOne,
    updateWebpages: webpagesAdapter.upsertMany,
    deleteWebpage(state, { payload: webpage }: PayloadAction<Webpage>) {
      webpagesAdapter.removeOne(state, webpage.webpageId);
    },
    setActiveWebpageId(state, { payload }: PayloadAction<EntityId>) {
      state.activeWebpageId = payload;
    },
    setWebpageIds(state, { payload }: PayloadAction<EntityId[]>) {
      state.ids = payload;
    },
  },
  // TODO: Use adapter methods where available
  extraReducers: builder => {
    builder.addCase(deleteProject, (state, { payload }) => {
      const deleteIds = payload?.webpageIds ?? [];
      webpagesAdapter.removeMany(state, deleteIds);
    });
  },
});

export const {
  addWebpage,
  deleteWebpage,
  setActiveWebpageId,
  setWebpageIds,
  upsertWebpage,
  updateWebpage,
  updateWebpages,
} = webpagesSlice.actions;

export type { Webpage };
export default webpagesSlice.reducer;
