import {
  ActionWithoutPayload,
  ActionWithPayload,
  ReduxState,
} from 'client/helpers/types';
import {getEntities} from 'client/modules/entity';
import {Item, Playlists} from 'client/types';
import {createSelector} from 'reselect';

// - Types

export enum Types {
  SEARCH_REQUEST = 'seach/SEARCH_REQUEST',
  SEARCH_SUCCESS = 'seach/SEARCH_SUCCESS',
  SEARCH_FAILED = 'seach/SEARCH_FAILED',
  SEARCH_MORE_REQUEST = 'seach/SEARCH_MORE_REQUEST',
  SEARCH_MORE_SUCCESS = 'seach/SEARCH_MORE_SUCCESS',
  SEARCH_MORE_FAILED = 'seach/SEARCH_MORE_FAILED',
}

// - Actions

type Actions =
  | ActionWithPayload<Types.SEARCH_REQUEST, string>
  | ActionWithPayload<Types.SEARCH_SUCCESS, Playlists>
  | ActionWithPayload<Types.SEARCH_FAILED, Error>
  | ActionWithoutPayload<Types.SEARCH_MORE_REQUEST>
  | ActionWithPayload<Types.SEARCH_MORE_SUCCESS, Result>
  | ActionWithPayload<Types.SEARCH_MORE_FAILED, Error>;

export const actions = {
  searchFailed: (error: Error) => ({
    payload: error,
    type: Types.SEARCH_FAILED,
  }),
  searchRequest: (q: string) => ({
    payload: q,
    type: Types.SEARCH_REQUEST,
  }),
  searchSuccess: (playlists: Playlists) => ({
    payload: playlists,
    type: Types.SEARCH_SUCCESS,
  }),
  searchMoreFailed: (error: Error) => ({
    payload: error,
    type: Types.SEARCH_MORE_FAILED,
  }),
  searchMoreRequest: () => ({
    type: Types.SEARCH_MORE_REQUEST,
  }),
  searchMoreSuccess: (result: Result) => ({
    payload: result,
    type: Types.SEARCH_MORE_SUCCESS,
  }),
};

// - Reducer

export interface Result {
  items: string[];
  total: number;
  offset: number;
  limit: number;
}

export interface State {
  isLoading: boolean;
  result: Result | null;
}

const initialState: State = {
  isLoading: false,
  result: null,
};

export default (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case Types.SEARCH_REQUEST: {
      return {...state, isLoading: true};
    }
    case Types.SEARCH_SUCCESS: {
      const result = action.payload;
      return {
        ...state,
        isLoading: false,
        result,
      };
    }
    case Types.SEARCH_FAILED: {
      return {...state, isLoading: false};
    }
    case Types.SEARCH_MORE_REQUEST: {
      return {...state, isLoading: true};
    }
    case Types.SEARCH_MORE_SUCCESS: {
      const result = action.payload;
      const items = state.result ? state.result.items : [];
      return {
        ...state,
        result: {
          ...result,
          items: items.concat(result.items),
        },
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

// - Selector

export const getSearch = (state: ReduxState) => state.search;

export const getPlaylists = createSelector(
  [getSearch, getEntities],
  (search: any, entity: any) => {
    return search.result && entity.entities
      ? search.result.items
          .map((i: string) => entity.entities.items[i])
          .filter((i: Item) => i !== undefined)
      : [];
  },
);
