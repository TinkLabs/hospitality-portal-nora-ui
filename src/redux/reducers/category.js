import { Map, List, Record, fromJS } from 'immutable'
import i18n from '../schema/i18n';

const initialState = Map({
  list: List(),
  total: 10,
})

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_CATEGORIES_FULFILLED": {
      const categories = action.payload.categories.results;
      const total = action.payload.categories.meta.total;
      return state.set('total', total).set('list', fromJS(categories));
    }
  }
  return state;
}

export default reducer;