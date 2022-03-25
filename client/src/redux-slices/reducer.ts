import { combineReducers } from 'redux';
import visitReducer from './VisitSlice';
import userReducer from './UserSlice';
import fileReducer from './FileSlice ';

const reducer = combineReducers({
  visit: visitReducer,
  user: userReducer,
  file: fileReducer,
});

export default reducer;
