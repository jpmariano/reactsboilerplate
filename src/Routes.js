import React from "react";
import { Route, Switch } from "react-router-dom";

// My imports
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import Users from './containers/UserListContainer';
import Register from './containers/RegisterContainer';
import Logout from './components/Authentication/Logout';
import NotFound from './components/Common/NotFound';
import Dashboard from './containers/DashboardContainer';
import Permissions from './containers/PermissionListContainer';
import Roles from './containers/RoleListContainer';
import Profile from './containers/ProfilePageContainer';
import PasswordReset from './containers/PasswordResetContainer';

// private route
import { PrivateRoute } from './components/Routes';

function Routes() {

    return (
        <Switch>
            {/* Private Routes */}
            <PrivateRoute exact path='/dashboard' component={ Dashboard } />
            <PrivateRoute exact path='/admin/users' component={ Users } />
            <PrivateRoute exact path='/logout' component={ Logout } />
            <PrivateRoute exact path='/admin/users/permissions' component={ Permissions } />
            <PrivateRoute exact path='/admin/users/roles' component={ Roles } />
            <PrivateRoute exact path='/profile' component={ Profile } />

            {/* Public Routes */}
            <Route exact path='/' component={ Home } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
            <Route exact path='/password-reset' component={ PasswordReset } />
            <Route exact path='*' component={ NotFound } />
        </Switch>
    );
}

export default Routes;