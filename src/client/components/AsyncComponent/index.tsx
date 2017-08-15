import * as React from "react";

export default function asyncComponent(getComponent: () => Promise<any>) {
  return class AsyncComponent extends React.Component {
    private static Component: typeof React.Component | null = null;
    public state = { Component: AsyncComponent.Component };

    public componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    public render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
