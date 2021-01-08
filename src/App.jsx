import React from 'react';

import Todo from './components/Todo';
import ErrorMessage from './components/common/ErrorMessage';
import { ThemeContext } from './contexts/ThemeContext';

class App extends React.Component {
  state = {
    error: false
  }

  static contextType = ThemeContext;

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <div className={`App ${this.context.theme}`}>
        <button
          className="themeChange"
          onClick={this.context.themeChange}
        >
          <i className="far fa-sun"></i>
        </button>
        <div className="wrapper">
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;
