import { Map, List, Record, fromJS } from 'immutable'
import empty from 'is-empty';

import HotelRecord from '../schema/hotel';

const initialState = Map({
  map_currentHotel: HotelRecord({
    id: 0,
    name: "",
    lat: 0,
    lng: 0,
  }),
  list: List(),
  total: 0,
});

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_HOTEL_BY_ID_FULFILLED": {
      const hotels = action.payload.hotels.results;
      return state.set('map_currentHotel', HotelRecord({
        ...hotels[0]
      }));
    }
    case "FETCH_ALL_HOTELS_FULFILLED": {
      const hotels = action.payload.hotels.results;
      const total = action.payload.hotels.meta.total;
      return state.set('total', total).set('list', fromJS(hotels));
    }
  }
  return state;
}

export default reducer;