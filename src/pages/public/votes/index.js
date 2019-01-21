import React from 'react';
import { connect } from 'react-redux';

import { Marker, InfoWindow } from 'react-google-maps';
import Drawer from '@material-ui/core/Drawer';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import { Rating } from 'material-ui-rating';
import debounce from 'debounce';

import RestaurantMap from '../../../components/RestaurantMap';
import { fetchRestaurantsByLatLng, fetchHotelById, initCommentForm, upsertComment} from '../../../redux/actions';
import RestaurantRecord from '../../../redux/schema/restaurant';

import CommentForm from './components/CommentForm';
import NameForm from './components/NameForm';

import styles from './styles';

const loadingDiv = <div style={{ width: '100%', height: '100%', minHeight: '100%' }} />;

class Votes extends React.Component{
  
  constructor(props){
    super(props);
    this.renderRestaurants = this.renderRestaurants.bind(this);
    this.loadRestaurantDetail = this.loadRestaurantDetail.bind(this);
    
    this.onRestaurantMapCenterChange = this.onRestaurantMapCenterChange.bind(this);
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.onCommentFormClose = this.onCommentFormClose.bind(this);
    this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.state = {
      hotel_id: 0,
      lat: 43.068415,
      lng: 141.349416,
      selected: RestaurantRecord({}),
      showCommentForm: false,
      showNameForm: true,
      userName: '',
    };
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.currentHotel._id != prevState.hotel_id){
      return {
        hotel_id: nextProps.currentHotel.get('_id'),
        lat: nextProps.currentHotel.get('lat'),
        lng: nextProps.currentHotel.get('lng')
      };
    }
    return null;
  }
  
  componentDidMount(){
    this.props.initCommentForm(parseInt(this.props.match.params.hotel_token));
  }
  
  toggleCommentForm(open){
    this.setState({
      showCommentForm: open
    });
  }
  
  loadRestaurantDetail(restaurant){
    this.setState({
      selected: restaurant
    });
  }
  
  onRestaurantMapCenterChange(lat, lng){
    this.setState((prev) => {
      return {
        lat,
        lng
      };
    });
    console.log(`lat: ${lat}, lng ${lng}`);
    this.props.fetchRestaurantsByLatLng(lat, lng);
  }
  
  onRestaurantClick(restaurant){
    this.toggleCommentForm(true);
    this.loadRestaurantDetail(restaurant);
  }
  
  onCommentFormClose(){
    this.toggleCommentForm(false);
  }
  
  onCommentFormSubmit(restaurant, rating, comment){
    console.log(restaurant.get('_id'), rating, comment, this.state.userName);
    this.props.upsertComment({
      userName: this.state.userName,
      rating: rating,
      comment: comment,
      restaurant: restaurant,
    });
  }
  
  onNameSubmit(name){
    this.setState({
      userName: name
    });
    this.setState({
      showNameForm: false
    });
  }
  
  renderRestaurants(restaurants){
    return restaurants.map((restaurant) => {
      return (
        <Marker 
          key={restaurant._id} 
          onClick={(e) => {
            this.onRestaurantClick(restaurant)
          }}
          position={{ lat: parseFloat(restaurant.get('lat')), lng: parseFloat(restaurant.get('lng')) }}>
          <InfoWindow options={{disableAutoPan: true}}>
            <div>
              {restaurant.getIn(['name', 'ja_JP'])}
            </div>
          </InfoWindow>
        </Marker>
      );
    });
  }
  
  render(){
    console.log(this.props.currentHotel)
    let classes = this.props.classes;
    return (
      <div className={classes.fullPage}>
        <NameForm
          open={this.state.showNameForm}
          onNameSubmit={this.onNameSubmit}
        />
        <CommentForm
          open={this.state.showCommentForm}
          restaurant={this.state.selected}
          onClose={this.onCommentFormClose}
          onSubmit={this.onCommentFormSubmit}
        />
        <RestaurantMap 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
          loadingElement={loadingDiv}
          containerElement={loadingDiv}
          mapElement={loadingDiv}
          defaultZoom={20}
          center={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }}
          onRestaurantMapCenterChange={this.onRestaurantMapCenterChange}
          hotel={{lat: this.props.currentHotel.get('lat'), lng: this.props.currentHotel.get('lng')}}
        >
          {this.renderRestaurants(this.props.restaurants)}
        </RestaurantMap>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurant.get('mapList'),
    currentHotel: state.hotel.get('map_currentHotel'),
  }
}

const mapActionToProps = {
  fetchRestaurantsByLatLng,
  fetchHotelById,
  initCommentForm,
  upsertComment
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Votes));