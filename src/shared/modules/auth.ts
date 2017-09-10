import { ActionWithoutPayload, ActionWithPayload } from "shared/helpers/types";
import { Me } from "shared/types";
import { ReduxState } from "shared/helpers/types";
import * as Cookies from "js-cookie";

export const COOKIE_PATH = "token";

// - Types

export enum Types {
  SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN",
  FETCH_ME_REQUEST = "auth/FETCH_ME_REQUEST",
  FETCH_ME_SUCCESS = "auth/FETCH_ME_SUCCESS",
  FETCH_ME_FAILED = "auth/FETCH_ME_FAILED",
  LOGOUT = "auth/LOGOUT"
}

// - Actions

type Actions =
  | ActionWithPayload<Types.SET_ACCESS_TOKEN, string>
  | ActionWithoutPayload<Types.FETCH_ME_REQUEST>
  | ActionWithPayload<Types.FETCH_ME_SUCCESS, Me>
  | ActionWithPayload<Types.FETCH_ME_FAILED, Error>
  | ActionWithoutPayload<Types.LOGOUT>;

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
  }),
  logout: () => ({
    type: Types.LOGOUT
  })
};

// - Reducer

export interface State {
  accessToken: string | null;
  isAuthorized: boolean;
  me: Me | null;
  isLoading: boolean;
}

const initialState: State = {
  accessToken: null,
  isAuthorized: false,
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
      return { ...state, me, isLoading: false, isAuthorized: true };
    case Types.FETCH_ME_FAILED:
      return { ...state, isLoading: false, isAuthorized: false };
    case Types.LOGOUT:
      return { ...state, accessToken: null, isAuthorized: false, me: null };
    default:
      return state;
  }
};

// - Selector

export const getAuth = (state: ReduxState) => state.auth;
