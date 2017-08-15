import * as React from "react";

interface IProps {
  load: () => Promise<any>;
}

interface IState {
  component: JSX.Element;
}

export default class Chunk extends React.Component<IProps, IState> {
  public componentWillMount() {
    this.load(this.props);
  }

  public load = (props: IProps) => {
    props.load().then(module => {
      this.setState({
        component: module.default ? module.default : module
      });
    });
  };

  public render() {
    const { component } = this.state;
    return component || null;
  }
}
