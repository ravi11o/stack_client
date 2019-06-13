import React, { Component } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';
import SingleQuestion from './SingleQuestion';
import moment from 'moment';

const QuestionDetails = (props) => {
  var { loading } = props;
  var question = props.singleQuestion;
  return (
    <div className="wrapper">
    <Navbar />
    <div className="details-container">
      <Sidebar />
      <div className="details-content">
      {
        loading ?
          <h2>Loading...</h2>
        :
          <>
            <div className="question-title">
              <h1>{question.title}</h1>
              <button>Ask Question</button>
            </div>
            <hr />
            <div className="question-body">
              <SingleQuestion {...props} />
              <div className="question-metas">
                <p>{`asked ${moment(question.createdAt).fromNow()}`}</p>
                <p>{`viewed ${question.viewCount} times`}</p>
                <p>{`active ${moment(question.updatedAt).fromNow()}`}</p>
                <div className="featured">
                  <Featured />
                </div>
              </div>
            </div>
          </>
      }
        
      </div>
    </div>
  </div>
  )
  
};

export default QuestionDetails;