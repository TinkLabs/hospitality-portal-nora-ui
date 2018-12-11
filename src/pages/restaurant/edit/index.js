import React from 'react';
import { connect } from 'react-redux';
import empty from 'is-empty';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { Marker } from 'react-google-maps';

import Typography from '@material-ui/core/Typography';

import { fetchRestaurant, fetchCategories, fetchAreas } from '../../../redux/actions';
import RestaurantRecord from '../../../redux/schema/restaurant';
import Map from '../../../components/Map';
import Checkbox from '../../../components/Checkbox';


const styles = (theme) => {
  return {
    inputBlock: {
      marginLeft: "5px",
      marginRight: "5px"
    },
    wrapper: {
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    multiBlock: {
      marginTop: "10px",
      marginBottom: "10px",
      display: "block"
    },
    submitButton: {
      marginTop: "10px",
      marginBottom: "20px"
    },
    coverImage: {
      width: "100%",
      borderRadius: "5px",
      height: "250px",
      objectFit: "cover",
    }
  }
}

const loadingDiv = <div style={{ width: '100%', height: `250px` }} />;

class RestaurantEdit extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      current: RestaurantRecord({}),
    }
  }
  
  componentDidMount(){
    console.log('componentDidMount');
    console.log(this.props);
    this.changeLocation = this.changeLocation.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeFax = this.onChangeFax.bind(this);
    this.onChangeIdd = this.onChangeIdd.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeUrlWebsite = this.onChangeUrlWebsite.bind(this);
    this.onChangeUrlReservation = this.onChangeUrlReservation.bind(this);
    this.onChangeUrlCoupon = this.onChangeUrlCoupon.bind(this);
    this.onChangeUrlQrcode = this.onChangeUrlQrcode.bind(this);
    this.onChangeInfoOpentime = this.onChangeInfoOpentime.bind(this);
    this.onChangeInfoHoliday = this.onChangeInfoHoliday.bind(this);
    this.onChangeInfoParty = this.onChangeInfoParty.bind(this);
    this.onChangeInfoLunch = this.onChangeInfoLunch.bind(this);
    this.onChangeInfoCc = this.onChangeInfoCc.bind(this);
    this.onChangeInfoEMoney = this.onChangeInfoEMoney.bind(this);
    this.onChangeAccessLine = this.onChangeAccessLine.bind(this);
    this.onChangeAccessStation = this.onChangeAccessStation.bind(this);
    this.onChangeAccessStationExit = this.onChangeAccessStationExit.bind(this);
    this.onChangeAccessNote = this.onChangeAccessNote.bind(this);
    this.onChangeAccessWalk = this.onChangeAccessWalk.bind(this);
    this.onChangeAccessParking = this.onChangeAccessParking.bind(this);
    this.props.fetchRestaurant(this.props.match.params.id);
    this.props.fetchCategories();
    this.props.fetchAreas();
  }
  
  static getDerivedStateFromProps( nextProps, prevState) {
    if(nextProps.current._id != prevState.current._id){
      return {'current': nextProps.current};
    }
    return null;
  }
  
  onChangeName(e){
    this.setState({
      current: this.state.current.set('name', e.target.value)
    });
  }
  
  onChangeBudget(e){
    this.setState({
      current: this.state.current.set('budget', e.target.value)
    });
  }
  
  onChangeLat(e){
    this.setState({
      current: this.state.current.set('lat', e.target.value)
    });
  }
  
  onChangeLng(e){
    this.setState({
      current: this.state.current.set('lng', e.target.value)
    });
  }
  
  onChangeTel(e){
    this.setState({
      current: this.state.current.set('tel', e.target.value)
    });
  }
  
  onChangeFax(e){
    this.setState({
      current: this.state.current.set('fax', e.target.value)
    });
  }
  
  onChangeIdd(e){
    this.setState({
      current: this.state.current.set('idd', e.target.value)
    });
  }
  
  onChangeDescription(e){
    this.setState({
      current: this.state.current.set('description', e.target.value)
    });
  }
  
  onChangeUrlWebsite(e){
    this.setState({
      current: this.state.current.set('url_website', e.target.value)
    });
  }
  
  onChangeUrlReservation(e){
    this.setState({
      current: this.state.current.set('url_reservation', e.target.value)
    });
  }
  
  onChangeUrlCoupon(e){
    this.setState({
      current: this.state.current.set('url_coupon', e.target.value)
    });
  }
  
  onChangeUrlQrcode(e){
    this.setState({
      current: this.state.current.set('url_qrcode', e.target.value)
    });
  }
  
  onChangeInfoOpentime(e){
    this.setState({
      current: this.state.current.set('info_opentime', e.target.value)
    });
  }
  
  onChangeInfoHoliday(e){
    this.setState({
      current: this.state.current.set('info_holiday', e.target.value)
    });
  }
  
  onChangeInfoParty(e){
    this.setState({
      current: this.state.current.set('info_party', e.target.value)
    });
  }
  
  onChangeInfoLunch(e){
    this.setState({
      current: this.state.current.set('info_lunch', e.target.value)
    });
  }
  
  onChangeInfoCc(e){
    this.setState({
      current: this.state.current.set('info_cc', e.target.value)
    });
  }
  
  onChangeInfoEMoney(e){
    this.setState({
      current: this.state.current.set('info_e_money', e.target.value)
    });
  }
  
  onChangeAccessLine(e){
    this.setState({
      current: this.state.current.set('access_line', e.target.value)
    });
  }
  
  onChangeAccessStation(e){
    this.setState({
      current: this.state.current.set('access_station', e.target.value)
    });
  }
  
  onChangeAccessStationExit(e){
    this.setState({
      current: this.state.current.set('access_station_exit', e.target.value)
    });
  }
  
  onChangeAccessNote(e){
    this.setState({
      current: this.state.current.set('access_note', e.target.value)
    });
  }
  
  onChangeAccessWalk(e){
    this.setState({
      current: this.state.current.set('access_walk', e.target.value)
    });
  }
  
  onChangeAccessParking(e){
    this.setState({
      current: this.state.current.set('access_parking', e.target.value)
    });
  }
  
  changeLocation(e){
    let current = this.state.current;
    current = current.set('lat', e.latLng.lat());
    current = current.set('lng', e.latLng.lng());
    this.setState({
      current: current
    });
    console.log(e.latLng.lat());
    console.log(e.latLng.lng())
  }
  
  render() {
    console.log(this.props);
    let current_restaurant = this.state.current;
    let categories = this.props.categories;
    const categoryCheckbox = categories.map(option => {
      return (<Checkbox value={option.get('_id')} label={option.get('name')} selected_id_set={current_restaurant.get('categories')} />);
    });
    let areas = this.props.areas;
    const areaCheckbox = areas.map(option => {
      return (<Checkbox value={option.get('_id')} label={option.get('name')} selected_id_set={current_restaurant.get('areas')} />);
    });
    return (
      <div>
        <div className={this.props.classes.wrapper}>
          <h1>{current_restaurant.name}</h1>
          <img src={current_restaurant.cover_image} className={this.props.classes.coverImage} />
          <form>
            <TextField
              id="id"
              label={"ID"}
              margin="normal"
              value={current_restaurant._id}
              fullWidth={true}
              className={this.props.classes.inputBlock}
              disabled={true}
            />
            <TextField
              id="name"
              label={"Name"}
              margin="normal"
              fullWidth={true}
              value={current_restaurant.name}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeName}
            />
            <FormControl component="fieldset" className={[this.props.classes.inputBlock, this.props.classes.multiBlock]}>
              <FormLabel component="legend">Categories</FormLabel>
              <FormGroup row={true}>
                {categoryCheckbox}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={[this.props.classes.inputBlock, this.props.classes.multiBlock]}>
              <FormLabel component="legend">Areas</FormLabel>
              <FormGroup row={true}>
                {areaCheckbox}
              </FormGroup>
            </FormControl>
            <Map 
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
              loadingElement={loadingDiv}
              containerElement={loadingDiv}
              mapElement={loadingDiv}
              center={{ lat: parseFloat(current_restaurant.lat), lng: parseFloat(current_restaurant.lng) }}
              onClick={this.changeLocation}
            >
              <Marker position={{ lat: parseFloat(current_restaurant.lat), lng: parseFloat(current_restaurant.lng) }} />
            </Map>
            <FormHelperText><Typography variant="caption">Right Click on the map to modify the latitude, longitude</Typography></FormHelperText>
            <TextField
              id="budget"
              label={"Budget"}
              margin="normal"
              value={current_restaurant.budget}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeBudget}
            />
            <TextField
              id="lat"
              label={"Latitude"}
              margin="normal"
              value={current_restaurant.lat}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeLat}
            />
            <TextField
              id="lng"
              label={"Longitude"}
              margin="normal"
              value={current_restaurant.lng}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeLng}
            />
            <TextField
              id="tel"
              label={"Tel"}
              margin="normal"
              value={current_restaurant.tel}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeTel}
            />
            <TextField
              id="fax"
              label={"Fax"}
              margin="normal"
              value={current_restaurant.fax}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeFax}
            />
            <TextField
              id="idd"
              label={"IDD"}
              margin="normal"
              value={current_restaurant.idd}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeIdd}
            />
            <TextField
              id="description"
              label={"Description"}
              margin="normal"
              multiline={true}
              fullWidth={true}
              value={current_restaurant.description}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeDescription}
            />
            <TextField
              id="url_website"
              label={"Website URL"}
              margin="normal"
              fullWidth={true}
              value={current_restaurant.url_website}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeUrlWebsite}
            />
            <TextField
              id="url_reservation"
              label={"Reservation URL"}
              margin="normal"
              fullWidth={true}
              value={current_restaurant.url_reservation}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeUrlReservation}
            />
            <TextField
              id="url_coupon"
              label={"Coupon URL"}
              margin="normal"
              fullWidth={true}
              value={current_restaurant.url_coupon}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeUrlCoupon}
            />
            <TextField
              id="url_qrcode"
              label={"QR Code URL"}
              margin="normal"
              fullWidth={true}
              value={current_restaurant.url_qrcode}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeUrlQrcode}
            />
            <TextField
              id="info_opentime"
              label={"Open Time"}
              margin="normal"
              value={current_restaurant.info_opentime}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoOpentime}
            />
            <TextField
              id="info_holiday"
              label={"Holiday"}
              margin="normal"
              value={current_restaurant.info_holiday}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoHoliday}
            />
            <TextField
              id="info_party"
              label={"Party"}
              margin="normal"
              value={current_restaurant.info_party}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoParty}
            />
            <TextField
              id="info_lunch"
              label={"Lunch"}
              margin="normal"
              value={current_restaurant.info_lunch}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoLunch}
            />
            <TextField
              id="info_cc"
              label={"Credit Card"}
              margin="normal"
              value={current_restaurant.info_cc}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoCc}
            />
            <TextField
              id="info_e_money"
              label={"E Money"}
              margin="normal"
              value={current_restaurant.info_c_money}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoEMoney}
            />
            <TextField
              id="access_line"
              label={"Line"}
              margin="normal"
              value={current_restaurant.access_line}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessLine}
            />
            <TextField
              id="access_station"
              label={"station"}
              margin="normal"
              value={current_restaurant.access_station}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessStation}
            />
            <TextField
              id="access_station_exit"
              label={"station_exit"}
              margin="normal"
              value={current_restaurant.access_station_exit}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessStationExit}
            />
            <TextField
              id="access_note"
              label={"Note"}
              margin="normal"
              value={current_restaurant.access_note}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessNote}
            />
            <TextField
              id="access_walk"
              label={"Walk"}
              margin="normal"
              value={current_restaurant.access_walk}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessWalk}
            />
            <TextField
              id="access_parking"
              label={"Parking"}
              margin="normal"
              value={current_restaurant.access_parking}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessParking}
            />
          </form>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth="true"
            className={this.props.classes.submitButton}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  let current = state.restaurant.get('current');
  let categories = state.categories.get('list');
  let areas = state.areas.get('list');
  return {
    current: current,
    categories: categories.toJSON(),
    areas: areas.toJSON()
  }
}

const mapActionToProps = {
  fetchRestaurant,
  fetchCategories,
  fetchAreas
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(RestaurantEdit));