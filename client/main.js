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
import Landing from './../imports/ui/layout/Landing';
import CalendarUi from './../imports/ui/CalendarService/CalendarUi';
import GroupsUi from '../imports/ui/ChatService/GroupsUi.js';
const history = createHistory();
const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/group', '/calendar'];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const routes = (
 <Router history={history}>
     <Switch>
       <Route exact path="/" component={Landing} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/group" component={GroupsUi} />
       <Route exact path="/calendar" component={CalendarUi} />
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
  console.log('isAuthenticatedPage', isAuthenticated ? isAuthenticated : isUnauthenticatedPage);
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
