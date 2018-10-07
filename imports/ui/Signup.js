import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      role: 'Student'
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let name = this.refs.name.value.trim();
    console.log(password);

    let roles = this.refs.role.value;
    let groups = [];
    Accounts.createUser({ name, email, password, roles, groups }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
        Meteor.call('users.upsert', name, email, roles, groups);
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <br />
          <h1>Signup</h1>
          {this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" ref='name' name='name' placeholder="Enter name" required />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" ref='email' name='email' aria-describedby="emailHelp" placeholder="Enter email" required />
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" ref='password' name='password' placeholder="Password" required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" ref='role' name='role' required>
                <option value="Student">I am a Student</option>
                <option value="Teacher">I am a Teacher</option>
              </select>
            </div>
            <br />
            <br />
            <button type="submit" className="btn btn-primary">Create account</button>
          </form>
          <br />
          <Link to='/login'><small>already have an account?</small></Link>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default Signup;
