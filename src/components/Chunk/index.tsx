import * as React from "react";

export default class Chunk extends React.Component {
  componentWillMount() {
    this.load(this.props);
  }

  load = props => {
    props.load().then(module => {
      this.setState({
        component: module.default ? module.default : module
      });
    });
  };
  render() {
    const { component } = this.state;
    return component || false;
  }
}
