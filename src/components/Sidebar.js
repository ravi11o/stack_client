import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p><Link to="/" >Home</Link></p>
      <p>PUBLIC</p>
      <p><Link to="/questions" ><strong>Stack Overflow</strong></Link></p>
      <p>Tags</p>
      <p>Users</p>
      <p>Jobs</p>
    </div>
  );
};

export default Sidebar;