import { ActionWithoutPayload, ActionWithPayload } from "shared/helpers/types";
import { Me } from "shared/types";
import reducer, { actions, Types } from "../auth";

const me = {
  birthdate: "1937-06-01",
  country: "SE",
  display_name: "JM Wizzler",
  email: "email@example.com",
  external_urls: {
    spotify: "https://open.spotify.com/user/wizzler"
  },
  followers: {
    href: null,
    total: 3829
  },
  href: "https://api.spotify.com/v1/users/wizzler",
  id: "wizzler",
  images: [
    {
      height: null,
      url:
        "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
      width: null
    }
  ],
  product: "premium",
  type: "user",
  uri: "spotify:user:wizzler"
};

describe("auth module", () => {
  describe("actions", () => {
    it("should create a setting access token action.", () => {
      const accessToken = "SomeTokenString";
      const expectedAction = {
        payload: accessToken,
        type: Types.SET_ACCESS_TOKEN
      };
      expect(actions.setAccessToken(accessToken)).toEqual(expectedAction);
    });
    it("should create a requesting me api action", () => {
      const expectedAction = {
        type: Types.FETCH_ME_REQUEST
      };
      expect(actions.fetchMeRequest()).toEqual(expectedAction);
    });
    it("should create a succeed in a requesting me API action", () => {
      const expectedAction = {
        type: Types.FETCH_ME_SUCCESS,
        payload: me
      };
      expect(actions.fetchMeSuccess(me)).toEqual(expectedAction);
    })

    it("should create a failure action", () => {
      const error = new Error("")
      const expectedAction = {
        type: Types.FETCH_ME_FAILED,
        payload: error
      };
      expect(actions.fetchMeFailed(error)).toEqual(expectedAction);
    })

    it("should create a logout action", () => {
      const expectedAction = {
        type: Types.LOGOUT
      };
      expect(actions.logout()).toEqual(expectedAction);
    });
  });
  describe("reducer", () => {
    let state = {};
    beforeAll(() => {
      state = {
        accessToken: null,
        me: null,
        isLoading: false,
        isAuthorized: false
      };
    });
    it("should return a state with an access token", () => {
      const accessToken = "SomeTokenString";
      const type = Types.SET_ACCESS_TOKEN;
      const action: ActionWithPayload<Types.SET_ACCESS_TOKEN, string> = {
        payload: accessToken,
        type
      };
      expect(reducer(undefined, action)).toEqual({ ...state, accessToken });
    });
    it("should return a state with loading.", () => {
      const action: ActionWithoutPayload<Types.FETCH_ME_REQUEST> = {
        type: Types.FETCH_ME_REQUEST
      };
      expect(reducer(undefined, action)).toEqual({ ...state, isLoading: true });
    });
    it("should return a state after getting me is succeeded", () => {

      const action: ActionWithPayload<Types.FETCH_ME_SUCCESS, Me> = {
        payload: me,
        type: Types.FETCH_ME_SUCCESS
      };
      expect(reducer(undefined, action)).toEqual({
        ...state,
        me,
        isAuthorized: true
      });
    });
  });
});
