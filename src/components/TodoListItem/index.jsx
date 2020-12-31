import React from 'react';

import './styles.scss';

class TodoListItem extends React.Component {
  render() {
    const { todo } = this.props;
    return (
      todo.searched && <li className="todo__list_item list-group-item">
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
