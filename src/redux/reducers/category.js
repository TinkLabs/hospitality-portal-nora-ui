import { Map, List, Record, fromJS } from 'immutable'

const CategoryRecord = Record({
  _id: "",
  name: "",
  gnavi_code: "",
  gnavi_attribute: "",
});

const initialState = Map({
  list: List()
})

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_CATEGORIES_FULFILLED": {
      const { categories } = action.payload;
      return state.set('list', fromJS(categories));
    }
  }
  return state;
}

export default reducer;