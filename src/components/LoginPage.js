import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';

const LoginPage = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="signup-content">
          <h2>Login Form</h2>   
          <input 
            type="email"
            placeholder="Email Address"
          />
          <input 
            type="password"
            placeholder="Password"
          />
          <input 
            type="submit"
            value="Login"
          />     
        </div>
        <div className="featured">
          <Featured />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;