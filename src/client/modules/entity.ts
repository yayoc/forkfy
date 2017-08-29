import { ActionWithPayload } from "client/helpers/types";
import { ReduxState } from "client/helpers/types";

// - Types

export enum Types {
  SET_ENTITIES = "entity/SET_ENTITIES"
}

// - Actions

type Actions = ActionWithPayload<Types.SET_ENTITIES, Entities>;

interface Entities {
  items: { [key: string]: any };
}

export const actions = {
  setEntities: (entities: Entities) => ({
    payload: entities,
    type: Types.SET_ENTITIES
  })
};

// - Reducer

export interface State {
  entities: Entities | null;
}

const initialState: State = {
  entities: null
};

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case Types.SET_ENTITIES: {
      const entities = action.payload;
      const currentItems = state.entities ? state.entities.items : {};
      return {
        ...state,
        entities: {
          items: { ...currentItems, ...entities.items }
        }
      };
    }
    default:
      return state;
  }
};

// - Selector

export const getEntities = (state: ReduxState) => state.entity;
