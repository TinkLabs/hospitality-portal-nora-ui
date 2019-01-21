import { Map, List, Record, fromJS } from 'immutable'

const initialState = Map({
  showMenu: false,
  title: "handy Restaurant",
  fetching: false,
  error: '',
  notifications: List(),
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
    case "POP_NOTIFICATION": {
      let notifications = state.get('notifications').remove(0);
      return state.set('notifications', notifications);
    }
    case "PUSH_NOTIFICATION": {
      let { content } = action.payload;
      let notifications = state.get('notifications').push(content);
      return state.set('notifications', notifications);
    }
    case "UPSERT_RESTAURANT_FULFILLED": {
      let notifications = state.get('notifications').push("Successfully perform restaurant update");
      return state.set('notifications', notifications);
    }
  }
  return state;
}

const loading = (state , action) => {
  let actions = action.type.split("_");
  if(["FULFILLED", "REJECTED"].includes(actions[actions.length -1 ])){
    state = state.set('fetching', false);
  }
  if(["PENDING"].includes(actions[actions.length -1 ])){
    state = state.set('fetching', true);
  }
  if(["REJECTED"].includes(actions[actions.length -1 ])){
    state = state.set('error', action.payload.message);
  }
  return state;
}

export default reducer;