// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from '@reduxjs/toolkit';
import { uuid } from '../../utils';
import { compareDesc, getTime } from 'date-fns';
import { deleteProject } from './projectsSlice';

type Clipboard = {
  clipboardId: EntityId;
  content?: string;
  dateCreated?: number;
};

export const clipboardsAdapter = createEntityAdapter<Clipboard>({
  selectId: clipboard => clipboard.clipboardId,
  sortComparer: (
    { dateCreated: dateLeft = 0 }: Clipboard,
    { dateCreated: dateRight = 0 }: Clipboard,
  ) => compareDesc(dateLeft, dateRight),
});

const clipboardsSlice = createSlice({
  name: 'clipboards',
  initialState: clipboardsAdapter.getInitialState({
    activeClipboardId: '' as EntityId,
    markupIds: [] as EntityId[],
    untitledClipboardCount: 1,
  }),
  reducers: {
    addClipboard: {
      reducer: (state, { payload }: PayloadAction<Clipboard>) => {
        const { clipboardId } = payload ?? {};
        const untitledClipboardCount = state.untitledClipboardCount;
        state.untitledClipboardCount = untitledClipboardCount + 1;
        clipboardsAdapter.addOne(state, {
          ...payload,
          dateCreated: getTime(new Date()),
        });
      },
      prepare: payload => ({
        payload: {
          ...payload,
          clipboardId: `clipboard-${uuid()}`,
        },
      }),
    },
    removeClipboard: clipboardsAdapter.removeOne,
    setActiveClipboardId(state, { payload }: PayloadAction<EntityId>) {
      state.activeClipboardId = payload;
    },
    deleteClipboard(state, { payload: clipboard }: PayloadAction<Clipboard>) {
      const { clipboardId } = clipboard;
      clipboardsAdapter.removeOne(state, clipboardId);
    },
    setClipboardIds(state, { payload }: PayloadAction<EntityId[]>) {
      state.ids = payload;
    },
  },
  // TODO: Use adapter methods where available
  extraReducers: builder => {
    builder.addCase(deleteProject, (state, { payload }) => {
      const deleteIds = payload?.clipboardIds ?? [];
      clipboardsAdapter.removeMany(state, deleteIds);
    });
  },
});

export const {
  addClipboard,
  deleteClipboard,
  removeClipboard,
  setActiveClipboardId,
  setClipboardIds,
} = clipboardsSlice.actions;

export type { Clipboard };
export default clipboardsSlice.reducer;
