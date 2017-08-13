import * as React from "react";
import { accessTokenKey, callbackUrl, clientId } from "../../constants";

export default class extends React.Component<
  { location: { [key: string]: any } },
  {}
> {
  public componentWillMount() {
    const parser = (s: string) => {
      return s.split("&").reduce((acc: { [key: string]: any }, ss) => {
        const a = ss.split("=");
        const key = a[0];
        acc[key] = a[1];
        return acc;
      }, {});
    };

    if (this.props.location) {
      const { hash } = this.props.location || "";
      if (hash !== "") {
        const h = hash.slice(1);
        const parsed = parser(h);
        localStorage.setItem(accessTokenKey, parsed.access_token);
      }
    }
  }
  public render() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${callbackUrl}`;
    return (
      <div>
        <a href={authUrl}>Signin</a>
      </div>
    );
  }
}
