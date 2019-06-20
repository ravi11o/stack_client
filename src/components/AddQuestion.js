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
      },
      tag: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.addTagHandler = this.addTagHandler.bind(this);
    this.HandleDeleteTag = this.HandleDeleteTag.bind(this);
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

  handleTagChange(e) {
    this.setState({tag: e.target.value})
  }

  addTagHandler(e) {
    e.preventDefault()
    this.setState(prevState => {
      return {
        question : {
          ...prevState.question, tags: prevState.question.tags.concat(prevState.tag)
        },
        tag: ''
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

  HandleDeleteTag(e, index) {
    e.preventDefault();
    const tags = this.state.question.tags.filter((tag, idx) => index !== idx)
    this.setState(prevState => {
      return {
        question : {
          ...prevState.question,
          tags: prevState.question.tags.filter((tag, idx) => index !== idx)
        }
      }
    })
  }

  render() {
    var tags = this.state.question.tags.map((tag, index) => {
      return (
        <div key={index} className="single-tags">
          <p>{tag}</p>
          <button
            onClick={(e) => this.HandleDeleteTag(e, index)}
          >
          X
          </button>
        </div>
      )
    })
    console.log(this.state.question);
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
              <div className="tags-input">
                <input 
                  type="text"
                  name="tags"
                  placeholder="Add tags.."
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                />
                <button onClick={this.addTagHandler}>Add Tag</button>
              </div>
              
              <div className="input-tagslist">
                {tags}
              </div>
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
