import React from 'react';

import {ThemeContext} from '../../contexts/ThemeContext';

import './styles.scss';

class TodoStatusFilter extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <div className="todo__status_filter btn-group">
        {this.props.buttons.map(button => {
          return (
            <button
              key={button.id}
              onClick={() => this.props.filterClick(button.id)}
              className={`btn todo__filter_button ${this.context.theme} ${button.active ? 'btn-info' : 'btn-outline-secondary'}`}
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
