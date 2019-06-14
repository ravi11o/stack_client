import { combineReducers } from 'redux';
import questionReducer from './question';
import currentUserReducer from './currentUser';


const rootReducer = combineReducers({
  question : questionReducer,
  currentUser: currentUserReducer
});

export default rootReducer;