import React from 'react';

import './styles.scss';

class TodoList extends React.Component {
  render() {
    return (
      <ul className="todo__list list-group">
        {this.props.children}
      </ul>
    );
  }
}

export default TodoList;
