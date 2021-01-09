import React from 'react';

class TodosNotFound extends React.Component {
  state = {
    show: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        show: true
      });
    }, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {show} = this.state;

    return (
      <p style={{opacity: show ? 1 : 0}} className="todos__not_found todo__list_empty">
        Todo is not found
      </p>
    );
  }
}

export default TodosNotFound;
