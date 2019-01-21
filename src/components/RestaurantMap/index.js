import React from 'react';
import empty from 'is-empty';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import hotelMarker from '../../images/hotel.png';

class RestaurantMap extends React.Component{
  
  constructor(props){
    super(props);
    this.mapRef = null;
    this.delegate_onRestaurantMapCenterChange = this.delegate_onRestaurantMapCenterChange.bind(this);
  }
  
  delegate_onRestaurantMapCenterChange(){
    if(!empty(this.props.onRestaurantMapCenterChange)){
      this.props.onRestaurantMapCenterChange(this.mapRef.getCenter().lat(), this.mapRef.getCenter().lng());
    }
  }
  
  render(){
    console.log(this.props.hotel);
    let hotelMarkerDOM = null;
    if(!empty(this.props.hotel)){
      hotelMarkerDOM = (<Marker
        position={{ lat: this.props.hotel.lat, lng: this.props.hotel.lng }}
        icon={{
          url: hotelMarker,
          scaledSize: new window.google.maps.Size(35, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 50),
        }}
      />);
    }
    return (
      <GoogleMap
        ref = {(ref) => { this.mapRef = ref; }}
        onDragEnd = {this.delegate_onRestaurantMapCenterChange}
        {...this.props}
      >
        {hotelMarkerDOM}
        {this.props.children}
      </GoogleMap>
    );
  }
  
}

export default withScriptjs(withGoogleMap(RestaurantMap))