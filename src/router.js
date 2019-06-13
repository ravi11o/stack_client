import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import QuestionsList from './containers/QuestionListContainer';
import QuestionDetails from './containers/QuestionDetailsContainer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';


const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={QuestionsList} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/questions/:id" component={QuestionDetails} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      </Router>
    </Provider>
  );
};

export default Root;