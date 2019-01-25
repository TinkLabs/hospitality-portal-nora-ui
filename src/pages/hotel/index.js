import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import { fetchAllHotels } from '../../redux/actions';
import SearchBar from '../../components/SearchBar';
import styles from './styles';

class Hotel extends React.Component{
  
  constructor(props){
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      page: 0,
      recordPerPage: 20,
    }
  }
  
  componentDidMount(){
    this.props.fetchAllHotels(0, this.state.recordPerPage);
  }
  
  onChangePage(e, page){
    this.setState({
      page: page,
    });
    this.props.fetchAllHotels(page * this.state.recordPerPage, this.state.recordPerPage);
  }
  
  onSearch(attribute, value){
    this.props.fetchAllHotels(0, this.state.recordPerPage, parseInt(value));
  }
  
  renderHeader(){
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            {"ID"}
          </TableCell>
          <TableCell>
            {"Name"}
          </TableCell>
          <TableCell>
            {"Vote URL"}
          </TableCell>
          <TableCell>
            {"Latitude"}
          </TableCell>
          <TableCell>
            {"Longitude"}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  renderBody(){
    return (
      <TableBody>
      {
        this.props.hotels.map((hotel) => {
          return (
            <TableRow
              hover
              >
              <TableCell>
                {hotel.get('_id')}
              </TableCell>
              <TableCell>
                {hotel.get('name')}
              </TableCell>
              <TableCell>
                <div className={this.props.classes.url}>
                  {window.location.hostname }/#/public/vote/{hotel.get('vote_token')}
                </div>
              </TableCell>
              <TableCell>
                {hotel.get('lat')}
              </TableCell>
              <TableCell>
                {hotel.get('lng')}
              </TableCell>
            </TableRow>
          )
        })
      }
      </TableBody>
    );
  }
  
  render(){
    console.log(this.props.hotels);
    return (
      <div>
        <SearchBar
          label="ID"
          attributes={["ID"]}
          onSearch={this.onSearch}
        />
        <Table>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </Table>
      </div>
    );
  }
  
  renderFooter(){
    return (
      <TableRow>
        <TablePagination
          count={this.props.total}
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
  
}

const mapStateToProps = (state) => {
  return {
    hotels: state.hotel.get('list'),
    total: state.hotel.get('total')
  }
}

const mapActionToProps = {
  fetchAllHotels,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Hotel));