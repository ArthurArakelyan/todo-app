import React from 'react';

import './styles.scss';

class TodoPrototype extends React.Component {
  render() {
    const {value} = this.props;

    return (
      value && <li style={{opacity: 0.5}} className="todo__prototype list-group-item">
        <span>{value}</span>

        <div className="todo__prototype_buttons">
          <button
            className="btn btn-outline-danger btn-sm disabled"
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            className="btn btn-outline-primary btn-sm disabled"
          >
            <i className="fa fa-edit" />
          </button>
        </div>
      </li>
    );
  }
}

export default TodoPrototype;
