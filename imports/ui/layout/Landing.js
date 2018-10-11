import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class Landing extends React.Component{
  render(){
    return (
      <div>
        <NavBar/>
        <h1></h1>
        <p>Landing</p>
        <Footer/>
      </div>
    );
  }
}

export default Landing;
