import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      css:''
    }
  }
  animate(css, index) {
    _.delay(()=> {
      this.setState({css:css});
    }, 80 * index);
  }
  render() {
    console.log(this.props)
    return (
      <Link to={this.props.path} className={`box ${this.state.css}`}>
        <h1>{this.props.title}</h1>
        <div style={{backgroundColor: this.props.color}} ></div>
      </Link>
    )
    
  }
}

export default Box;
