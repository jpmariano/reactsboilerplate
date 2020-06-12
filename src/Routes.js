import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// My imports
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import Users from './containers/UserListContainer';

export default function Routes() {

    const [isLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);

    return (
        <Switch>
            {
                isLoggedIn ?
                    <>
                        <Route exact path='/admin/users' component={ Users } />
                    </>
                :  
                    <>
                        <Route exact path='/login' component={ Login } />
                        <Route exact path='/' component={ Home } />
                    </>
            }
        </Switch>
    );
}