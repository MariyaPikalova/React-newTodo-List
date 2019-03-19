import React, {Component} from 'react';

class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return <li key={item.key}>
           <input type="checkbox"
                  id={item.key}
                  onChange={()=> this.props.toggle(item.key)}
           />
           <span className={item.isComplete ? 'completed' : ''}>{item.text}   {item.date}</span>
           <i className="fa fa-trash"
               key={item.key}
               onClick = {() => this.props.delete(item.key)}
           />
           </li>
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTasks);
    return (
      <ul className='taskList'>
        {listItems}
      </ul>
    )
  }
}

export default TodoItems;