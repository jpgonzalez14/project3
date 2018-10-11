import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class Landing extends React.Component{
  render(){
    return (
      <div>
        <NavBar/>
        <div className='container'>
          <h1></h1>
          <p>Landing</p>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Landing;
