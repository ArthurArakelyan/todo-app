import React from 'react';

import Todo from './components/Todo';
import ErrorMessage from './components/common/ErrorMessage';

class App extends React.Component {
  state = {
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    if(this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <div className="App">
        <div className="wrapper">
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;
