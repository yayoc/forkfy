import { actions } from "modules/auth";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { accessTokenKey, callbackUrl, clientId } from "../../constants";

class Signin extends React.Component<
  { location: { [key: string]: any }; setAccessToken: (token: string) => void },
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
        this.props.setAccessToken(parsed.access_token);
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

const mapDispatchToProps = (dispatch: Dispatch<string>) => {
  return {
    setAccessToken: (token: string): void => {
      dispatch(actions.setAccessToken(token));
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Signin);
