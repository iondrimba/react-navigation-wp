import React from 'react';
import data from './data'
import Box from './Box';
import Hero from './Hero';
import Title from './Title';
import _ from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      choices: [],
      location: "",
      currentQuetion: props.nodes.questions
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
  formatKey(key) {
    if (key.length > 1) {
      key = key.replace(/\//, '');
    }
    return key;
  }
  traverseChoices(nodes, path) {
    let output;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].path === path) {
        this.props.router.replace(nodes[i].questions[0].path);
        output = nodes[i].questions[0];
      } else if (output === undefined) {
        output = this.traverseQuestions(nodes[i].questions, path);
      }
    }
    return output;
  }
  traverseQuestions(nodes, path) {
    let output;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].path === path) {
        output = nodes[i];
      } else if (output === undefined) {
        return this.traverseChoices(nodes[i].choices, path);
      }
    }
    return output;
  }
  getQuestion(nodes, path) {
    if (path === "/") {
      this.props.router.push(nodes[0].path);
    }
    return this.traverseQuestions(nodes, this.formatKey(path));
  }
  show() {
    this.refs.title.animate();
    _.delay(() => {
      let count = 0;
      for (var child in this.refs) {
        if (this.refs.hasOwnProperty(child)) {
          this.refs[child].animate('fade-in', count);
          count++;
        }
      }
    }, 80);
  }
  filter(path) {
    let question = this.getQuestion(this.props.nodes.questions, path);
    let choices = question.choices;
    this.setState({ choices: choices, location: question.path, currentQuetion: question });

    this.show();
  }
  render() {
    return (
      <div className='wrapper'>
        <Hero />
        <Title ref={'title'} {...this.state.currentQuetion} />
        <div className='list'>
          {
            this.state.choices.map((elmt, index) => {
              return (
                <Box ref={`box-${index}`} key={elmt.path} {...elmt} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

Home.defaultProps = { nodes: data };

export default Home;
