import React from 'react';

import './styles.scss';

class TodoForm extends React.Component {
  render() {
    return (
      <form className="todo__form input-group-sm" onSubmit={this.props.formSubmit}>
        <input
          className="form-control form-control-sm"
          type="text"
          value={this.props.value}
          onChange={this.props.valueChange}
          ref={this.props.inputRef}
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
