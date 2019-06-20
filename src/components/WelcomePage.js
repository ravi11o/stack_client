import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Heading from './Heading';
import Question from './Question';
import Featured from './Featured';

const WelcomePage = ({ questions, loading }) => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <Heading />
          <hr />
          {
            loading ?
              <h3>Loading...</h3>
            :
              <div className="questions-list">
                {
                  questions.map(question => {
                    return <Question key={question._id} question={question} />;
                  })
                }        
              </div>
          }
          
        </div>
        <div className="featured">
          <Featured />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;