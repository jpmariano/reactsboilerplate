import React from "react";
import { Route, Switch } from "react-router-dom";

// My imports
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import Users from './containers/UserListContainer';

export default function Routes() {
  return (
    <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/login' component={ Login } />
        <Route exact path='/admin/users' component={ Users } />
    </Switch>
  );
}