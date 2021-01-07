import React from 'react';

import './styles.scss';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.todoRef = React.createRef(null);
  }

  componentDidMount() {
    if(this.todoRef && this.todoRef.current) {
      setTimeout(() => {
        this.todoRef.current.style.opacity = '1'; 
      }, 0);
    }
  }

  render() {
    const { todo } = this.props;
    return (
      todo.searched && <li ref={this.todoRef} style={{opacity: 0.5}} className="todo__list_item list-group-item">
        <span
          style={{textDecoration: todo.completed ? 'line-through' : 'unset',}}
          onClick={() => this.props.todoComplete(todo.id)}
        >
          {todo.value}
        </span>

        <div className="todo__list_item_actions">
          <button
            onClick={() => this.props.todoDelete(todo.id)}
            className="btn btn-outline-danger btn-sm"
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            onClick={() => this.props.modalOpen(todo.id)}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fa fa-edit" />
          </button>
        </div>
      </li>
    );
  }
}

export default TodoListItem;
