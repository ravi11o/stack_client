import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';

const SignUpPage = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="signup-content">
          <h2>SignUp Form</h2>
          <input 
            type="text"
            placeholder="Name"
          />    
          <input 
            type="text"
            placeholder="Username"
          />
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
            value="Register"
          />     
        </div>
        <div className="featured">
          <Featured />
        </div>

      </div>
    </div>
  );
}

export default SignUpPage;