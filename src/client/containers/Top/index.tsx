import Signin from "client/components/Signin";
import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { callbackUrl, clientId } from "../../constants";
import { getAuth, State as AuthState } from "client/modules/auth";
import { ReduxState } from "client/helpers/types";

interface StateProps {
  auth: AuthState;
}

interface OwnProps {
  location: { [key: string]: any };
}

interface DispatchProps {
  search: () => void;
}

class Top extends React.Component<OwnProps & StateProps & DispatchProps> {
  onChage = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  public render() {
    const { auth } = this.props;
    return (
      <div>
        <h1>Top</h1>
        {auth.accessToken
          ? <input onChange={this.onChage} />
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
    search: () => {}
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Top);
