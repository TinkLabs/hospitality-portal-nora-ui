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
    categories: List(),
    areas: List(),
    images: List(),
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
  let current_restaurant;

  switch(action.type){
    case "UPSERT_RESTAURANT_FULFILLED":{
      const current_restaurant = action.payload.upsertRestaurant;
      let restaurant;
      if(empty(current_restaurant)){
        restaurant = RestaurantRecord({});
      } else {
        restaurant = RestaurantRecord({
          ...current_restaurant,
          categories: List(current_restaurant.categories),
          areas: List(current_restaurant.areas),
          images: List(current_restaurant.images),
        });
      }
      return state.set('current', restaurant);
    }
    case "FETCH_RESTAURANT_FULFILLED": {
      current_restaurant = !empty(action.payload.restaurants.results) ? action.payload.restaurants.results[0] : null;
      let restaurant;
      if(empty(current_restaurant)){
        restaurant = RestaurantRecord({});
      }else{
        restaurant = RestaurantRecord({
          ...current_restaurant,
          categories: List(current_restaurant.categories),
          areas: List(current_restaurant.areas),
          images: List(current_restaurant.images),
        });
      }
      return state.set('current', restaurant);
    }
    case "FETCH_ALL_RESTAURANTS_FULFILLED": {
      const restaurants = action.payload.restaurants;
      let restaurantRecords = restaurants.results.map((restaurant) => {
        return RestaurantRecord({
          ...restaurant
        });
      });
      return state.set('list', List.of(...restaurantRecords));
    }
    /*case "FETCH_ALL_RESTAURANTS_REJECTED": {
      const restaurants = action.payload.response.data.restaurants;
      let restaurantRecords = restaurants.results.map((restaurant) => {
        return RestaurantRecord({
          ...restaurant
        });
      });
      return state.set('list', List.of(...restaurantRecords));
    }*/
    case "FETCH_RESTAURANT_BY_LATLNG_FULFILLED": {
      const restaurants = action.payload.restaurants;
      let restaurantRecords = restaurants.results.map((restaurant) => {
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