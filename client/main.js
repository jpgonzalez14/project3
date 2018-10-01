//import 'bootstrap/dist/js/bootstrap.bundle';
//import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
//react imports
import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
//component imports
import Signup from './../imports/ui/Signup';
import Login from './../imports/ui/Login';
import NotFound from './../imports/ui/layout/NotFound';
import NavBar from './../imports/ui/layout/NavBar';
import Groups from './../imports/ui/ChatService/Groups';

const routes = (
 <BrowserRouter>
     <Switch>
       <Route exact path="/" component={NavBar} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/group" component={Groups} />
       <Route exact path="*" component={NotFound} />
     </Switch>
 </BrowserRouter>
 );

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log('isAuthenticated', isAuthenticated);
});

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'));
});
