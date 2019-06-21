import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from  "react-router-dom"; 
import { doRequestWithToken } from '../utils/auth';
const URL = 'http://localhost:4000/api/v1/search'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  logout() {
    localStorage.removeItem('stackApitoken');
    this.props.dispatch({
      type: 'LOGOUT_USER'
    })
    this.props.history.push('/');
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSearchSubmit(e) {
    if(e.key === 'Enter') {
      fetch(`${URL}?q=${encodeURIComponent(this.state.search)}`)
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: 'QUESTIONS_LIST',
          value: data.questions
        })
      })
    }
    return;
  }

  render() {
    const currentUser = this.props.currentUser;
    return (
      <div className="navbar">
        <div className="logo"><h2>LOGO</h2></div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search.."
            onChange={this.handleSearch}
            onKeyDown={this.handleSearchSubmit} 
          />
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