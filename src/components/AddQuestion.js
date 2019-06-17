import React, { Component } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Featured from './Featured';
import { doRequestWithToken } from '../utils/auth';
const URL = 'http://localhost:4000/api/v1'


class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        title: '',
        description: '',
        tags: []
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    this.setState(prevState => {
      return {
        question : {
          ...prevState.question, [name]: value
        }
      }
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const question = this.state.question;
    doRequestWithToken(`${URL}/questions`, 'POST', question, (err, data) => {
      console.log(err, data);
      if(err) return alert(err);
      this.props.history.push('/questions');
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <h3>Create Question form</h3>
            <form className="add-question-form" onSubmit={this.handleFormSubmit} >
              <input 
                type="text"
                name="title"
                placeholder="Title.."
                value={this.state.question.title}
                onChange={this.handleChange}
              />
              <textarea
                name="description"
                placeholder="Describe your question.."
                rows="20"
                onChange={this.handleChange}
              >
                {this.state.question.description}
              </textarea>
              <input 
                type="text"
                name="tags"
                placeholder="Add tags.."
                value={this.state.question.tags}
                onChange={this.handleTagChange}
              />
              <input
                type="submit"
                value="Add Question"
              />
            </form>
          </div>
          <div className="featured">
            <Featured />
          </div>
        </div>
      </div>
    )
  }
}

export default AddQuestion;
