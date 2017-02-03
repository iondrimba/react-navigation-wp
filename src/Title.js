import React from 'react';
import _ from 'lodash';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      css:''
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.model.title!==nextProps.model.title) {
      this.setState({css:'fade-out'});
    }
  }
  shouldComponentUpdate(state) {
    if(state.model.title!==this.props.model.title) {
      return true;
    }
    return false;
  }
  animate() {
    _.delay(()=>{
      this.setState({css:'fade-in'});
      this.forceUpdate();
    },100);
  }
  getTitle() {
    let output = '';
    if(this.props.model) {
      output = this.props.model.title
    }
    return output;
  }
  render() {
    return (
      <div className={`title ${this.state.css}`}>
        <h1>{this.getTitle()}</h1>
      </div>
    )
  }
}

export default Title;
