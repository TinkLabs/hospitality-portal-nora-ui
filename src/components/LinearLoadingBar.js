import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearLoadingBar extends React.Component{
  
  render(){
    return (
      (this.props.visable) ? <LinearProgress /> : null
    );
  }
  
}

export default LinearLoadingBar;