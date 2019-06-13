import React from 'react';
import { Link } from  "react-router-dom"; 

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo"><h2>LOGO</h2></div>
        <div className="search-bar">
          <input type="text" placeholder="Search.."></input>
        </div>
        <div className="user-info">
          <Link to="/login"><button className="login-button">Login</button></Link>
          <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
          
        </div>
    </div>
  )
};

export default Navbar;