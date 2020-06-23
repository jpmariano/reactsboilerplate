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
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: permissionConstants.GETALL_REQUEST } }
    function success(users) { return { type: permissionConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: permissionConstants.GETALL_FAILURE, error } }
}
