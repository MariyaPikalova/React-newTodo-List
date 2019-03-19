import React, {Component} from 'react';
import TodoItems from './TodoItems';
import '../styles/todoList.css';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
    // const localTodos = JSON.parse(localStorage.getItem('tasks'));
    this.addItem = this.addItem.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.filterTask = this.filterTask.bind(this);
    this.toggleStatus = this.toggleStatus(this);
    // this.checkHandler = this.checkHandler(this);
  }


  addItem(e) {
    var newItem = {
      text: this._inputElement.value,
      isComplete:false,
      key: Date.now()
    };
    if (localStorage.getItem('tasks') == null) {
      let items = [];
      items.push(newItem);
      console.log(this.items);
      localStorage.setItem('tasks', JSON.stringify(items));
    }
    else {
      var items = JSON.parse(localStorage.getItem('tasks'));
      items.push(newItem);
      localStorage.setItem('tasks', JSON.stringify(items));
    }
    this.setState({
      items: JSON.parse(localStorage.getItem('tasks'))
    })
    this._inputElement.value = "";
    this._dateElement.value = "";
    e.preventDefault();
  }

  removeTask(key){
    let list = this.state.items.filter(function (item){
      return (item.key !== key)
    })
    console.log(list);
    this.setState({
      items: list
    })
    localStorage.setItem('tasks', JSON.stringify(list));
  }

  filterTask(e){
    console.log(e.target.value);
    this.setState({
      items: this.state.items.filter(value =>
        value.text.indexOf(e.target.value.toLowerCase())!== -1)
    });

    if (e.target.value === ""){
      this.setState({
        items: JSON.parse(localStorage.getItem('tasks'))
      });
    }
  }
  toggleStatus(index){
    this.setState({
      items: this.state.items.map(function(item){
        item[index].isComplete = !item[index].isComplete})
    });
    console.log(this.state.items);
  }
  /*

    checkHandler(id){
      this.setState ({
        items: this.state.items.map (item => {
          if (item.id === id) {
            item.checked = !item.checked;
          }
          return item;
          console.log(item);
        }),
      });
    };
  */


  render() {
    return (
      <div className="todoListMain">
        <div className="section">
          <form onSubmit={this.addItem}>
            <p>Add task:</p>
            <input ref={(el)=> this._inputElement = el}
                   placeholder="enter task" />

            <input type="date"
                   ref={(el)=> this._dateElement = el} />

            <button type="submit">ADD</button>
          </form>

        </div>
        <div className="filter-field">
          <p>Filter:</p>
          <input type="text"
                 onChange={this.filterTask}
          />
        </div>
        <ul> {
            this.state.items.map


        }</ul>
      </div>
    )
  }
}

export default TodoList;