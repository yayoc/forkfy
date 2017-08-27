import Signin from "client/components/Signin";
import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { callbackUrl, clientId } from "../../constants";
import { getAuth, State as AuthState, actions } from "client/modules/auth";
import {
  State as SearchState,
  actions as searchActions,
  getPlaylists
} from "client/modules/search";
import { Playlists } from "client/types";
import { ReduxState } from "client/helpers/types";

interface StateProps {
  authState: AuthState;
  playlists: Playlists | null;
}

interface OwnProps {
  location: { [key: string]: any };
}

interface DispatchProps {
  search: (q: string) => void;
}

class Top extends React.Component<OwnProps & StateProps & DispatchProps> {
  state = {
    q: ""
  };
  public onChage = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ q: e.currentTarget.value });
  };

  public onClick = () => {
    const { search } = this.props;
    search(this.state.q);
  };

  public render() {
    const { authState, playlists } = this.props;
    return (
      <div>
        <h1>Top</h1>
        {authState.accessToken
          ? <div>
              <input onChange={this.onChage} value={this.state.q} />
              <button onClick={this.onClick}>Search</button>
              {playlists &&
                <div>
                  {playlists.items.map(i => {
                    return (
                      <div>
                        <img src={i.images[0].url} width={300} height={300} />
                        <p>
                          {i.name}
                        </p>
                      </div>
                    );
                  })}
                </div>}
            </div>
          : <Signin {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const authState = getAuth(state);
  const playlists = getPlaylists(state);
  return { authState, playlists };
};

const mapDispatchToProps = (dispatch: Dispatch<string>): DispatchProps => {
  return {
    search: (q: string) => {
      dispatch(searchActions.searchRequest(q));
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Top);
