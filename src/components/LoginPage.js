import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';
const URL = 'http://localhost:4000/api/v1/users'

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    this.setState(prevState => {
      return {
        loginUser : {
          ...prevState.loginUser, [name]: value
        }
      }
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    var loginUser = this.state.loginUser;
    fetch(`${URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) return this.props.history.push('/login');
      localStorage.setItem("stackApitoken", JSON.stringify(data.token));
      fetch(`${URL}/me`, {
        headers : {'Authorization': data.token}
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) return this.props.history.push('/login');
        this.props.dispatch({
          type: 'LOGIN_USER',
          value: data
        })
        this.props.history.push('/')
      })
    })
  }

  componentDidMount() {
    var token = localStorage.getItem("stackApiToken");
    if(token) {
      fetch(`${URL}/me`, {
        headers : {'Authorization': JSON.parse(token)}
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) return this.props.history.push('/login');
        this.props.dispatch({
          type: 'LOGIN_USER',
          value: data
        })
        this.props.history.push('/')
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
      <Navbar />
      <div className="container">
        <Sidebar />
        <form className="signup-content" onSubmit={this.handleSubmit} >
          <h2>Login Form</h2>   
          <input 
            type="email"
            name="email"
            value={this.state.loginUser.email}
            onChange={this.handleChange}
            placeholder="Email Address"
          />
          <input 
            type="password"
            name="password"
            value={this.state.loginUser.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <input 
            type="submit"
            value="Login"
          />     
        </form>
        <div className="featured">
          <Featured />
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  var currentUser = state.currentUser.currentUser;
  return {
    currentUser
  }
}

const LoginPage = connect(mapStateToProps)(LoginContainer);

export default LoginPage;