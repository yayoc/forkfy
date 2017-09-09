export const clientId = "3b2b30d3541f4c43ad27044972adef4b";
export const callbackUrl = "http://localhost:3000";
export const accessTokenKey = "FORKFY_ACCESS_TOKEN";
export const scopes =
  "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

export const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${callbackUrl}&scope=${scopes}`;
