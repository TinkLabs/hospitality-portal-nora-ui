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

import Map from '../../../components/Map';
import { fetchRestaurantsByLatLng } from '../../../redux/actions';

const loadingDiv = <div style={{ width: '100%', height: '100%', minHeight: '100%' }} />;

const styles = (theme) => {
  return {
    fullPage: {
      height: '100%',
    },
    form: {
      width: 500,
    },
    wrapper: {
      width: '80%',
      margin: "0 auto",
      marginTop: 20,
    },
    inputBlock:{
      fontSize: "1em",
      marginLeft: 10,
      marginRight: 10,
    },
    container: {
      flexWrap: 'wrap',
    },
    coverImg: {
      width: '100%',
      height: 200,
      objectFit: "cover",
      borderRadius: 5,
    },
    submitButton: {
      marginTop: 20,
    },
    title:{
      marginTop: 10,
      paddingLeft: 5,
    },
    caption: {
      paddingLeft: 5,
    },
    rating: {
      display: "block",
    },
    ratingBlock:{
      display: "block",
      marginTop: 25,
      marginLeft: 10,
    },
    ratingLabel: {
      fontSize: "1.5vh",
    }
  }
}

class Votes extends React.Component{
  
  constructor(props){
    super(props);
    this.onCenterChanged = debounce(this.onCenterChanged.bind(this), 1000);
    this.renderRestaurants = this.renderRestaurants.bind(this);
    this.state = {
      lat: 43.068415,
      lng: 141.349416
    };
  }
  
  componentDidMount(){
    this.props.fetchRestaurantsByLatLng(this.state.lat,this.state.lng);
  }
  
  onCenterChanged(lat, lng){
    this.setState({
      lat,
      lng
    });
    console.log(`lat: ${lat}, lng ${lng}`);
    this.props.fetchRestaurantsByLatLng(lat, lng);
  }
  
  renderRestaurants(restaurants){
    return restaurants.map((restaurant) => {
      return (
        <Marker
          noRedraw
          position={{ lat: parseFloat(restaurant.get('lat')), lng: parseFloat(restaurant.get('lng')) }} 
        >
          <InfoWindow>
            <div>{restaurant.get('name')}</div>
          </InfoWindow>
        </Marker>
      );
    });
  }
  
  render(){
    let classes = this.props.classes;
    return (
      <div className={classes.fullPage}>
        <Drawer anchor="right" open={false}>
          <div className={classes.form}>
            <div className={classes.wrapper}>
              <img className={classes.coverImg} src={"https://www.godairyfree.org/wp-content/uploads/2012/06/blossomcafe.jpg"} />
              <Typography variant="headline" className={classes.title}>GNAVI</Typography>
              <Typography variant="caption" className={classes.caption}>26 Marvin Dr #C2 Newark, Delaware(DE), 19713</Typography>
              <Typography variant="caption" className={classes.caption}>(302) 292-0651</Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.ratingBlock}>
                  <Typography variant="caption" className={classes.ratingLabel}>Rating</Typography>
                  <Rating
                    className={classes.rating}
                    value={1}
                    max={3}
                    onChange={(value) => console.log(`Rated with value ${value}`)}
                    variant="outlined"
                  />
                </div>
                <TextField
                  id="standard-uncontrolled"
                  label="Comment"
                  defaultValue="foo"
                  margin="normal"
                  fullWidth={true}
                  multiline={true}
                  rows="8"
                  className={classes.inputBlock}
                />
                <Button variant="contained" color="primary" fullWidth={true} className={classes.submitButton}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </Drawer>
        <Map 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
          loadingElement={loadingDiv}
          containerElement={loadingDiv}
          mapElement={loadingDiv}
          defaultCenter={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }}
          onCenterChanged={this.onCenterChanged}
        >
          {this.renderRestaurants(this.props.restaurants)}
        </Map>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurant.get('mapList'),
  }
}

const mapActionToProps = {
  fetchRestaurantsByLatLng
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Votes));