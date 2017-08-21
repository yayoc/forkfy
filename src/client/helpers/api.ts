const API_ROOT = "http://localhost:3000/api";

const queryParams = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

interface FetchRequest {
  endpoint: string;
  accessToken: string;
  params?: object;
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
    credentials: "include",
    headers,
    method: "GET"
  }).then(response => response.json());
}

export function searchPlaylist(accessToken: string, q: string): Promise<any> {
  return fetchFromAPI({
    accessToken,
    endpoint: "search",
    params: {
      q,
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
