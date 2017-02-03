import React from 'react';
import { Link } from 'react-router'
import data from './data'

class Home extends React.Component {
  render() {
    return (
      <Link to={this.props.texto} className="box">
        <h1>{this.props.texto}</h1>
        <img src={this.props.img} alt={this.props.texto} />
      </Link>
    )
  }
}

Home.defaultProps = { nodes: data };

export default Home;
