import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    console.log("ComponentDidMount is hit...")
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then(res => {
      console.log("Received response from server...")
      console.log(res.data)
      this.setState({
        posts: res.data
      })
    }).catch(err => {
      console.log("We have an error in our componentDidMount lifecycle method.")
    })
  }

  updatePost(id, text) {
    let obj = {text: text}
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, obj).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => {
      console.log("We have an error in our updatePost function.")
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => {
      console.log("We have an error in our deletePost function.")
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text: text}).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => {
      console.log("We have an error in our createPost function.")
    })
  }

  render() {
    console.log("Rendering....")
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map( post => {
              return <Post key={post.id} text={post.text} date={post.date} id={post.id} updatePostFn={this.updatePost} deletePostFn={this.deletePost} />
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
