import { ActionWithoutPayload, ActionWithPayload } from "client/helpers/types";
import { Me } from "client/types";
import { ReduxState } from "client/helpers/types";

// - Types

export enum Types {
  SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN",
  FETCH_ME_REQUEST = "auth/FETCH_ME_REQUEST",
  FETCH_ME_SUCCESS = "auth/FETCH_ME_SUCCESS",
  FETCH_ME_FAILED = "auth/FETCH_ME_FAILED"
}

// - Actions

type Actions =
  | ActionWithPayload<Types.SET_ACCESS_TOKEN, string>
  | ActionWithoutPayload<Types.FETCH_ME_REQUEST>
  | ActionWithPayload<Types.FETCH_ME_SUCCESS, Me>
  | ActionWithPayload<Types.FETCH_ME_FAILED, Error>;

export const actions = {
  fetchMeFailed: (error: Error) => ({
    payload: error,
    type: Types.FETCH_ME_FAILED
  }),
  fetchMeRequest: () => ({
    type: Types.FETCH_ME_REQUEST
  }),
  fetchMeSuccess: (me: Me) => ({
    payload: me,
    type: Types.FETCH_ME_SUCCESS
  }),
  setAccessToken: (accessToken: string) => ({
    payload: accessToken,
    type: Types.SET_ACCESS_TOKEN
  })
};

// - Reducer

export interface State {
  accessToken: string | null;
  me: Me | null;
  isLoading: boolean;
}

const initialState: State = {
  accessToken: null,
  isLoading: false,
  me: null
};

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case Types.SET_ACCESS_TOKEN:
      const accessToken = action.payload;
      return { ...state, accessToken };
    case Types.FETCH_ME_REQUEST:
      return { ...state, isLoading: true };
    case Types.FETCH_ME_SUCCESS:
      const me = action.payload;
      return { ...state, me, isLoading: false };
    case Types.FETCH_ME_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// - Selector

export const getAuth = (state: ReduxState) => state.auth;

