import {
  ActionWithPayload,
  ActionWithoutPayload,
  ReduxState
} from "shared/helpers/types";

// - Types

export enum Types {
  FORK_REQUEST = "playlist/FORK_REQUEST",
  FORK_SUCCESS = "playlist/FORK_SUCCESS",
  FORK_FAILED = "playlist/FORK_FAILED",
  FETCH_REQUEST = "playlist/FETCH_REQUEST",
  FETCH_SUCCESS = "playlist/FETCH_SUCCESS",
  FETCH_FAILED = "playlist/FETCH_FAILED"
}

// - Actions

export const actions = {
  forkRequest: (playlistId: string, ownUserId: string) => ({
    type: Types.FORK_REQUEST,
    payload: { playlistId, ownUserId }
  }),
  forkSuccess: (playlistId: string) => ({
    type: Types.FORK_SUCCESS,
    payload: playlistId
  }),
  forkFailed: () => ({
    type: Types.FORK_FAILED
  }),
  fetchRequest: (playlistId: string, ownUserId: string) => ({
    type: Types.FETCH_REQUEST,
    payload: { playlistId, ownUserId }
  }),
  fetchSuccess: () => ({
    type: Types.FETCH_SUCCESS
  }),
  fetchFailed: () => ({
    type: Types.FETCH_FAILED
  })
};

export interface ForkRequestPayload {
  playlistId: string;
  ownUserId: string;
}

type Actions =
  | ActionWithPayload<Types.FORK_REQUEST, ForkRequestPayload>
  | ActionWithPayload<Types.FORK_SUCCESS, string>
  | ActionWithPayload<Types.FORK_FAILED, Error>
  | ActionWithPayload<Types.FETCH_REQUEST, ForkRequestPayload>
  | ActionWithoutPayload<Types.FETCH_SUCCESS>
  | ActionWithPayload<Types.FETCH_FAILED, Error>;

// - Reducer

export interface State {
  isForking: boolean;
  isTracksLoading: boolean;
  forkedPlaylistIds: string[];
}

const initialState: State = {
  isForking: false,
  isTracksLoading: false,
  forkedPlaylistIds: []
};

export default (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case Types.FORK_REQUEST:
      return { ...state, isForking: true };
    case Types.FORK_SUCCESS:
      const playlistId = action.payload;
      return {
        ...state,
        isForking: false,
        forkedPlaylistIds: [...state.forkedPlaylistIds, playlistId]
      };
    case Types.FORK_FAILED:
      return { ...state, isForking: false };
    case Types.FETCH_REQUEST:
      return { ...state, isTracksLoading: true };
    case Types.FETCH_SUCCESS:
      return { ...state, isTracksLoading: false };
    case Types.FETCH_FAILED:
      return { ...state, isTracksLoading: false };
    default:
      return state;
  }
};

// - Selector

export const getPlaylist = (state: ReduxState) => state.playlist;
