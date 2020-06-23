import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components

function PermissionListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="permission-container">
            <h1>Permissions</h1>
        </div>
    );
}

export default PermissionListContainer