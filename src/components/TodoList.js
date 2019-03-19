import React, {Component} from 'react';
import TodoItems from './TodoItems';
import '../styles/todoList.css';

let flag = false;

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.filterTask = this.filterTask.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.sortTask = this.sortTask.bind(this);
    this.sortDates = this.sortDates.bind(this);
  }

  addItem(e) {
    let newItem = {
      text: this._inputElement.value,
      date: this._dateElement.value,
      isComplete: false,
      key: Date.now()
    };
    if (localStorage.getItem('tasks') == null) {
      let items = [];
      items.push(newItem);
      console.log(this.items);
      localStorage.setItem('tasks', JSON.stringify(items));
    }
    else {
      let items = JSON.parse(localStorage.getItem('tasks'));
      items.push(newItem);
      localStorage.setItem('tasks', JSON.stringify(items));
    }
    this.setState({
      items: JSON.parse(localStorage.getItem('tasks'))
    });
    this._inputElement.value = "";
    this._dateElement.value = "";
    e.preventDefault();
  }

  removeTask(key){
      let list = this.state.items.filter(function (item){
      return (item.key !== key)
      });
    console.log(list);
    this.setState({
      items: list
      });
    localStorage.setItem('tasks', JSON.stringify(list));
  }

  filterTask(e){
    console.log(e.target.value);
      this.setState({
        items: this.state.items.filter(value =>
           value.text.indexOf(e.target.value.toLowerCase())!== -1
        )
      });

    if (e.target.value === ""){
      this.setState({
        items: JSON.parse(localStorage.getItem('tasks'))
      });
    }
  }

  toggleStatus(index) {
    const itemsArr = [...this.state.items];
    const resItem = itemsArr.findIndex(item => item.key === index);
    const resElement = itemsArr[resItem];
    // console.log(resElement);
    const resValue = {...resElement, isComplete: true};
    itemsArr.splice(resItem, 1, resValue)

    this.setState({
      items: [...itemsArr]
    })
  }

  sortTask() {
    let localTasks =  JSON.parse(localStorage.getItem('tasks'));
    flag = !flag;
    // console.log(flag);
    localTasks.sort(function (a, b) {
      const x = a.text.toLowerCase();
      const y = b.text.toLowerCase();
      return (flag ? x > y : x < y);
    });
     // console.log(localTasks);
    this.setState({
      items: localTasks
    })
    }

   sortDates() {
     let localDates =  JSON.parse(localStorage.getItem('tasks'));
     flag = !flag;
     localDates.sort(function (a, b) {
       const x = new Date(a.date).getTime();
       const y = new Date(b.date).getTime();
       return (flag ? x > y : x < y);
     });
     this.setState({
       items: localDates
     })
   }


  render() {
    return (

      <div className="todoListMain">
        <ul className="navigation">
          <li onClick = {this.sortTask}>
            <a href="#">Alphabet Sort</a>
          </li>
          <li  onClick = {this.sortDates}>
            <a href="#">Dates Sort</a>
          </li>
        </ul>
       <div className="section">
         <form onSubmit={this.addItem}>
           <p>Add task:</p>
           <input ref={(el)=> this._inputElement = el}
                  placeholder="enter task" id="input-text"
           />
           <input type="date"
                  ref={(el)=> this._dateElement = el}
           />
           <button type="submit">ADD</button>
         </form>
       </div>
        <div className="filter-field">
          <p>Filter task:</p>
          <input type=""
                 onChange={this.filterTask}
          />
        </div>
        <TodoItems entries={this.state.items}
                   delete={this.removeTask}
                   toggle={this.toggleStatus}
        />
      </div>
     )
  }
}

export default TodoList;