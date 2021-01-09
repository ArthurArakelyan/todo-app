import React from 'react';

import './styles.scss';

class TodoSearch extends React.Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.searchValue}
        onChange={this.props.searchChange}
        className="todo__search form-control form-control-sm"
        placeholder="type to search..."
      />
    );
  }
}

export default TodoSearch;
