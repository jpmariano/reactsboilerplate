import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import List from '../components/UserManagement/List';

function UserListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="user-container">

            <h1>Users</h1>

            <List />

            
        </div>
    );
}

export default UserListContainer