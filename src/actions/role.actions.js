import { roleConstants } from '../constants';
import { roleService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const roleActions = {
    getAllRole,
    getRole,
    addRolePermissions,
    removeRolePermissions,
    addRole,
};

function getAllRole() {
    return dispatch => {
        dispatch(request());

        roleService.getAllRole()
            .then(
                roles => { 
                    dispatch(success(roles));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: roleConstants.GETALL_REQUEST } }
    function success(roles) { return { type: roleConstants.GETALL_SUCCESS, roles } }
    function failure(error) { return { type: roleConstants.GETALL_FAILURE, error } }
}

function getRole(id) {
    return dispatch => {
        dispatch(request(id));

        roleService.getRole(id)
            .then(
                role => { 
                    dispatch(success(role));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(role) { return { type: roleConstants.ROLE_REQUEST, role } }
    function success(role) { return { type: roleConstants.ROLE_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.ROLE_FAILURE, error } }
}

function addRolePermissions(object, id) {
    return dispatch => {
        dispatch(request(id));

        roleService.addRolePermissions(object, id)
            .then(
                role => { 
                    dispatch(success(role));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(role) { return { type: roleConstants.ADD_PERMISSION_REQUEST, role } }
    function success(role) { return { type: roleConstants.ADD_PERMISSION_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.ADD_PERMISSION_FAILURE, error } }
}

function removeRolePermissions(object, id) {
    return dispatch => {
        dispatch(request(id));

        roleService.removeRolePermissions(object, id)
            .then(
                role => { 
                    dispatch(success(role));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(role) { return { type: roleConstants.REMOVE_PERMISSION_REQUEST, role } }
    function success(role) { return { type: roleConstants.REMOVE_PERMISSION_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.REMOVE_PERMISSION_FAILURE, error } }
}

function addRole(role) {
    return dispatch => {
        dispatch(request(role));

        roleService.addRole(role)
            .then(
                role => { 
                    dispatch(success(role));
                    history.push('/admin/users/roles');
                    dispatch(alertActions.success('Add role successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(role) { return { type: roleConstants.ADD_REQUEST, role } }
    function success(role) { return { type: roleConstants.ADD_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.ADD_FAILURE, error } }
}
