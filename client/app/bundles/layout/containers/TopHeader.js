import React, {PropTypes, Component} from 'react';
import UserAuthStore from '../../../../libs/UserAuthStore';

export default class TopHeader extends Component {
  logoutAndRedirect(event) {
    event.preventDefault();

    UserAuthStore.deauthenticateUser();

    // TODO: react-router would be a good alternative here
    window.location.replace("/videos");
  }

  loginButton() {
    if (UserAuthStore.isUserAuthenticated()) {
      return <a href="#" onClick={this.logoutAndRedirect}>
        Logout
      </a>;
    } else {
      return <a href="/sessions/new">Login</a>;
    }
  }

  render() {
    return <div className="container">
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation" className="active">
              {
                this.loginButton()
              }
            </li>
          </ul>
        </nav>
        <h3 className="text-muted">Zype API Client</h3>
      </div>
    </div>
  }
}
