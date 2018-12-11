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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

let id =0;

function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class Sync extends React.Component{
  
  componentDidMount(){
    this.props.fetchSyncStatus();
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
                  source={syncRecord.get('source')} 
                  updated_at={moment(parseInt(syncRecord.get('updated_at'))).format("DD-MM-YYYY HH:mm:ss")}
                  status={syncRecord.get('status')}
                  total={syncRecord.get('total')}
                  progress={syncRecord.get('progress')} />
              );
            })}
          </TableBody>
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