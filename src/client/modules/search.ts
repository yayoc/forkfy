import { ActionWithoutPayload, ActionWithPayload } from "client/helpers/types";
import { Playlists } from "client/types";

// - Types

export enum Types {
  SEARCH_REQUEST = "seach/SEARCH_REQUEST",
  SEARCH_SUCCESS = "seach/SEARCH_SUCCESS",
  SEARCH_FAILED = "seach/SEARCH_FAILED"
}

// - Actions

type Actions =
  | ActionWithPayload<Types.SEARCH_REQUEST, string>
  | ActionWithPayload<Types.SEARCH_SUCCESS, Playlists>
  | ActionWithPayload<Types.SEARCH_FAILED, Error>;

export const actions = {
  searchRequest: (q: string) => ({
    type: Types.SEARCH_REQUEST,
    payload: q
  }),
  searchSuccess: (playlists: Playlists) => ({
    type: Types.SEARCH_SUCCESS,
    payload: playlists
  }),
  searchFailed: (error: Error) => ({
    type: Types.SEARCH_FAILED,
    payload: error
  })
};

// - Reducer

export interface State {
  isLoading: boolean;
  playlists: Playlists | null;
}

const initialState: State = {
  isLoading: false,
  playlists: null
};

export default (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case Types.SEARCH_REQUEST: {
      return { ...state, isLoading: true };
    }
    case Types.SEARCH_FAILED: {
      return { ...state, isLoading: false };
    }
    case Types.SEARCH_FAILED: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};

// - Selector
