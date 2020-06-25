import { permissionConstants } from '../constants';
import { permissionService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const permissionActions = {
    getAll,
    addPermission,
    updatePermission,
    delete: _delete,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        permissionService.getAll()
            .then(
                permissions => dispatch(success(permissions)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: permissionConstants.GETALL_REQUEST } }
    function success(permissions) { return { type: permissionConstants.GETALL_SUCCESS, permissions } }
    function failure(error) { return { type: permissionConstants.GETALL_FAILURE, error } }
}

function addPermission(permission) {
    return dispatch => {
        dispatch(request(permission));

        permissionService.addPermission(permission)
            .then(
                permission => { 
                    dispatch(success(permission));
                    history.push('/admin/users/permissions');
                    dispatch(alertActions.success('Add permission successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(permission) { return { type: permissionConstants.ADD_REQUEST, permission } }
    function success(permission) { return { type: permissionConstants.ADD_SUCCESS, permission } }
    function failure(error) { return { type: permissionConstants.ADD_FAILURE, error } }
}

function updatePermission(permission, id) {
    return dispatch => {
        dispatch(request(permission));

        permissionService.updatePermission(permission, id)
            .then(
                permission => { 
                    dispatch(success(permission));
                    dispatch(alertActions.success('Update permission successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(permission) { return { type: permissionConstants.UPDATE_REQUEST, permission } }
    function success(permission) { return { type: permissionConstants.UPDATE_SUCCESS, permission } }
    function failure(error) { return { type: permissionConstants.UPDATE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        permissionService.delete(id)
            .then(
                permission => {
                    dispatch(success(id));
                    dispatch(alertActions.success('Deleted permission successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: permissionConstants.UPDATE_REQUEST, id } }
    function success(id) { return { type: permissionConstants.UPDATE_SUCCESS, id } }
    function failure(error) { return { type: permissionConstants.UPDATE_FAILURE, error } }
}
