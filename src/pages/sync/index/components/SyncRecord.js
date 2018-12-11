import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme) => {
  return {
    wrapper: {
      padding: 20,
    },
    menu: {
      width: 200,
    },
  }
  
}

class SyncRecord extends React.Component{
  
  renderStatus(){
    if(this.props.status != 'in_progress'){
      return this.props.status;
    }
    return (
      <LinearProgress variant="determinate" value={100 * (this.props.progress / this.props.total)} />
    );
  }
  
  render(){
    return (
      <TableRow key={this.props._id}>
        <TableCell component="th" scope="row">
          {this.props._id}
        </TableCell>
        <TableCell >{this.props.source}</TableCell>
        <TableCell >{this.props.updated_at}</TableCell>
        <TableCell>{`${this.props.progress}/${this.props.total}`}</TableCell>
        <TableCell >
          {this.renderStatus()}
        </TableCell>
      </TableRow>
    );
  }
  
}

export default withStyles(styles)(SyncRecord);