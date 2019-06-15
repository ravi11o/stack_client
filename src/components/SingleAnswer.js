import React from 'react';
import Comment from './Comment';

const SingleAnswer = (props) => {
  var answer = props.answer;
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
          <p>add a comment</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleAnswer;