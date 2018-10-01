import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import NavBar from './layout/NavBar';

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;
    console.log(password);

    let roles;
    if (this.refs.estudent.value !== undefined) {
      roles = this.refs.estudent.value;
    } else if (this.refs.teacher.value !== undefined) {
      roles = this.refs.teacher.value;
    } else {
      roles = 'Estudent';
    }
    Accounts.createUser({email, password, roles}, (err) => {
      console.log('signup callback', err);

    });
  }
  render(){
    return (
      <div>
        <NavBar/>
        <div className="container">
          <h1>Signup</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" ref='email' name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" ref='password' name='password' placeholder="Password"/>
            </div>

            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" ref='estudent' name="estudent" value="Estudent"/>
              <label className="form-check-label">I am a student</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" ref='teacher' name="teacher" value="Teacher"/>
              <label className="form-check-label">I am a teacher</label>
            </div>
            <br/>
            <br/>
            <button type="submit" className="btn btn-primary">Create account</button>
          </form>
          <br/>
          <Link to='/login'><small>already have an account?</small></Link>
        </div>
      </div>
    );
  }
}

export default Signup;
