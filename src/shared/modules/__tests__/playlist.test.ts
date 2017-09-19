import reducer, { actions, Types } from "../playlist";

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
      expect(actions.forkSuccess(playlistId)).toEqual(
        expectedAction
      );
    });
    it("should return an action when failing fork", () => {
      const error = new Error("");
      const expectedAction = {
        type: Types.FORK_FAILED,
        payload: error 
      };
      expect(actions.forkFailed(error)).toEqual(
        expectedAction
      );
    });
  });
  describe("reducer", () => {});
});
