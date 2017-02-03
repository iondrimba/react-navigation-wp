import React from 'react';
import data from './data'
import Hero from './Hero';
import Title from './Title';
import Block from './Block';
import _ from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      location: '/',
      currentNode: props.nodes['/']
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
            if (nodes[child].model.path === key) {
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
    return this.state.currentNode ? this.state.currentNode : this.props.nodes['/'];
  }
  show() {
    // this.refs.title.animate();    
    //  _.delay(()=> {   
    //   let count = 0;    
    //   for (var child in this.refs) {
    //     if (this.refs.hasOwnProperty(child)) {
    //        this.refs[child].animate('fade-in', count);
    //        count++;              
    //     }
    //   }
    // }, 100);
  }
  filter(key) {
    let list = this.getElements(this.props.nodes);
    this.setState({ list: list, location: key, currentNode:this.props.nodes['/'] });
    console.log(list);

    this.show();
  }
  render() {
    return (
      <div className='wrapper'>
        <Hero/>
        {
          this.state.list.map((elmt, index) => {
            return (
              <Block ref={`block-${index}`} key={index} node={elmt} list={this.getElements(elmt)} />
            )
          })
        }
      </div>
    )
  }
}

Home.defaultProps = { nodes: data };

export default Home;
