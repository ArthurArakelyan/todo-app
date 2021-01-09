import React from 'react';

import './styles.scss';

class TodoForm extends React.Component {
  render() {
    const isTodosLength = this.props.todos <= this.props.maxTodos;

    return (
      <form className="todo__form input-group-sm" onSubmit={this.props.formSubmit}>
        <input
          className='form-control form-control-sm'
          type="text"
          value={isTodosLength ? this.props.value : 'First do this, then add more'}
          onChange={this.props.valueChange}
          ref={this.props.inputRef}
          disabled={!isTodosLength}
          placeholder="Todo name..."
        />
        <button className="btn btn-success btn-sm">Add</button>
        <p className="todo__form_max">
          {this.props.value.length} / {this.props.maxValue}
        </p>
      </form>
    );
  }
}

export default TodoForm;
