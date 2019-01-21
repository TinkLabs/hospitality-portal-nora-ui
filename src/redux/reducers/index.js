import { combineReducers } from 'redux';

import restaurantReducer from "./restaurant";
import categoryReducer from './category';
import areaReducer from './area';
import uiReducer from './ui';
import syncReducer from './sync'
import hotelReducer from './hotel';

export default combineReducers({
  restaurant: restaurantReducer,
  categories: categoryReducer,
  areas: areaReducer,
  hotel: hotelReducer,
  ui: uiReducer,
  sync: syncReducer,
});