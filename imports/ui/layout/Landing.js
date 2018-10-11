import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class Landing extends React.Component{
  render(){
    return (
      <div>
        <NavBar/>
        <div className='container'>
        <br/>
        <br/>
          <h1>Unite</h1>
          <small className='dtext'>An app like no other</small>
          <p>
            This application seeks to create communication channels between teachers
            and students in an easy, safe and intuitive way. <br/> We also have a calendar
            system that allows users to schedule their activities or important dates,
            in this application they will find everything they need to develop their
            academic life in a safe and organized way.
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Landing;
