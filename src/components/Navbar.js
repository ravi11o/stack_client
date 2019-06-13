import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo"><h2>LOGO</h2></div>
        <div className="search-bar">
          <input type="text" placeholder="Search.."></input>
        </div>
        <div className="user-info"><h2>Profile</h2></div>
    </div>
  )
};

export default Navbar;