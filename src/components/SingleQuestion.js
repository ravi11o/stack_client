import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleAnswer from './SingleAnswer';
import Comment from './Comment';
import { doRequestWithToken, fetchReputationScore } from '../utils/auth';
import moment from 'moment';
const URL = 'http://localhost:4000/api/v1'



class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      questionComment: '',
      answerComment: '',
      reputation: ''
    }
    this.handleQuestionDownvote = this.handleQuestionDownvote.bind(this);
    this.answerUpvote = this.answerUpvote.bind(this);
    this.answerDownvote = this.answerDownvote.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.questionCommentHandler = this.questionCommentHandler.bind(this);
    this.questionCommentPopup = this.questionCommentPopup.bind(this);
    this.questionCommentSubmit = this.questionCommentSubmit.bind(this);
    this.sortOldest = this.sortOldest.bind(this);
    this.sortRecent = this.sortRecent.bind(this);
    this.sortByVotes = this.sortByVotes.bind(this);
  }

  // componentWillReceiveProps(props, nextProps) {
  //   console.log(props, nextProps);
  //   if (props.singleQuestion && props.singleQuestion.authorId._id) {
  //     const fn = async () => {
  //       var reputation = await fetchReputationScore(this.props.singleQuestion.authorId._id);
  //       this.setState({
  //         reputation
  //       });
  //     };
  //     fn();
  //   }
  // }

  handleQuestionUpvote = () => {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/upvote`, 'POST', {}, (err, data) => {
      console.log(err, data);
      if(err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleQuestionDownvote() {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/downvote`, 'POST', {}, (err, data) => {
      if(err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerUpvote(id) {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers/${id}/upvote`, 'POST', {}, (err, data) => {
      if (err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  answerDownvote(id) {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers/${id}/downvote`, 'POST', {}, (err, data) => {
      if (err) return alert(err.message);
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })
  }

  handleStar() {
    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/star`, 'POST', {}, (err, data) => {
      if(err) return alert(err.message);
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
    this.setState(prevState => {
      return {
        answer: ''
      }
    })

    doRequestWithToken(`${URL}/questions/${this.props.match.params.id}/answers`, 'POST', answer, (err, data) => {
      if (err) return alert('Login to answer');
      this.props.dispatch({
        type: 'SINGLE_QUESTION',
        value: data.question
      })
    })

  }

  questionCommentPopup() {
    console.log(this.props.currentUser);
    if(!this.props.currentUser) {
      return alert('Login to comment on question');
    }
    var commentForm = document.getElementsByClassName('question-comment-form');
    commentForm[0].style.display = 'grid';
  }

  questionCommentHandler(e) {
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

  sortOldest() {
    fetch(`${URL}/questions/${this.props.match.params.id}?createdAt=1`)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'SINGLE_QUESTION',
          value: data.question
        })
      })
  }

  sortRecent() {
    fetch(`${URL}/questions/${this.props.match.params.id}?updatedAt=-1`)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'SINGLE_QUESTION',
          value: data.question
        })
      })
  }

  sortByVotes() {
    fetch(`${URL}/questions/${this.props.match.params.id}?upvote=-1`)
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
              tags.map((tag, i) => {
                return <p key={i}>{tag.tag.name}</p>;
              })
            }
          </div>
          <div className="share-edit-author">
            <p>share edit</p>
            <div className="question-author">
              <p>{`asked ${moment(question.createdAt).fromNow()}`}</p>
              <div className="question-author-meta">
                <img alt={`${question.authorId && question.authorId.username}.jpg`}></img>
                <div className="question-author-details">
                  <p>{question.authorId && question.authorId.name}</p>
                  <p>{question.authorId && question.authorId.reputationScore}</p>
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
              onChange={this.questionCommentHandler}  
              rows="4"
              value = {
                this.state.questionComment
              }
            >
            </textarea>
            <input 
              type="submit"   
              value="Add Comment" 
              onClick={this.questionCommentSubmit}
            />
          </div>
          <p onClick={this.questionCommentPopup}>add a comment</p>
        </div>
      </div>
      <div className="question-asnwers-wrapper">
        <div className="question-answers-meta">
          <h2>{question.answers && `${question.answers.length} Answers`}</h2>
          <div className="answers-meta">
            <p onClick={this.sortRecent}>active</p>
            <p onClick={this.sortOldest}>oldest</p>
            <p onClick={this.sortByVotes}>votes</p>
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
            value = {
              this.state.answer
            }
          >
          </textarea>
          <button className="submit-answer" onClick={this.handleAnswerSubmit}>Post Your Answer</button>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(state => ({currentUser: state.currentUser.currentUser}))(SingleQuestion);