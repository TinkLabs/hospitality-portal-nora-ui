import { Map, List, Record } from 'immutable'
import empty from 'is-empty';

import RestaurantRecord from '../schema/restaurant';

const initialState = Map({
  mapList: List(),
  list: List(),
  current: RestaurantRecord({
    _id: "",
    name: "",
    budget: "",
    staff_like_count: "",
    cover_image: "https://cdn.pixabay.com/photo/2015/03/26/10/28/restaurant-691397_1280.jpg",
    images: "",
    lat: 0,
    lng: 0,
    tel: "",
    fax: "",
    idd: "",
    address: "",
    description: "",
    url_website: "",
    url_reservation: "",
    url_coupon: "",
    url_qrcode: "",
    info_opentime: "",
    info_holiday: "",
    info_party: "",
    info_lunch: "",
    info_cc: "",
    info_e_money: "",
    access_line: "",
    access_station: "",
    access_station_exit: "",
    access_walk: "",
    access_note: "",
    access_parking: "",
  })
});

const reducer = ( state = initialState, action ) => {
  console.log(action);

  switch(action.type){
    case "FETCH_RESTAURANT_FULFILLED": {
      const { restaurants } = action.payload;
      let restaurant;
      if(empty(restaurants)){
        restaurant = RestaurantRecord({});
      }else{
        restaurant = RestaurantRecord({
          ...restaurants[0]
        });
      }
      return state.set('current', restaurant);
    }
    case "FETCH_ALL_RESTAURANTS_FULFILLED": {
      const { restaurants } = action.payload;
      let restaurantRecords = restaurants.map((restaurant) => {
        return RestaurantRecord({
          ...restaurant
        });
      });
      return state.set('list', List.of(...restaurantRecords));
    }
    case "FETCH_RESTAURANT_BY_LATLNG_FULFILLED": {
      const { restaurants } = action.payload;
      let restaurantRecords = restaurants.map((restaurant) => {
        return RestaurantRecord({
          ...restaurant
        });
      });
      return state.set('mapList', List.of(...restaurantRecords));
    }
  }
  return state;
}

export default reducer;