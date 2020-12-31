import React from 'react';

import Todo from './components/Todo';

class App extends React.Component {
  render() {
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
