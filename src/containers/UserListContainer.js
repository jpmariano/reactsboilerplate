import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'

// components
import List from '../components/UserManagement/List';
import Permissions from '../components/UserManagement/Permissions';
import Roles from '../components/UserManagement/Roles';

function UserListContainer() {

    const [key, setKey] = useState('list');

    return (
        <div className="container-fluid">

            <h1>Users</h1>

            <Tabs
                id="user-management-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="list" title="List">
                    <List />
                </Tab>
                <Tab eventKey="permissions" title="Permissions">
                    <Permissions />
                </Tab>
                <Tab eventKey="roles" title="Roles">
                    <Roles />
                </Tab>
            </Tabs>
        </div>
    );
}

export default UserListContainer