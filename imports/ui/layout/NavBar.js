import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <p>Navbar</p>
        <Link to='/login'>Login</Link>
        <br/>
        <Link to='/signup'>Signup</Link>
      </div>
    );
  }
}
