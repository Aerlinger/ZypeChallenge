import React from 'react';

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

    // set the initial component state
    this.state = {
      error: "",
      successMessage: "",
      user: {
        email: 'test@test.com',
        password: 'password'
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      errorMessage: null,
      successMessage: null
    });

    let { user } = this.state;

    console.log("SUBMIT! State:", this.state)
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    console.log("change", event, this.state);

    this.setState({
      user
    });
  }

  onFailure() {

  }

  onSuccess() {

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
    let { user, error, successMessage } = this.state;

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

        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div>
  }
}
