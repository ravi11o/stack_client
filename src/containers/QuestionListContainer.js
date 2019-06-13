import React, { Component} from 'react';
import { connect } from 'react-redux';
import WelcomePage from '../components/WelcomePage';

const URL = 'http://localhost:4000/api/v1'

class QuestionsListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WelcomePage {...this.props} />
    )
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'LOADING',
      value: true
    })
    fetch(`${URL}/questions`)
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'QUESTIONS_LIST',
        value: data.questions 
      })
      this.props.dispatch({
        type: 'LOADING',
        value: false
      })
    })
  }
}

const mapStateToProps = (state) => {
  const questions = state.question.questions;
  const loading = state.question.loading;

  return {
    questions,
    loading
  }
}

const QuestionsList = connect(mapStateToProps)(QuestionsListContainer);

export default QuestionsList;