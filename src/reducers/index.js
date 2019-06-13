import { combineReducers } from 'redux';
import questionReducer from './question'


const rootReducer = combineReducers({
  question : questionReducer
});

export default rootReducer;