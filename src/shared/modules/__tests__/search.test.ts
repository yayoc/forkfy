import { ActionWithoutPayload, ActionWithPayload } from "shared/helpers/types";
import reducer, { actions, Types, State } from "../search";

describe("search module", () => {
  describe("actions", () => {
    it("should return an action when requesting search", () => {
      const q = "";
      const expectedAction = {
        type: Types.SEARCH_REQUEST,
        payload: q
      };
      expect(actions.searchRequest(q)).toEqual(expectedAction);
    });
  });
  describe("reducer", () => {
    let state: State;
    beforeAll(() => {
      state = {
        isLoading: false,
        result: null
      };
    });
    it("should return a state when searching", () => {
      const q = "test";
      const action: ActionWithPayload<Types.SEARCH_REQUEST, string> = {
        type: Types.SEARCH_REQUEST,
        payload: q
      };
      expect(reducer(state, action)).toEqual({ ...state, isLoading: true });
    });
  });
});
