import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import LinearProgress from '@material-ui/core/LinearProgress';

import SyncRecord from './components/SyncRecord';
import { fetchSyncStatus } from '../../../redux/actions';


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


class Sync extends React.Component{
  
  constructor(props){
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      total: 100,
      recordPerPage: 10,
      page: 0,
    }
  }
  
  onChangePage(e){
    console.log(e);
  }
  
  componentDidMount(){
    this.props.fetchSyncStatus();
  }
  
  renderFooter(){
    return (
      <TableRow>
        <TablePagination
          count={this.state.total}
          rowsPerPage={this.state.recordPerPage}
          page={this.state.page}
          onChangePage={this.onChangePage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
        />
      </TableRow>
    );
  }
  
  render(){
    return (
      <div className={this.props.classes.wrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Batch ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.syncRecords.map(syncRecord => {
              console.log(syncRecord);
              return (
                <SyncRecord 
                  _id={syncRecord.get('_id')} 
                  source={syncRecord.get('title')} 
                  updated_at={moment(parseInt(syncRecord.get('updated_at'))).format("DD-MM-YYYY HH:mm:ss")}
                  status={syncRecord.get('status')}
                  total={syncRecord.get('total')}
                  progress={syncRecord.get('progress')} />
              );
            })}
          </TableBody>
          {this.renderFooter()}
        </Table>
      </div>
    );
  }
  
}

let mapStateToProps = (state) => {
  console.log(state.sync.get('list').toJSON());
  return {
    syncRecords: state.sync.get('list').toJSON(),
  };
};

let mapActionToProps = {
  fetchSyncStatus
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Sync));