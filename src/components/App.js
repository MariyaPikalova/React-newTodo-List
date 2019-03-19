import React, { Component } from "react";
import TodoList from './TodoList.js';
import '../styles/index.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
       <TodoList/>
      </div>
    );
  }
}

export default App;