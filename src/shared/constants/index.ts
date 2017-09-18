declare var IN_PRODUCTION: boolean;

export const clientId = "3affaf0ed25944c589af85afbe6ba809";
export const callbackUrl = IN_PRODUCTION
  ? "https://forkfy.now.sh"
  : "http://localhost:3000";
export const scopes =
  "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

export const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${callbackUrl}&scope=${scopes}`;
