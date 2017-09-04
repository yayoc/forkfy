import { ReduxState } from "client/helpers/types";
import { actions, getAuth, State as AuthState } from "client/modules/auth";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Signin from "client/components/Signin";

interface StateProps {
  authState: AuthState;
}

export default function authorization<P>(
  Comp: React.ComponentClass<P> | React.StatelessComponent<P>
): React.ComponentClass<P> {
  class Auth extends React.Component<P & StateProps, {}> {
    public render() {
      const { authState } = this.props;
      if (authState.isAuthorized) {
        return <Comp {...this.props} />;
      }
      return (
        <div>
          <Signin {...this.props} />
        </div>
      );
    }
  }

  const mapStateToProps = (state: ReduxState, ownProps: P): StateProps => {
    const authState = getAuth(state);
    return {
      authState
    };
  };

  return connect<StateProps, undefined, P>(mapStateToProps)(Auth);
}
