import React from 'react';

class Title extends React.Component {
  shouldComponentUpdate(a,b) {
    
    if(a.model.title!==this.props.model.title) {
      console.log('update', a.model.title,this.props.model.title)
      return true;
    }
    return false;
  }
  getTitle() {
    let output = '';
    if(this.props.model) {
      output = this.props.model.title
    }
    return output;
  }
  render() {
    console.log('title', this.props.model.title);
    return (
      <div className="title">
        <h1>{this.getTitle()}</h1>
      </div>
    )
  }
}

export default Title;
