import React from 'react';

import './styles.scss';

class TodoStatusFilter extends React.Component {
  render() {
    return (
      <div className="todo__status_filter btn-group">
        {this.props.buttons.map(button => {
          return (
            <button
              key={button.id}
              onClick={() => this.props.filterClick(button.id)}
              className={`btn todo__filter_button ${button.active ? 'btn-info' : 'btn-outline-secondary'}`}
            >
              {button.label}
            </button>
          );
        })}
      </div>
    );
  }
}

export default TodoStatusFilter;
