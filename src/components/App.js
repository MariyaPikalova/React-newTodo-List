import React, { Component } from "react";
// import TodoList from './TodoList.js';
import TaskList from './TaskList.js';
import '../styles/index.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
       {/*<TodoList/>*/}
       <TaskList/>
      </div>
    );
  }
}

export default App;