import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleAnswer from './SingleAnswer';
import Comment from './Comment';
import { doRequestWithToken } from '../utils/auth';
const URL = 'http://localhost:4000/api/v1'



class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      questionComment: '',
      answerComment: ''
    }
    this.handleQuestionDownvote = this.handleQuestionDownvote.bind(this);
    this.answerUpvote = this.answerUpvote.bind(this);
    this.answerDownvote = this.answerDownvote.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.questionCommetHandler = this.questionCommetHandler.bind(this);
    this.questionCommetPopup = this.questionCommetPopup.bind(this);
    this.questionCommentSubmit = this.questionCommentSubmit.bind(this);
  }

  handleQuestionUpvote = () => {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/upvote`, 'POST', {}, (err, data) => {
      if(err) return alert('Login to upvote');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleQuestionDownvote() {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/downvote`, 'POST', {}, (err, data) => {
      if(err) return alert('Login to downvote');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerUpvote(id) {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers/${id}/upvote`, 'POST', {}, (err, data) => {
      if (err) return alert('Login to upvote answer');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerDownvote(id) {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers/${id}/downvote`, 'POST', {}, (err, data) => {
      if (err) return alert('Login to downvote answer');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleStar() {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/star`, 'POST', {}, (err, data) => {
      if(err) return alert('Login to star a question');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleAnswerChange(e) {
    this.setState({
      answer: e.target.value 
    })
  }

  handleAnswerSubmit(e) {
    var answer = {description: this.state.answer};
    this.setState({answer: ''})

    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers`, 'POST', answer, (err, data) => {
      if (err) return alert('Login to answer');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })

  }

  questionCommetPopup() {
    console.log(this.props.currentUser);
    if(!this.props.currentUser) {
      return alert('Login to comment on question');
    }
    var commentForm = document.getElementsByClassName('question-comment-form');
    commentForm[0].style.display = 'grid';
  }

  questionCommetHandler(e) {
    this.setState({
      questionComment: e.target.value
    })
  }

  questionCommentSubmit(e) {
    console.log(this.state.questionComment);
    var comment = {description: this.state.questionComment}
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/comments`, 'POST', comment, (err, data) => {
      if(err) return alert('Login to comment on questions');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })

  }

  render() {
    var question = this.props.singleQuestion;
    var tags = this.props.tags;
   
    return (
      <div className="question-details">
      <div className="question-description">
        <div className="votes-stars">
          <button onClick={this.handleQuestionUpvote}>Up</button>
          <h2>{question.upvote}</h2>
          <button onClick={this.handleQuestionDownvote}>Down</button>
          <button className="star-button" onClick={this.handleStar}>star</button>
          <h3>{question.stars}</h3>
        </div>
        <div className="description">
          <p className="describe">{question.description}</p>
          <div className="question-tagslist">
            {
              tags.map(tag => {
                return <p>{tag.tag.name}</p>;
              })
            }
          </div>
          <div className="share-edit-author">
            <p>share edit</p>
            <div className="question-author">
              <p>{`asked ${question.createdAt}`}</p>
              <div className="question-author-meta">
                <img alt="a.jpg"></img>
                <div className="question-author-details">
                  <p>{question.authorId && question.authorId.name}</p>
                  <p>10 *2</p>
                </div>
              </div>
              <p>New Contributor</p>
            </div>
          </div>
          <hr />
          {
            question.comments &&
            question.comments.map(comment => {
              return <Comment key={comment._id} comment={comment} />
            })
          }
          <div className="question-comment-form">
            <textarea 
              onChange={this.questionCommetHandler}  
              rows="4"
            >
              {this.state.questionComment}
            </textarea>
            <input 
              type="submit"   
              value="Add Comment" 
              onClick={this.questionCommentSubmit}
            />
          </div>
          <p onClick={this.questionCommetPopup}>add a comment</p>
        </div>
      </div>
      <div className="question-asnwers-wrapper">
        <div className="question-answers-meta">
          <h2>{question.answers && `${question.answers.length} Answers`}</h2>
          <div className="answers-meta">
            <p>active</p>
            <p>oldest</p>
            <p>votes</p>
          </div>
        </div>
        <hr />
        {
          question.answers &&
          question.answers.map(answer => {
            return (
              <SingleAnswer 
                answer={answer} 
                key={answer._id} 
                qid={this.props.match.params.id}
                handleAnswerUpvote={this.answerUpvote}
                handleAnswerDownvote={this.answerDownvote}
              />
            );
          })
        }
        <div className="create-answer-area">
          <h2>Your Answer</h2>
          <textarea 
            rows="20" 
            className="post-answer"
            onChange={this.handleAnswerChange}
          >
            {this.state.answer}
          </textarea>
          <button className="submit-answer" onClick={this.handleAnswerSubmit}>Post Your Answer</button>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(state => ({currentUser: state.currentUser.currentUser}))(SingleQuestion);