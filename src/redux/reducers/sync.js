import { Map, List, Record, fromJS } from 'immutable'

const SyncRecord = Record({
  _id: "",
  source: "",
  updated_at: "",
  status: "",
  total: 0,
  progress: 0,
});

const initialState = Map({
  list: List()
})

const reducer = ( state = initialState, action ) => {
  switch(action.type){
    case "FETCH_SYNC_STATUS_FULFILLED": {
      const { syncRecords } = action.payload;
      return state.set('list', fromJS(syncRecords));
    }
  }
  return state;
}

export default reducer;