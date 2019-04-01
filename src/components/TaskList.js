import React, { Component } from "react";
import { connect } from 'react-redux';
import { addTask, deleteTask, filterTask , filterDate, toggleTask, sortTask, sortDate} from "../actions/TaskActions";
import '../styles/todoList.css';


class TaskList extends Component {

  addTasks(){
    this.props.addTask(this.taskInput.value, this.dateInput.value);
    this.taskInput.value= '';
  }
  filterTask(e){
    this.props.onFindTask(e.target.value);
  }
  filterDates(e){
    this.props.onFindDate(e.target.value);
  }
  deleteTask(id) {
   this.props.delete(id)
  }
  toggleTask(id) {
   this.props.toggle(id)
  }
  sortTask(item) {
    this.props.sort(item)
  }
  sortDates(item) {
    this.props.sortDate(item)
  }


  render() {
    // console.log(this.props.tasks);

    return (

     <div className="todoListMain">
       <ul className="navigation">
         <li onClick = {this.sortTask.bind(this)}>
           <a href="#">Alphabet Sort</a>
         </li>
         <li  onClick = {this.sortDates.bind(this)}>
           <a href="#">Dates Sort</a>
         </li>
       </ul>
       <div className="section">
         <p>Add task:</p>
         <input type="text"
                id="input-text"
                ref={(input) => { this.taskInput = input; }}
         />
         <input type="date"
                ref={(el)=> this.dateInput = el}
         />
         <button onClick={this.addTasks.bind(this)}>Add task</button>
         <div className="filter-field">
           <p>Filter task:</p>
           <input type=""
                  onChange={this.filterTask.bind(this)}
           />
           <p>Filter date:</p>
           <input type="date"
                  onChange={this.filterDates.bind(this)}
           />
         </div>

       </div>
       <ul className='taskList'>
         {this.props.tasks.map((task, index) =>
           <li key={index}>
             <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={this.toggleTask.bind(this, task.id)} />
             <span className={task.completed ? 'completed' : ''}>{task.text} {task.date}</span>
             <i className="fa fa-trash"
                key={index}
                onClick = {this.deleteTask.bind(this, task.id)}
             />
           </li>
         )}
       </ul>
     </div>
    );
  }
}

const mapStateToProps = store => {
  // console.log(store);
  return {
    tasks: store.tasks
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: (task, date)=> {dispatch(addTask(task, date))},
    delete: (id) => {dispatch(deleteTask(id))},
    onFindTask: (event) => {dispatch(filterTask(event))},
    onFindDate: (event) => {dispatch(filterDate(event))},
    toggle: (id) => {dispatch(toggleTask(id))},
    sort: (item) => {dispatch(sortTask(item))},
    sortDate: (item) => {dispatch(sortDate(item))}
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);