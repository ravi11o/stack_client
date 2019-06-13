import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import QuestionsList from './containers/QuestionListContainer';
import QuestionDetails from './containers/QuestionDetailsContainer';


const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={QuestionsList} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/questions/:id" component={QuestionDetails} />
        </div>
      </Router>
    </Provider>
  );
};

export default Root;