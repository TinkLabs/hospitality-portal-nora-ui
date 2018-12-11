import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import Pagination from 'material-ui-pagination';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';


import { List } from 'react-content-loader';
import debounce from 'debounce';
import { Marker } from 'react-google-maps';

import { fetchAllRestaurants } from '../../../redux/actions';
import Map from '../../../components/Map';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    borderRadius: '10px',
    minHeight: 500,
    textAlign: 'center',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listItem: {
    alignItems: "stretch"
  },
  imageBlock: {
    height: 150,
    width: 150
  },
  listItemTitle: {
    display: "block",
    marginBottom: 10,
  },
  card: {
    margin: 20,
    width: 275,
    height: 400,
    display: "inline-block",
  },
  media: {
    height: 140,
  },
  cardContent: {
    textAlign: 'left',
    minHeight: 180,
    maxHeight: 180,
    overflow: "hidden",
  },
  searchSection: {
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    width: 200
  },
  pagination: {
    width: "fit-content",
    margin: "0 auto"
  },
  absolute: {
    position: 'fixed',
    bottom: 30,
    right: 30,
  },
});

const loadingDiv = <div style={{width:`80%` ,height: `100%` }} />;


class Restaurants extends React.Component{
  
  constructor(props){
    super(props);
    this.reloadRestaurants = debounce(this.reloadRestaurants.bind(this), 500);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      keyword: '',
      id: '',
      page_total: 10,
      page_current: 1,
      page_display: 10,
      current_lat: -34.397,
      current_lng: 150.644,
    }
  }
  
  componentDidMount(){
    this.props.fetchAllRestaurants();
  }
  
  onChangeName(e) {
    this.setState({
      keyword: e.target.value,
    }, () => {
      this.reloadRestaurants();
    })
  }
  
  onChangeId(e) {
    this.setState({
      id: e.target.value,
    }, () => {
      this.reloadRestaurants();
    })
  }
  
  onChangePage(current){
    this.setState({
      page_current: current,
    }, () => {
      this.reloadRestaurants();
    });
  }
  
  reloadRestaurants(){
    const { id, keyword, page_current } = this.state;
    this.props.fetchAllRestaurants(id, keyword, (page_current-1 ) * 10);
  }
  
  renderListItem(restaurants){
    console.log(restaurants);
    let classes = this.props.classes;
    return restaurants.map((restaurant) => {
      return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={(restaurant.get('cover_image')) ? restaurant.get('cover_image') : "https://cdn.pixabay.com/photo/2015/03/26/10/28/restaurant-691397_1280.jpg"}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {restaurant.get('name')}
            </Typography>
            <Typography variant="caption">
              ID: {restaurant.get('_id')}
            </Typography>
            <Typography component="p">
              {restaurant.get('description')}
            </Typography>
          </CardContent>
          <CardActions>
              <Button size="small" color="primary" onClick={() => {
                this.props.history.push(`/restaurant/edit/${restaurant.get('_id')}`)
              }}>
                Edit
              </Button>
            <Button size="small" color="primary" >
              Position
            </Button>
            <Button size="small" color="primary">
              Delete
            </Button>
          </CardActions>
        </Card>
      )
    })
  }
  
  render(){
    let classes = this.props.classes;
    return (
      <div>
        <div className={classes.searchSection}>
          <TextField
            id="standard-name"
            label="Keyword"
            margin="normal"
            value={this.state.keyword}
            className={classes.input}
            onChange={this.onChangeName}
          />
          <TextField
            id="standard-name"
            label="ID"
            margin="normal"
            value={this.state.id}
            className={classes.input}
            onChange={this.onChangeId}
          />
        </div>
        <div className={classes.root}>
          {this.renderListItem(this.props.restaurants)}
        </div>
        <div className={classes.pagination}>
          <Pagination 
            className={classes.pagination}
            total = {this.state.page_total}
            current = {this.state.page_current}
            onChange = {this.onChangePage}
            display = {5}
          />
        </div>
        <Tooltip title="Add" aria-label="Add">
          <Fab color="secondary" className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  }
  
}

let mapStateToProps = (state) => {
  return {
    restaurants: state.restaurant.get('list').toJSON(),
  };
}

let mapActionToProps = {
  fetchAllRestaurants
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Restaurants)));