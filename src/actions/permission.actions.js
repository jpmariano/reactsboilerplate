import { permissionConstants } from '../constants';
import { permissionService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const permissionActions = {
    getAll,
    addPermission,
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
                    dispatch(alertActions.success('Registration successful'));
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
