import fetch from "node-fetch";
import {
  queryParams,
  statusCheck,
  FetchRequest,
  PostRequest
} from "shared/helpers/api";

const SPOTIFY_API_ROOT = "https://api.spotify.com/v1";

export function fetchFromAPI({ endpoint, accessToken, params }: FetchRequest) {
  let url = [SPOTIFY_API_ROOT, endpoint].join("/");
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
  })
    .then(response => statusCheck(response as any))
    .then(response => response.json());
}

export function postToAPI({ endpoint, accessToken, body }: PostRequest) {
  const url = [SPOTIFY_API_ROOT, endpoint].join("/");
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

export function getMe(accessToken: string): Promise<any> {
  return fetchFromAPI({ endpoint: "me", accessToken });
}

export function getPlaylist(
  accessToken: string,
  userId: string,
  playlistId: string
) {
  return fetchFromAPI({
    endpoint: `users/${userId}/playlists/${playlistId}`,
    accessToken
  });
}

export function getPlaylistTracks(
  accessToken: string,
  userId: string,
  playlistId: string
): Promise<any> {
  return fetchFromAPI({
    endpoint: `users/${userId}/playlists/${playlistId}/tracks`,
    accessToken
  });
}

export function searchPlaylists(
  accessToken: string,
  q: string,
  offset: string = "0"
): Promise<any> {
  return fetchFromAPI({
    endpoint: "search",
    accessToken,
    params: { q, type: "playlist", offset }
  });
}

export function createPlaylist(
  accessToken: string,
  userId: string,
  name: string,
  isPublic: boolean = true,
  collaborative: boolean = true,
  description: string = ""
): Promise<any> {
  const body = {
    name,
    public: isPublic,
    collaborative,
    description
  };
  return postToAPI({
    endpoint: `users/${userId}/playlists`,
    accessToken,
    body
  });
}

export function addTracksToPlaylist(
  accessToken: string,
  userId: string,
  playlistId: string,
  uris: string[],
  position: number = 0
): Promise<any> {
  const body = {
    uris,
    position
  };
  return postToAPI({
    endpoint: `users/${userId}/playlists/${playlistId}/tracks`,
    accessToken,
    body
  });
}
