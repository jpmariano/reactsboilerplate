import { permissionConstants } from '../constants';
import { permissionService } from '../services';

export const permissionAction = {
    getAll,
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
