import React from 'react';

class Footer extends React.Component{
  render(){
    return (

<footer className="page-footer font-small special-color-dark pt-4">

    <div className="container">

      <ul className="list-unstyled list-inline text-center">
        <li className="list-inline-item">
          <a className="btn-floating btn-fb mx-1">
            <i className="fa fa-facebook"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-tw mx-1">
            <i className="fa fa-twitter"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-gplus mx-1">
            <i className="fa fa-google-plus"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-li mx-1">
            <i className="fa fa-linkedin"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-dribbble mx-1">
            <i className="fa fa-dribbble"> </i>
          </a>
        </li>
      </ul>

    </div>

    <div className="footer-copyright text-center py-3">Created by:
          <a
            className="text-primary-color"
            href="http://juanpgonzalez.com/"
            target="_blank"
          >
            {' '}
            Juan Pablo{' '}
          </a>{' '}
          &
          <a
            className="text-primary-color"
            href="http://rangel10.github.io/"
            target="_blank"
          >
            {' '}
            Ricardo Angel{' '}
          </a>{' '}
    </div>

  </footer>

    );
  }
}

export default Footer;
