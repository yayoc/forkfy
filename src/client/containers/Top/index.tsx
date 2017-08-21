import Signin from "client/components/Signin";
import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { callbackUrl, clientId } from "../../constants";
import { getAuth, State as AuthState, actions } from "client/modules/auth";
import {
  State as SearchState,
  actions as searchActions
} from "client/modules/search";
import { ReduxState } from "client/helpers/types";

interface StateProps {
  auth: AuthState;
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
    const { auth } = this.props;
    return (
      <div>
        <h1>Top</h1>
        {auth.accessToken
          ? <div>
              <input onChange={this.onChage} value={this.state.q} />
              <button onClick={this.onClick}>Search</button>
            </div>
          : <Signin {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const auth = getAuth(state);
  return { auth };
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
