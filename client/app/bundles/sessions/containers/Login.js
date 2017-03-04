import React, {PropTypes, Component} from 'react';
import {authenticate} from '../services/ZypeAuthApi';
import UserAuthStore from '../../../../libs/UserAuthStore';

let styles = {
  form: {
    maxWidth: 330,
    padding: 15,
    margin: '0 auto'
  },
  input: {
    marginBottom: 5,
    marginTop: 5
  }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    const { default_password, default_email } = this.props;

    // set the initial component state
    this.state = {
      error: "",
      successMessage: "",
      user: {
        email: default_email,
        password: default_password
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Called when form is submitted.
   *
   * Make an authentication call to Zype's OAuth API and redirect if applicable.
   *
   * @param event
   */
  handleSubmit(event) {
    event.preventDefault();

    // Reset error/success message:
    this.setState({
      errorMessage: null,
      successMessage: null
    });

    let { user } = this.state;
    const { client_id, client_secret } = this.props;

    authenticate({
      client_id: client_id,
      client_secret: client_secret,
      username: user.email,
      password: user.password
    }).then((result) => {
      //  Successful login
      this.setState({successMessage: 'Login successful!'});

      UserAuthStore.authenticateUser(result.access_token);

      // TODO: react-router would be a good alternative here
      window.location.replace("/videos");
    }).catch((error) => {
      //  Failed login
      this.setState({errorMessage: 'Authentication failed. Please check your credentials and try again.'});
    });
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  successLabel() {
    if (this.state.successMessage) {
      return <div className="alert alert-success" role="alert">
        {this.state.successMessage}
      </div>
    }
  }


  errorLabel() {
    if (this.state.errorMessage) {
      return <div className="alert alert-danger" role="alert">
        {this.state.errorMessage}
      </div>
    }
  }

  render() {
    let { user } = this.state;

    return <div className="container">
      <form className="form-signin"
            style={styles.form}
            onSubmit={this.handleSubmit}
      >

        <h3 className="form-signin-heading">Please sign in</h3>
        <hr />

        {this.errorLabel()}
        {this.successLabel()}

        <label htmlFor="inputEmail" className="sr-only">Email address</label>

        <input
            type="email"
            name="email"
            id="inputEmail"
            className="form-control"
            style={styles.input}
            placeholder="Email address"
            onChange={this.handleChange}
            value={user.email}
            required
            autoFocus/>

        <label htmlFor="inputPassword" className="sr-only" style={styles.input}>Password</label>

        <input
            type="password"
            name="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
            value={user.password}
            required/>

        <hr />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div>
  }
}

Login.propTypes = {
  default_email: PropTypes.string,
  default_password: PropTypes.string,
  client_id: PropTypes.string.isRequired,
  client_secret: PropTypes.string.isRequired
};

Login.defaultProps = {
  default_email: 'test@test.com',
  default_password: 'password'
};
