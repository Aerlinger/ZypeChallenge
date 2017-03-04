import React, {PropTypes, Component} from 'react';

import UserAuthStore from '../../../libs/UserAuthStore';

export default class TopHeader extends Component {
  logoutAndRedirect(event) {
    event.preventDefault();

    UserAuthStore.deauthenticateUser();

    // TODO: react-router would be a good alternative here
    window.location.replace("/videos");
  }

  loginButton() {
    if (UserAuthStore.isUserAuthenticated()) {
      return <a className="btn btn-primary" href="#" onClick={this.logoutAndRedirect}>
        Logout
      </a>;
    } else {
      return <a className="btn btn-primary" href="/sessions/new">Login</a>;
    }
  }

  render() {
    return <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Zype Video API Demo</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <div className="navbar-form navbar-right">
          {
            this.loginButton()
          }
          </div>
        </div>
      </div>
    </nav>
  }
}
