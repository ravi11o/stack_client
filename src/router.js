import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import QuestionsList from './containers/QuestionListContainer';
import QuestionDetails from './containers/QuestionDetailsContainer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
var URL = 'http://localhost:4000/api/v1/me'


class Root extends Component  {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var token = localStorage.getItem('stackApitoken');
    if(token) {
      fetch(URL, {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) return;
        this.props.dispatch({
          type: 'LOGIN_USER',
          value: data
        })
      })
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
      <Router>
        <div>
          <Route exact path="/" component={QuestionsList} />
          <Route exact path="/questions" component={QuestionsList} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/questions/:id" component={QuestionDetails} />
        </div>
      </Router>
    </Provider>
    );
  }
}

export default Root;