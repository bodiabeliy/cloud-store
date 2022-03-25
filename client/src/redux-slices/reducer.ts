import { combineReducers } from 'redux';
import userReducer from './UserSlice';
import fileReducer from './FileSlice ';

const reducer = combineReducers({
  user: userReducer,
  file: fileReducer,
});

export default reducer;
