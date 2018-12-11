import { combineReducers } from 'redux';

import restaurantReducer from "./restaurant";
import categoryReducer from './category';
import areaReducer from './area';
import uiReducer from './ui';
import syncReducer from './sync'

export default combineReducers({
  restaurant: restaurantReducer,
  categories: categoryReducer,
  areas: areaReducer,
  ui: uiReducer,
  sync: syncReducer,
});