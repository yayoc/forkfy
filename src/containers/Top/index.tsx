import Signin from "components/Signin";
import * as React from "react";
import { callbackUrl, clientId } from "../../constants";

export default class extends React.Component<
  { location: { [key: string]: any } },
  {}
> {
  public render() {
    return (
      <div>
        <h1>Top</h1>
        <Signin {...this.props} />
      </div>
    );
  }
}
