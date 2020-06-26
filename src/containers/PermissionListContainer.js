import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faKey } from '@fortawesome/free-solid-svg-icons';

// material ui
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

// components
import Permissions from '../components/List/Permissions';

function PermissionListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="container">
            <h1>Permissions</h1>
            <div className="tabs">
                <div className="content border rounded p-3">
                    <ul className="col-md-5 mt-3 mb-0">
                        <li title="Users" className="btn btn-light inactive mr-2">
                            <a href="/admin/users">
                                <label>
                                    <FontAwesomeIcon icon={faUsers}/>&nbsp;
                                    <span>Users</span>
                                </label>
                                <div className="indicator"></div>
                            </a>
                        </li>
                        <li title="Permissions" className="btn btn-primary active mr-2">
                            <a href="/admin/users/permissions">
                                <label>
                                    <FontAwesomeIcon icon={faKey}/>&nbsp;
                                    <span>Permissions</span>
                                </label>
                                <div className="indicator"></div>
                            </a>
                        </li>
                        <li title="Roles" className="btn btn-light inactive mr-2">
                            <a href="/admin/users/roles">
                                <label>
                                    <DeviceHubIcon />&nbsp;
                                    <span>Roles</span>
                                </label>
                                <div className="indicator"></div>
                            </a>
                        </li>
                    </ul>
                    <section>
                        <Permissions />
                    </section>
                </div>  
            </div>
        </div>
    );
}

export default PermissionListContainer