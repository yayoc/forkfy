import { ActionWithoutPayload, ActionWithPayload } from "shared/helpers/types";
import reducer, {
  actions,
  Types,
  State,
  ForkRequestPayload
} from "../playlist";

describe("playlist module", () => {
  describe("actions", () => {
    it("should return an action when requesting fork", () => {
      const playlistId = "1302";
      const ownUserId = "spotify";
      const expectedAction = {
        type: Types.FORK_REQUEST,
        payload: { playlistId, ownUserId }
      };
      expect(actions.forkRequest(playlistId, ownUserId)).toEqual(
        expectedAction
      );
    });
    it("should return an action when succeeding fork", () => {
      const playlistId = "1302";
      const expectedAction = {
        type: Types.FORK_SUCCESS,
        payload: playlistId
      };
      expect(actions.forkSuccess(playlistId)).toEqual(expectedAction);
    });
    it("should return an action when failing fork", () => {
      const error = new Error("");
      const expectedAction = {
        type: Types.FORK_FAILED,
        payload: error
      };
      expect(actions.forkFailed(error)).toEqual(expectedAction);
    });

    it("should return an action when requesting fetch", () => {
      const playlistId = "1302";
      const ownUserId = "spotify";
      const expectedAction = {
        type: Types.FETCH_REQUEST,
        payload: { playlistId, ownUserId }
      };
      expect(actions.fetchRequest(playlistId, ownUserId)).toEqual(
        expectedAction
      );
    });

    it("should return an action when fetching is suceeded", () => {
      const expectedAction = {
        type: Types.FETCH_SUCCESS
      };
      expect(actions.fetchSuccess()).toEqual(expectedAction);
    });

    it("should return an action when fetching is failed", () => {
      const error = new Error("");
      const expectedAction = {
        type: Types.FETCH_FAILED,
        payload: error
      };
      expect(actions.fetchFailed(error)).toEqual(expectedAction);
    });
  });
  describe("reducer", () => {
    let state: State;
    beforeAll(() => {
      state = {
        isForking: false,
        isTracksLoading: false,
        forkedPlaylistIds: []
      };
    });
    it("should return a state when requesting a forking", () => {
      const playlistId = "1302";
      const ownUserId = "spotify";
      const action: ActionWithPayload<
        Types.FORK_REQUEST,
        ForkRequestPayload
      > = {
        type: Types.FORK_REQUEST,
        payload: { playlistId, ownUserId }
      };
      expect(reducer(state, action)).toEqual({ ...state, isForking: true });
    });

    it("should return a state when forking is succeded", () => {
      const playlistId = "1302";
      const action: ActionWithPayload<Types.FORK_SUCCESS, string> = {
        type: Types.FORK_SUCCESS,
        payload: playlistId
      };
      expect(reducer(state, action)).toEqual({
        ...state,
        isForking: false,
        forkedPlaylistIds: [playlistId]
      });
    });
  });
});
