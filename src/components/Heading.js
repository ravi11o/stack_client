import React from 'react';
import { Link } from 'react-router-dom';

const Heading = () => {
  return (
    <div className="heading">
      <div className="heading-1">
        <h2 className="heading-1">Top Questions</h2>
        <h4 className="heading-12">
          <Link to="/questions/new/create">
            <button>Ask Questions</button>
          </Link>
        </h4>
      </div>
      <div className="heading-2">
        <div className="heading-21"></div>
        <div className="heading-22">
          <p>Interesting</p>
          <p>featured</p>
          <p>Hot</p>
          <p>Week</p>
          <p>Month</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;