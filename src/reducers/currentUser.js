const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  currentUser: {}
}

const currentUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_USER : 
      return {
        ...state,
        currentUser: action.value
      }
        
    
    default: 
      return state;
  }
}

export default currentUserReducer;