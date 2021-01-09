import React from 'react';

import './styles.scss';

import boom from './boom.jpg';

class ErrorMessage extends React.Component {
  render() {
    return (
      this.props.children || 
      <div className="error jumbotron">
        <h2>Error!</h2>
        <h3 onClick={() => window.location.reload()}>Please reload this page</h3>
        <img src={boom} alt="BOOM" />
      </div>
    );
  }
}

export default ErrorMessage;
