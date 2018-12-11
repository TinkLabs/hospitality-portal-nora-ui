import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends React.Component{
  
  constructor(props){
    super(props);
    this.mapRef = null;
  }
  
  onCenterChanged(e){
    console.log('onCenterChanged');
    this.props.onCenterChanged(this.mapRef.getCenter().lat(), this.mapRef.getCenter().lng());
  }
  
  render(){
    return (
      <GoogleMap
        ref={(ref) => { this.mapRef = ref; }}
        zoom={20}
        center={this.props.center}
        defaultCenter={this.props.defaultCenter}
        onRightClick={this.props.onClick}
        onDragEnd={this.onCenterChanged.bind(this)}
      >
        {this.props.children}
      </GoogleMap>
    );
  }
  
}
export default withScriptjs(withGoogleMap(Map))