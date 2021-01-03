import React from 'react';

import './styles.scss';

class TodoListEmpty extends React.Component {
  state = {
    show: this.props.todos
  }

  componentDidMount() {
    this.emptyShow();
  }

  emptyShow = () => {
    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 60);
  }

  render() {
    const {show} = this.state;

    return (
      <h3 className="todo__list_empty" style={{opacity: show ? 1 : 0}}>
        Your todo list is empty, <span onClick={this.props.emptyTodoList}>Create new todo</span>
      </h3>
    );
  }
}

export default TodoListEmpty;
