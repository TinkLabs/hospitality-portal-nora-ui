import { Map, List, Record, fromJS } from 'immutable'

const initialState = Map({
  file_url: '',
});

const reducer = (state = initalState, action) => {
  switch(action.type){
    case "UPLOAD_FILE": {
      const url = action.payload.data;
      return state.setState({
        file_url: url,
      });
    }
  }
}

export default reducer;