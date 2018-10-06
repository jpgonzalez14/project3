import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
//react imports
import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

//component imports
import Signup from './../imports/ui/Signup';
import Login from './../imports/ui/Login';
import NotFound from './../imports/ui/layout/NotFound';
import NavBar from './../imports/ui/layout/NavBar';
import Groups from './../imports/ui/ChatService/Groups';

const history = createHistory();
const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/group'];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const routes = (
 <Router history={history}>
     <Switch>
       <Route exact path="/" component={NavBar} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/group" component={Groups} />
       <Route exact path="*" component={NotFound} />
     </Switch>
 </Router>
 );

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log('pathname: ', history.location.pathname);
  console.log('isAuthenticated', isAuthenticated);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/group');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
});

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});
