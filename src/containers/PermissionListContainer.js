import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Permissions from '../components/List/Permissions';

function PermissionListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="permission-container">
            <h1>Permissions</h1>
            <Permissions />
        </div>
    );
}

export default PermissionListContainer