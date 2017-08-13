const API_ROOT = "https://api.spotify.com";

const queryParams = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

interface FetchRequest {
  endpoint: string;
  params?: object;
}

export function fetchFromAPI({ endpoint, params }: FetchRequest) {
  let url = [API_ROOT, endpoint].join("/");
  if (params) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(params);
  }
  return fetch(url, {
    credentials: "include",
    method: "GET",
    mode: "cors"
  }).then(response => response.json());
}

export function searchPlaylist(q: string): Promise<any> {
  return fetchFromAPI({
    endpoint: "search",
    params: {
      q,
      type: "playlist"
    }
  });
}
