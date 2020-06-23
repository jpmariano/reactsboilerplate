import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Users from '../components/List/Users';

function UserListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="user-container">
            <h1>Users</h1>
            <Users />
        </div>
    );
}

export default UserListContainer