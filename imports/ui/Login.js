import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './layout/NavBar';
import Footer from './layout/Footer';


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
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email},password,(err)=>{
      if (err) {
        this.setState({error: 'Unable to login. Check email and password'});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render(){
    return(
      <div>
        <NavBar/>
        <div className="container">
        <br/>
          <h1>Login</h1>
          {this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : undefined}
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
        <br/>
        <br/>
        <br/>
        <Footer/>
      </div>
    );
  }
}

export default Login;
