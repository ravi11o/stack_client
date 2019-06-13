const LOADING = 'LOADING';
const QUESTIONS_LIST = 'QUESTIONS_LIST';
const SINGLE_QUESTION = 'SINGLE_QUESTION';
const SINGLE_QUESTION_TAGS = 'SINGLE_QUESTION_TAGS';

const initial_state = {
  questions: [],
  loading: false,
  question: {},
  tags: []
}

const questionReducer = (state = initial_state, action) => {
  switch(action.type) {
    case LOADING :
      return {
        ...state,
        loading: action.value
      }
    
    case QUESTIONS_LIST : 
      return {
        ...state,
        questions: action.value
      }

    case SINGLE_QUESTION :
      return {
        ...state,
        question: action.value
      }
    case SINGLE_QUESTION_TAGS :
      return {
        ...state,
        tags: action.value
      }  

    default : 
      return state;
  }
}

export default questionReducer;