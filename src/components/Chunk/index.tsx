import * as React from "react";

interface Props {
  load: () => Promise<any>;
}

interface State {
  component: JSX.Element;
}

export default class Chunk extends React.Component<Props, State> {
  componentWillMount() {
    this.load(this.props);
  }

  load = (props: Props) => {
    props.load().then(module => {
      this.setState({
        component: module.default ? module.default : module
      });
    });
  };

  render() {
    const { component } = this.state;
    return component || null;
  }
}
