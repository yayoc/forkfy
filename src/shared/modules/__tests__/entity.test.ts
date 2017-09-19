import reducer, { actions, Types, State } from "../entity";

describe("entity moduel", () => {
  describe("actions", () => {
    it("should create a setting entity action", () => {
      const entities = { items: {} };
      const expectedAction = {
        type: Types.SET_ENTITIES,
        payload: entities
      };
      expect(actions.setEntities(entities)).toEqual(expectedAction);
    });
  });
  describe("reducer", () => {
    let state: State;
    beforeAll(() => {
      state = {
        entities: null
      };
    });
    it("should return a state with entities", () => {
      const entities = { items: {} };
      const action = {
        type: Types.SET_ENTITIES,
        payload: entities
      };
      expect(reducer(state, action)).toEqual({
        ...state,
        entities: entities
      });
    });
  });
});
