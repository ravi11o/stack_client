import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Question = ({ question }) => {
  return (
    <div className="questions">
      <div className="question-meta">
        <p>{`${question.upvote} Votes`}</p>
        <p>{`${question.answers.length} Answers`}</p>
        <p>{`${question.viewCount} Views`}</p>
      </div>
      <div className="question-info">
        <div className="question-name">
          <Link to={`/questions/${question._id}`}>
            <h3>{question.title}</h3>
          </Link>
        </div>
        <div className="question-tags-author">
          <div className="question-tags">Tags</div>
          <div className="question-author"><p>{`asked ${moment(question.createdAt).format('MMMM Do, h:mm a')}, ${question.authorId.name}`}</p></div>
        </div>
      </div>  
    </div>
  );
};

export default Question;
