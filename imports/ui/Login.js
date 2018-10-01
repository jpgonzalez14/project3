import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './layout/NavBar';


class Login extends React.Component{
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
    Meteor.loginWithPassword({email},{password},(err)=>{
      console.log('login callback', err);
    });
  }
  render(){
    return(
      <div>
        <NavBar/>
        <div className="container">
          <h1>Login</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" ref='email' name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" ref='password' name='password' placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <br/>
          <Link to='/signup'><small>create an account</small></Link>
        </div>
      </div>
    );
  }
}

export default Login;