const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  currentUser: null
}

const currentUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_USER : 
      return {
        ...state,
        currentUser: action.value
      }
    case LOGOUT_USER : 
      return {
        ...state,
        currentUser: null
      }
        
    
    default: 
      return state;
  }
}

export default currentUserReducer;