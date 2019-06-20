import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Comment from './Comment';
import { doRequestWithToken } from '../utils/auth';
const URL = 'http://localhost:4000/api/v1'

class SingleAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerComment: ''
    }
    this.answerCommentHandler = this.answerCommentHandler.bind(this);
    this.answerCommentPopup = this.answerCommentPopup.bind(this);
    this.answerCommentSubmit = this.answerCommentSubmit.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
  }

  answerCommentPopup() {
    if(!this.props.currentUser) {
      return alert('Login to comment on answers');
    }
    var commentForm = document.getElementsByClassName('answer-comment-form');
    commentForm[0].style.display = 'grid';
  }

  answerCommentHandler(e) {
    this.setState({
      answerComment: e.target.value
    })
  }

  answerCommentSubmit() {
    var comment = {description: this.state.answerComment}
    doRequestWithToken(`${URL}/answers/${this.props.answer._id}/comments`, 'POST', comment, (err, data) => {
      if(err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  verifyAnswer () {
    doRequestWithToken(`${URL}/questions/${this.props.qid}/answers/${this.props.answer._id}/verify`, 'POST', {}, (err, data) => {
      console.log(err, data);
      if(err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  render() {
    var { answer } = this.props;
    return (
      <>
        <div className="question-asnwers">
          <div className="votes-stars">
            <button onClick={() => this.props.handleAnswerUpvote(answer._id)}>Up</button>
            <h2>{answer.upvote}</h2>
            <button onClick={() => this.props.handleAnswerDownvote(answer._id)}>Down</button>
            {
              answer.verified ? 
                <p>Verified</p>
              :
              <button className="star-button" onClick={this.verifyAnswer}>Verify</button>
            }
          </div>
          <div className="description">
            <p>{answer.description}</p>
            <div className="share-edit-author">
              <p>share edit</p>
              <div className="question-author">
                <p>{`answered ${moment(answer.createdAt).fromNow()}`}</p>
                <div className="question-author-meta">
                  <img alt={`${answer.authorId && answer.authorId.username}.jpg`}></img>
                  <div className="question-author-details">
                    <p>{answer.authorId && answer.authorId.name}</p>
                    <p>{answer.authorId && answer.authorId.reputationScore}</p>
                  </div>
                </div>
                {
                  (answer.authorId && answer.authorId.reputationScore) > 10 ?
                    "" 
                  :
                    <p>New Contributor</p>
                }
              </div>
            </div>
            <hr />
            {
              answer.comments && 
              answer.comments.map(comment => {
                return <Comment key={comment._id} comment={comment} />
              })
            }
            <div className="answer-comment-form">
              <textarea 
              onChange={this.answerCommentHandler}  
              rows="4"
              >
                {this.state.answerComment}
              </textarea>
              <input 
                type="submit"   
                value="Add Comment" 
                onClick={this.answerCommentSubmit}
              />
            </div>
            <p onClick={this.answerCommentPopup}>add a comment</p>
          </div>
        </div>
        <hr />
      </>
    );
  };
};

export default connect(state => ({currentUser: state.currentUser.currentUser}))(SingleAnswer);