import React from 'react';
import { Link } from 'react-router'
import data from './data'

class Home extends React.Component {
  render() {
    return (
      <Link to={this.props.path} className="box">
        <h1>{this.props.title}</h1>
        <img src={this.props.thumb} alt={this.props.description} />
      </Link>
    )
    
  }
}

Home.defaultProps = { nodes: data };

export default Home;
