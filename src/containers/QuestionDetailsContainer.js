import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetails from '../components/QuestionDetails';
const URL = 'http://localhost:4000/api/v1';

class QuestionDetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QuestionDetails {...this.props} />
    )
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'LOADING',
      value: true
    })
    fetch(`${URL}/questions/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
      this.props.dispatch({
        type: 'SINGLE_QUESTION_TAGS',
        value: data.tags 
      })
      this.props.dispatch({
        type: 'LOADING',
        value: false
      })
    })
  }
}

const mapStateToProps = (state) => {
  const singleQuestion = state.question.question;
  const loading = state.question.loading;
  const tags = state.question.tags; 

  return {
    singleQuestion,
    loading,
    tags
  }
}

const SingleQuestion = connect(mapStateToProps)(QuestionDetailsPage);

export default SingleQuestion;