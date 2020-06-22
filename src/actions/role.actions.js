import { roleConstants } from '../constants';
import { roleService } from '../services';
import { alertActions } from './';

export const roleActions = {
    getRole,
};

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
