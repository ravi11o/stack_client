import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      console.log(err, data);
      if(err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }
  render() {
    var answer = this.props.answer;
    return (
      <>
        <div className="question-asnwers">
          <div className="votes-stars">
            <button onClick={() => props.handleAnswerUpvote(answer._id)}>Up</button>
            <h2>{answer.upvote}</h2>
            <button onClick={() => props.handleAnswerDownvote(answer._id)}>Down</button>
            <button className="star-button">Verfied</button>
          </div>
          <div className="description">
            <p>{answer.description}</p>
            <div className="share-edit-author">
              <p>share edit</p>
              <div className="question-author">
                <p>{`answered ${answer.updatedAt}`}</p>
                <div className="question-author-meta">
                  <img alt="a.jpg"></img>
                  <div className="question-author-details">
                    <p>{answer.authorId && answer.authorId.name}</p>
                    <p>10 *2</p>
                  </div>
                </div>
                <p>New Contributor</p>
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