import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap'

// components
import List from '../components/UserManagement/List';
import Permissions from '../components/UserManagement/Permissions';
import Roles from '../components/UserManagement/Roles';

class UserListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 'list',
        }

        this.setKey = this.setKey.bind(this);
    }

    setKey = (key) => {
        this.setState({
            key: key,
        })
    }

    render() {
        return (
            <div className="container-fluid">

                <h1>Users</h1>

                <Tabs
                    id="user-management-tabs"
                    activeKey={this.state.key}
                    onSelect={(k) => this.setKey(k)}
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
}

export default UserListContainer