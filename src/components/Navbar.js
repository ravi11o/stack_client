import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from  "react-router-dom"; 

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem('stackApitoken');
    this.props.dispatch({
      type: 'LOGOUT_USER'
    })
    this.props.history.push('/');
  }

  render() {
    const currentUser = this.props.currentUser;
    return (
      <div className="navbar">
        <div className="logo"><h2>LOGO</h2></div>
        <div className="search-bar">
          <input type="text" placeholder="Search.."></input>
        </div>
        {
          currentUser ?
            <div className="user-info">
              <Link to={`/users/${currentUser.username}`}><h3>{currentUser.name}</h3></Link>
              <button className="logout-button" onClick={this.logout} >Logout</button>
            </div>
          :
            <div className="user-info">
              <Link to="/login"><button className="login-button">Login</button></Link>
              <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
            </div>
        }
      </div>
    )
  }
  
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default withRouter(connect(state => ({currentUser: state.currentUser.currentUser}))(Navbar));