import React from 'react';

import './styles.scss';

class TodoListEmpty extends React.Component {
  render() {
    return (
      <h3 className="todo__list_empty">
        Your todo list is empty, <span onClick={this.props.emptyTodoList}>Create new todo</span>
      </h3>
    );
  }
}

export default TodoListEmpty;
