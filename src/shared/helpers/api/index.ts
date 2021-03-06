declare var IN_PRODUCTION: boolean;

const API_ROOT = IN_PRODUCTION
  ? "https://forkfy.now.sh/api"
  : "http://localhost:3000/api";

export const queryParams = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

export function getQueryParams(url: string): { [key: string]: any } {
  return url
    .replace(/^.*\?/, "")
    .split("&")
    .reduce((acc: { [key: string]: any }, s) => {
      const splitted = s.split("=");
      const key = splitted[0];
      const value = splitted[1];
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
}

export function statusCheck(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}

export interface FetchRequest {
  endpoint: string;
  accessToken: string;
  params?: object;
}

export interface PostRequest {
  endpoint: string;
  accessToken: string;
  body?: object;
}

export function fetchFromAPI({ endpoint, accessToken, params }: FetchRequest) {
  let url = [API_ROOT, endpoint].join("/");
  if (params) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(params);
  }
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  return fetch(url, {
    headers,
    method: "GET"
  }).then(response => response.json());
}

export function postToAPI({ endpoint, accessToken, body }: PostRequest) {
  const url = [API_ROOT, endpoint].join("/");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  return fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  }).then(response => response.json());
}

export function fork(
  accessToken: string,
  userId: string,
  ownUserId: string,
  playlistId: string
): Promise<any> {
  return postToAPI({
    accessToken,
    endpoint: `users/${userId}/playlists`,
    body: {
      playlistId,
      userId,
      ownUserId,
      name: "sample",
      description: ""
    }
  });
}

export function fetchPlaylist(
  accessToken: string,
  playlistId: string,
  userId: string
): Promise<any> {
  return fetchFromAPI({
    accessToken,
    endpoint: `users/${userId}/playlists/${playlistId}`
  });
}

export function searchPlaylist(
  accessToken: string,
  q: string,
  offset: number = 0
): Promise<any> {
  return fetchFromAPI({
    accessToken,
    endpoint: "search",
    params: {
      q,
      offset,
      type: "playlist"
    }
  });
}

export function getMe(accessToken: string): Promise<any> {
  return fetchFromAPI({
    accessToken,
    endpoint: "me"
  });
}
