import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faKey } from '@fortawesome/free-solid-svg-icons';

// material ui
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

// components
import Roles from '../components/List/Roles';

function RoleListContainer() {

    const loggedIn = useSelector(state => state.authentication.loggedIn);

    if (!loggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div id="container">
            <h1>Roles</h1>
            <div className="tabs">
                <div className="content border rounded p-3">
                    <ul className="col-md-5 mt-3 mb-0">
                        <li title="Users" className="btn btn-light inactive mr-2">
                            <label for="tab1" role="button">
                                <FontAwesomeIcon icon={faUsers}/>&nbsp;
                                <span>Users</span>
                            </label>
                            <div class="indicator"></div>
                        </li>
                        <li title="Permissions" className="btn btn-light inactive mr-2">
                            <label for="tab2" role="button">
                                <FontAwesomeIcon icon={faKey}/>&nbsp;
                                <span>Permissions</span>
                            </label>
                            <div class="indicator"></div>
                        </li>
                        <li title="Roles" className="btn btn-primary active mr-2">
                            <label for="tab3" role="button">
                                <DeviceHubIcon />&nbsp;
                                <span>Roles</span>
                            </label>
                            <div class="indicator"></div>
                        </li>
                    </ul>
                    <section>
                        <Roles />
                    </section>
                </div>  
            </div>
        </div>
    );
}

export default RoleListContainer