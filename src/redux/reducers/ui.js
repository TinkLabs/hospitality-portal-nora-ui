import { Map, List, Record, fromJS } from 'immutable'

const initialState = Map({
  showMenu: false,
  title: "handy Restaurant",
  fetching: false,
});

const reducer = ( state = initialState, action ) => {
  console.log('receiving action '+action.type);
  console.log(action);
  
  state = loading(state, action);
  
  switch(action.type){
    case "TOGGLE_MENU": {
      console.log(state);
      const { show } = action.payload;
      console.log(state.set('showMenu', show));
      return state.set('showMenu', show);
    }
  }
  return state;
}

const loading = (state , action) => {
  let actions = action.type.split("_");
  if(["FULFILLED", "REJECTED"].includes(actions[actions.length -1 ])){
    return state.set('fetching', false);
  }
  if(["PENDING"].includes(actions[actions.length -1 ])){
    return state.set('fetching', true);
  }
  return state;
}

export default reducer;