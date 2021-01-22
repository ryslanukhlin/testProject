import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productsReducer from './productReducer';

const allReducers = combineReducers({
  userReducer,
  productsReducer,
});

export default allReducers;
