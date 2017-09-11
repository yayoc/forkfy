import { ActionWithPayload, ActionWithoutPayload } from "shared/helpers/types";

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
  forkSuccess: () => ({
    type: Types.FORK_SUCCESS
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
  | ActionWithoutPayload<Types.FORK_SUCCESS>
  | ActionWithPayload<Types.FORK_FAILED, Error>
  | ActionWithPayload<Types.FETCH_REQUEST, ForkRequestPayload>
  | ActionWithoutPayload<Types.FETCH_SUCCESS>
  | ActionWithPayload<Types.FETCH_FAILED, Error>;

// - Reducer

interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export default (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case Types.FORK_REQUEST:
      return { ...state, isLoading: true };
    case Types.FORK_SUCCESS:
      return { ...state, isLoading: false };
    case Types.FORK_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// - Selector
