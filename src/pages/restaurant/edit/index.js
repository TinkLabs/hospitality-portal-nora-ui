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
import Chip from '@material-ui/core/Chip';

import { withStyles } from '@material-ui/core/styles';
import { Marker } from 'react-google-maps';

import Typography from '@material-ui/core/Typography';

import { fetchRestaurant, fetchCategories, fetchAreas, upsertRestaurant } from '../../../redux/actions';
import RestaurantRecord from '../../../redux/schema/restaurant';
import RestaurantMap from '../../../components/RestaurantMap';
import Checkbox from '../../../components/Checkbox';
import AutoCompleteWithChip from '../../../components/AutoCompleteWithChip/index';
import ImagePicker from '../../../components/ImagePicker/index';
import FileUploadDialog from '../../../components/FileUploadDialog';
import styles from './styles';

const loadingDiv = <div style={{ width: '100%', height: `250px` }} />;

class RestaurantEdit extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      current: RestaurantRecord({}),
      selected_language: "ja_JP",
      show_uploadDialog: false,
    }
  }
  
  componentDidMount(){
    this.onImageAdd = this.onImageAdd.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onCloseUploadDialog = this.onCloseUploadDialog.bind(this);
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
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onRestaurantSubmit = this.onRestaurantSubmit.bind(this);
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
  
  onImageDelete(item, index){
    let images = this.state.current.get('images').remove(index);
    this.setState({
      current: this.state.current.setIn(['images'], images),
    });
  }
  
  onImageAdd(){
    this.setState({
      show_uploadDialog: true,
    });
  }
  
  onImageUpload(image_url){
    let images = this.state.current.get('images').push(image_url);
    this.setState({
      current: this.state.current.setIn(['images'], images),
      show_uploadDialog: false,
    })
  }
  
  onCloseUploadDialog(){
    this.setState({
      show_uploadDialog: false,
    })
  }
  
  onChangeName(e){
    this.setState({
      current: this.state.current.setIn(['name', this.state.selected_language], e.target.value)
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
      current: this.state.current.setIn(['description', this.state.selected_language], e.target.value)
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
      current: this.state.current.setIn(['info_opentime', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeInfoHoliday(e){
    this.setState({
      current: this.state.current.setIn(['info_holiday', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeInfoParty(e){
    this.setState({
      current: this.state.current.setIn(['info_party', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeInfoLunch(e){
    this.setState({
      current: this.state.current.setIn(['info_lunch', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeInfoCc(e){
    this.setState({
      current: this.state.current.setIn(['info_cc', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeInfoEMoney(e){
    this.setState({
      current: this.state.current.setIn(['info_e_money', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessLine(e){
    this.setState({
      current: this.state.current.setIn(['access_line', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessStation(e){
    this.setState({
      current: this.state.current.setIn(['access_station', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessStationExit(e){
    this.setState({
      current: this.state.current.setIn(['access_station_exit', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessNote(e){
    this.setState({
      current: this.state.current.setIn(['access_note', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessWalk(e){
    this.setState({
      current: this.state.current.setIn(['access_walk', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeAccessParking(e){
    this.setState({
      current: this.state.current.setIn(['access_parking', this.state.selected_language], e.target.value)
    });
  }
  
  onChangeArea(toggle, area){
    if(toggle){
      this.setState({
        current: this.state.current.set('areas' ,this.state.current.get('areas').insert(0, {_id: area.get('_id')})),
      });
    }else{
      let delete_index = this.state.current.get('areas').findIndex((area_item)=>{
        return area_item._id == area.get('_id');
      });
      this.setState({
        current: this.state.current.set('areas', this.state.current.get('areas').delete(delete_index))
      })
    }
  }
  
  onChangeCategory(toggle, category){
    if(toggle){
      this.setState({
        current: this.state.current.set('categories' ,this.state.current.get('categories').insert(0, {_id: category.get('_id')})),
      });
    }else{
      let delete_index = this.state.current.get('categories').findIndex((category_item) => {
        return category_item._id == category.get('_id');
      });
      this.setState({
        current: this.state.current.set('categories', this.state.current.get('categories').delete(delete_index))
      })
    }
    
  }
  
  onRestaurantSubmit(){
    let json_restaurant = ({
      ...this.state.current.toJSON(), 
      categories: this.state.current.categories.toJSON(),
      areas: this.state.current.areas.toJSON()
    });
    this.props.upsertRestaurant(json_restaurant);
    this.setState({
      reload: true,
    });
  }
  
  changeLocation(e){
    let current = this.state.current;
    current = current.set('lat', e.latLng.lat());
    current = current.set('lng', e.latLng.lng());
    this.setState({
      current: current
    });
  }
  
  render() {
    console.log('rendering');
    let current_restaurant = this.state.current;
    let categories = this.props.categories;
    let selected_language = this.state.selected_language;
    const categoryOptions = categories.map((category) => {
      return {
        value: category.get('_id'),
        label: category.getIn(['name', 'ja_JP'])
      };
    })
    const categoryValues = current_restaurant.get('categories').map((category) => {
      return {
        value: category._id,
        label: category.name.ja_JP
      }
    }).toJSON();
    let areas = this.props.areas;
    const areaOptions = areas.map((area) => {
      return {
        value: area.get('_id'),
        label: area.getIn(['name', 'ja_JP'])
      }
    });
    const areaValues = current_restaurant.get('areas').map((area) => {
      return {
        value: area._id,
        label: area.name.ja_JP
      }
    }).toJSON();
    console.log('images:', current_restaurant.get('images'));
    const images = current_restaurant.get('images').map((image) => {
      return {
        src: image,
      };
    }).toJSON();
    return (
      <div>
        <FileUploadDialog open={this.state.show_uploadDialog} onClose={this.onCloseUploadDialog} onSubmit={this.onImageUpload}/>
        <div className={this.props.classes.wrapper}>
          <h1>{current_restaurant.getIn(['name', this.state.selected_language])}</h1>
          <img src={current_restaurant.cover_image} className={this.props.classes.coverImage} />
          <ImagePicker items={images} onImageAdd={this.onImageAdd} onImageDelete={this.onImageDelete}/>
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
              value={current_restaurant.getIn(['name', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeName}
            />
            <div className={this.props.classes.inputBlock}>
              <AutoCompleteWithChip 
                title={"Category"}
                options={categoryOptions}
                selected={categoryValues}
              />
            </div>
            <div className={this.props.classes.inputBlock}>
              <AutoCompleteWithChip 
                title={"Area"}
                options={areaOptions}
                selected={areaValues}
              />
            </div>
            <div className={this.props.classes.inputBlock}>
              <RestaurantMap 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
                loadingElement={loadingDiv}
                containerElement={loadingDiv}
                mapElement={loadingDiv}
                defaultZoom={20}
                center={{ lat: parseFloat(current_restaurant.lat), lng: parseFloat(current_restaurant.lng) }}
                onRightClick={this.changeLocation}
              >
                <Marker position={{ lat: parseFloat(current_restaurant.lat), lng: parseFloat(current_restaurant.lng) }} />
              </RestaurantMap>
              <FormHelperText><Typography variant="caption">Right Click on the map to modify the latitude, longitude</Typography></FormHelperText>
            </div>
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
              value={current_restaurant.getIn(['description', this.state.selected_language])}
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
              value={current_restaurant.getIn(['info_opentime', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoOpentime}
            />
            <TextField
              id="info_holiday"
              label={"Holiday"}
              margin="normal"
              value={current_restaurant.getIn(['info_holiday', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoHoliday}
            />
            <TextField
              id="info_party"
              label={"Party"}
              margin="normal"
              value={current_restaurant.getIn(['info_party', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoParty}
            />
            <TextField
              id="info_lunch"
              label={"Lunch"}
              margin="normal"
              value={current_restaurant.getIn(['info_lunch', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoLunch}
            />
            <TextField
              id="info_cc"
              label={"Credit Card"}
              margin="normal"
              value={current_restaurant.getIn(['info_cc', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoCc}
            />
            <TextField
              id="info_e_money"
              label={"E Money"}
              margin="normal"
              value={current_restaurant.getIn(['info_e_money', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeInfoEMoney}
            />
            <TextField
              id="access_line"
              label={"Line"}
              margin="normal"
              value={current_restaurant.getIn(['access_line', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessLine}
            />
            <TextField
              id="access_station"
              label={"station"}
              margin="normal"
              value={current_restaurant.getIn(['access_station', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessStation}
            />
            <TextField
              id="access_station_exit"
              label={"station_exit"}
              margin="normal"
              value={current_restaurant.getIn(['access_station_exit', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessStationExit}
            />
            <TextField
              id="access_note"
              label={"Note"}
              margin="normal"
              value={current_restaurant.getIn(['access_note', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessNote}
            />
            <TextField
              id="access_walk"
              label={"Walk"}
              margin="normal"
              value={current_restaurant.getIn(['access_walk', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessWalk}
            />
            <TextField
              id="access_parking"
              label={"Parking"}
              margin="normal"
              value={current_restaurant.getIn(['access_parking', this.state.selected_language])}
              className={this.props.classes.inputBlock}
              onChange={this.onChangeAccessParking}
            />
          </form>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth="true"
            className={this.props.classes.submitButton}
            onClick={this.onRestaurantSubmit}
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
    categories: categories,
    areas: areas
  }
}

const mapActionToProps = {
  fetchRestaurant,
  fetchCategories,
  fetchAreas,
  upsertRestaurant,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(RestaurantEdit));