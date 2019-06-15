import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute (props) {
  const {
    component: Component,
    ...rest
  } = props
  return (
    <Route {...rest} render={(props) => (
        localStorage.getItem('stackApitoken')
        ? <Component {...props} />
        : <Redirect to="/login" />
      )}
    />
  );
}



export default PrivateRoute;
