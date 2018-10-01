import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

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
    let password = this.refs.password.value.trim();
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
        <h1>Signup</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type='email' ref='email' name='email' placeholder='Email'/>
          <input type='password' ref='password' name='password' placeholder='Password'/>
          <br/>
          <input type="checkbox" ref='estudent' name="estudent" value="Estudent"/> I am a student
          <input type="checkbox" ref='teacher' name="teacher" value="Teacher"/> I am a teacher
          <br/>
          <button>Create account</button>
        </form>
        <Link to='/login'>already have an account?</Link>

      </div>
    );
  }
}

export default Signup;
