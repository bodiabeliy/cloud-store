import { combineReducers } from 'redux';
import visitReducer from './VisitSlice';

const reducer = combineReducers({
  visit: visitReducer,
});

export default reducer;
