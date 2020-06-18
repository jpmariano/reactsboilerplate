import React from "react";
import { Route, Switch } from "react-router-dom";

// My imports
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import Dashboard from './containers/UserListContainer';
import Register from './containers/RegisterContainer';
import Logout from './components/Authentication/Logout';
import { PrivateRoute } from './components/Routes';

export default function Routes() {

    return (
        <Switch>
            {/* Private Routes */}
            <PrivateRoute exact path='/admin/users' component={ Dashboard } />
            <PrivateRoute exact path='/logout' component={ Logout } />

            {/* Public Routes */}
            <Route exact path='/' component={ Home } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
        </Switch>
    );
}