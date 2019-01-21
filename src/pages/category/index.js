import React from 'react';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { fetchCategories } from '../../redux/actions';

class Category extends React.Component{
  
  constructor(props){
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      page: 0
    };
  }
  
  componentDidMount(){
    this.props.fetchCategories(this.state.page * 20, 20);
  }
  
  onChangePage(e, page){
    this.setState({page: page});
    this.props.fetchCategories(this.state.page * 20, 20);
  }
  
  renderCategory(){
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            {"ID"}
          </TableCell>
          <TableCell>
            {"Category Name"}
          </TableCell>
          <TableCell>
            {"Gnavi code"}
          </TableCell>
          <TableCell>
            {"Gnavi attribute"}
          </TableCell>
          <TableCell>
            {"Actions"}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  renderBody(){
    return (
      <TableBody>
      {
        this.props.categories.map((category) => {
          return (
            <TableRow
              hover
              >
              <TableCell>
                {category.get('_id')}
              </TableCell>
              <TableCell>
                {category.getIn(['name', 'ja_JP'])}
              </TableCell>
              <TableCell>
                {category.get('gnavi_code')}
              </TableCell>
              <TableCell>
                {category.get('gnavi_attribute')}
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })
      }
      </TableBody>
    );
  }
  
  renderFooter(){
    return (
      <TableRow>
        <TablePagination
          count={this.props.total}
          rowsPerPage={20}
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
      <Table>
        {this.renderCategory()}
        {this.renderBody()}
        {this.renderFooter()}
      </Table>
    );
  }
  
}

const mapStateToProps = (state) => {
  let categories = state.categories.get('list');
  let total = state.categories.get('total');
  return {
    categories: categories,
    total: total,
  }
}

const mapActionToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapActionToProps)(Category);