import { Map, List, Record, fromJS } from 'immutable'
import i18n from '../schema/i18n';

const CategoryRecord = Record({
  _id: "",
  name: i18n,
  gnavi_code: "",
  gnavi_attribute: "",
});

const initialState = Map({
  list: List()
})

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_AREAS_FULFILLED": {
      const areas = action.payload.areas.results;
      return state.set('list', fromJS(areas));
    }
  }
  return state;
}

export default reducer;