import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class Login extends React.Component {
  render() {
    return <div className="container">
      <h1>React component</h1>
    </div>
  }
}

ReactOnRails.register({ Login });
