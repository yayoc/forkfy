import { ActionWithPayload, ActionWithoutPayload } from "client/helpers/types";

// - Types

export enum Types {
  FORK_REQUEST = "playlist/FORK_REQUEST",
  FORK_SUCCESS = "playlist/FORK_SUCCESS",
  FORK_FAILED = "playlist/FORK_FAILED"
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
  })
};

export interface ForkRequestPayload {
  playlistId: string;
  ownUserId: string;
}

type Actions =
  | ActionWithPayload<Types.FORK_REQUEST, ForkRequestPayload>
  | ActionWithoutPayload<Types.FORK_SUCCESS>
  | ActionWithPayload<Types.FORK_FAILED, Error>;

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
