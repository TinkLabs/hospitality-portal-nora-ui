import { Map, List, Record } from 'immutable'
import empty from 'is-empty';

import HotelRecord from '../schema/hotel';

const initialState = Map({
  map_currentHotel: HotelRecord({
    id: 0,
    name: "",
    lat: 0,
    lng: 0,
  })
});

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_HOTEL_BY_ID_FULFILLED": {
      const { hotels } = action.payload;
      return state.set('map_currentHotel', HotelRecord({
        ...hotels[0]
      }));
    }
  }
  return state;
}

export default reducer;