import React from 'react';
import data from './data'
import Box from './Box';
import Title from './Title';
import _ from 'lodash';

class Block extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className='block'>
        <Title ref={'title'} {...this.props.node}/>
        <div className='list'>
        {
          this.props.list.map((elmt, index) => {
            return (
              <Box ref={`box-${index}`} key={elmt.model.path} {...elmt.model} />
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default Block;
