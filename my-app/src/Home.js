import React from 'react';
import data from './data'
import Box from './Box'

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      location: '',
      currentNode: props.nodes
    };

  }
  componentDidMount() {
    this.filter(this.props.location.pathname);
  }
  componentDidUpdate(prevProps, prevState) {
    let oldLocation = prevProps.location.pathname
    let newLocation = this.props.location.pathname
    if (newLocation !== oldLocation) {
      this.filter(newLocation);
    }
  }
  getElements(node) {
    let output = [];
    for (var child in node) {
      if (node.hasOwnProperty(child)) {
        if (child !== 'model') {
          output.push(node[child]);
        }
      }
    }
    return output;
  }
  formatKey(key) {
    if (key.length > 1) {
      key = key.replace(/\//, '');
    }
    return key;
  }
  traverseNodes(nodes, key) {
    if (!nodes[key]) {
      for (var child in nodes) {
        if (nodes.hasOwnProperty(child)) {
          if (child !== 'model') {
            if (nodes[child].model.texto === key) {
              return nodes[child];
            } else {
              if (nodes[key]) {
                return nodes[child];
              } else {
                return this.traverseNodes(nodes[child], key);
              }
            }
          }
        }
      }
    }
    return nodes[key];
  }
  getNodes(nodes, key) {
    if (nodes[this.formatKey(key)]) {
      return nodes[this.formatKey(key)];
    }
    return this.traverseNodes(nodes, this.formatKey(key));
  }
  getCurrentNode() {
    return this.state.currentNode ? this.state.currentNode : this.props.nodes;
  }
  filter(key) {
    let currentNode = this.getNodes(this.getCurrentNode(), key);
    let list = this.getElements(currentNode ? currentNode : this.getNodes(this.props.nodes, key));
    this.setState({ list: list, location: key, currentNode: currentNode });
  }
  render() {
    return (
      <div className="wrapper">
        {
          this.state.list.map((elmt, index) => {
            return (
              <Box key={index} img={elmt.model.thumb} texto={elmt.model.texto} />
            )
          })
        }
      </div>
    )
  }
}

Home.defaultProps = { nodes: data };

export default Home;
