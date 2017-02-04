import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      css: '',
      hasNext: this.props.questions.length ? "has-next" : ""
    }
  }
  animate(css, index) {
    _.delay(() => {
      this.setState({ css: css });
    }, 70 * index);
  }
  render() {
    return (
      <Link to={this.props.questions.length ? this.props.path : ""} className={`box ${this.state.css} ${this.state.hasNext}`}>
        <h1>{this.props.title}</h1>
        <div style={{ backgroundColor: this.props.color }} ></div>
      </Link>
    )

  }
}

export default Box;
