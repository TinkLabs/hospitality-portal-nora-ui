import React from 'react';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { fetchCategories } from '../../../redux/actions';


class Category extends React.Component{
  
  componentDidMount(){
    this.props.fetchCategories();
  }
  
  render(){
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Restaurant</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    );
  }
  
}

const mapStateToProps = (state) => {
  let current = state.restaurant.get('current');
  let categories = state.categories.get('list');
  let areas = state.areas.get('list');
  return {
    current: current,
    categories: categories,
    areas: areas
  }
}

const mapActionToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapActionToProps)(Category);