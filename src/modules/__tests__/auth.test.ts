import reducer, { actions, Types } from "../auth";

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
  });
  describe("reducer", () => {
    let state = {};
    beforeAll(() => {
      state = { accessToken: null, me: null, isLoading: false };
    });
    it("should return a initial state", () => {
      const expected = { accessToken: null, me: null, isLoading: false };
      expect(reducer(undefined, {})).toEqual(expected);
    });
    it("should return a state with an access token", () => {
      const accessToken = "SomeTokenString";
      const action = {
        payload: accessToken,
        type: Types.SET_ACCESS_TOKEN
      };
      expect(reducer(undefined, action)).toEqual({ ...state, accessToken });
    });
    it("should return a state with loading.", () => {
      const action = {
        type: Types.FETCH_ME_REQUEST
      };
      expect(reducer(undefined, action)).toEqual({ ...state, isLoading: true });
    });
    it("should return a state after getting me is succeeded", () => {
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
      const action = {
        payload: me,
        type: Types.FETCH_ME_SUCCESS
      };
      expect(reducer(undefined, action)).toEqual({ ...state, me });
    });
  });
});
