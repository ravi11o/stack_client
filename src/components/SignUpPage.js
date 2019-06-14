import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';
const URL = 'http://localhost:4000/api/v1/users/register'

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        name: '',
        email: '',
        username: '',
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
        newUser : {
          ...prevState.newUser, [name]: value
        }
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var newUser = this.state.newUser;
    fetch(URL, 
    {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => this.props.history.push('/login'))
    .catch(err => this.props.history.push('/register'))
  }

  render() {
    return (
      <div className="wrapper">
      <Navbar />
      <div className="container">
        <Sidebar />
        <form className="signup-content" onSubmit={this.handleSubmit}>
          <h2>SignUp Form</h2>
          <input 
            type="text"
            name="name"
            value={this.state.newUser.name}
            onChange={this.handleChange}
            placeholder="Name"
          />    
          <input 
            type="text"
            name="username"
            value={this.state.newUser.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <input 
            type="email"
            name="email"
            value={this.state.newUser.email}
            onChange={this.handleChange}
            placeholder="Email Address"
          />
          <input 
            type="password"
            name="password"
            value={this.state.newUser.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <input 
            type="submit"
            value="Register"
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

export default SignUpPage;