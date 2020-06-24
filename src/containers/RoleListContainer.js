import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Roles from '../components/List/Roles';

function RoleListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="role-container">
            <h1>Roles</h1>
            <Roles />
        </div>
    );
}

export default RoleListContainer