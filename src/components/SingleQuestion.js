import React, { Component } from 'react';
import SingleAnswer from './SingleAnswer';
import Comment from './Comment';
const URL = 'http://localhost:4000/api/v1'


class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionDownvote = this.handleQuestionDownvote.bind(this);
    this.answerUpvote = this.answerUpvote.bind(this);
    this.answerDownvote = this.answerDownvote.bind(this);
    this.handleStar = this.handleStar.bind(this);
  }

  handleQuestionUpvote = () => {
    fetch(`${URL}/questions/${this.props.match.params.id}/upvote`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleQuestionDownvote() {
    fetch(`${URL}/questions/${this.props.match.params.id}/downvote`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerUpvote(id) {
    fetch(`${URL}/questions/${this.props.match.params.id}/answers/${id}/upvote`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerDownvote(id) {
    fetch(`${URL}/questions/${this.props.match.params.id}/answers/${id}/downvote`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleStar() {
    fetch(`${URL}/questions/${this.props.match.params.id}/star`, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
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
          <p>add a comment</p>
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
          <textarea rows="20" className="post-answer"></textarea>
          <button className="submit-answer">Post Your Answer</button>
        </div>
      </div>
    </div>
    );
  }
}

export default SingleQuestion;