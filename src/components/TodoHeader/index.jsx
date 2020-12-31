import React from 'react';

import './styles.scss';

class TodoHeader extends React.Component {
  render() {
    const { todos } = this.props;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const notCompletedTodos = todos.filter(todo => !todo.completed).length;

    return (
      <header className="todo__header">
        <h1>Todo List</h1>
        <h2>{completedTodos} Todo completed {notCompletedTodos} more</h2>
      </header>
    );
  }
}

export default TodoHeader;
