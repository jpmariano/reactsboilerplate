import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    addUser,
    getAll,
    delete: _delete,
    update,
    addUserRole,
    removeUserRole,
    getById,
    resetPasswordRequest,
    verifyUserToken,
    resetPassword,
    filter
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/dashboard');
                },
                error => {
                    console.log(error.response)
                    dispatch(failure(error.toString()));
                    if (error.response.status === 401) {
                        dispatch(alertActions.error("User is not enabled, contact site's administrator"));
                    } else if (error.response.status === 500) {
                        dispatch(alertActions.error("Username/password is incorrect!"));
                    } else {
                        dispatch(alertActions.error(error.toString()));
                    }
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/admin/users');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.addUser(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/admin/users');
                    dispatch(alertActions.success('User added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.ADD_REQUEST, user } }
    function success(user) { return { type: userConstants.ADD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.ADD_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function update(user, userId) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user, userId)
            .then(
                user => { 
                    dispatch(success(userId));
                    // history.push('/admin/users');
                    dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(userId) { return { type: userConstants.UPDATE_REQUEST, userId } }
    function success(userId) { return { type: userConstants.UPDATE_SUCCESS, userId } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function addUserRole(object, id) {
    return dispatch => {
        dispatch(request(id));

        userService.addUserRole(object, id)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/admin/users');
                    dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.ADD_ROLE_REQUEST, user } }
    function success(user) { return { type: userConstants.ADD_ROLE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.ADD_ROLE_FAILURE, error } }
}

function removeUserRole(object, id) {
    return dispatch => {
        dispatch(request(id));

        userService.removeUserRole(object, id)
            .then(
                role => { 
                    dispatch(success(role));
                    // history.push('/admin/users');
                    dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(role) { return { type: userConstants.REMOVE_ROLE_REQUEST, role } }
    function success(role) { return { type: userConstants.REMOVE_ROLE_SUCCESS, role } }
    function failure(error) { return { type: userConstants.REMOVE_ROLE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
        .then(
            user => { 
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(id) { return { type: userConstants.GETBYID_REQUEST, id } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function resetPasswordRequest(username) {
    return dispatch => {
        dispatch(request(username));

        userService.resetPasswordRequest(username)
        .then(
            user => {
                dispatch(success(user));
                dispatch(alertActions.passwordResetSuccess('Password reset link has been successfully emailed!'));
            },
            error => {
                dispatch(failure(error.response.data.toString()));
                dispatch(alertActions.passwordResetError(error.response.data.toString()));
            }
        );
    };

    function request(username) { return { type: userConstants.PASSWORD_RESET_REQUEST, username } }
    function success(user) { return { type: userConstants.PASSWORD_RESET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PASSWORD_RESET_FAILURE, error } }
}

function verifyUserToken(token) {
    return dispatch => {
        dispatch(request(token));

        userService.verifyUserToken(token)
        .then(
            user => {
                dispatch(success(user));
                dispatch(alertActions.verifySuccess('Verification successful!'));
            },
            error => {
                if (error.response.status === 404) {
                    dispatch(failure('This token has expired!'));
                    dispatch(alertActions.verifyError('This token has expired/is invalid!'));
                } else {
                    dispatch(failure(error.response.data.toString()));
                    dispatch(alertActions.verifyError(error.response.data.toString()));
                }
            }
        );
    };

    function request(token) { return { type: userConstants.VERIFY_REQUEST, token } }
    function success(user) { return { type: userConstants.VERIFY_SUCCESS, user } }
    function failure(error) { return { type: userConstants.VERIFY_FAILURE, error } }
}

function resetPassword(token, password) {
    return dispatch => {
        dispatch(request(token));

        userService.resetPassword(token, password)
        .then(
            user => {
                dispatch(success(user));
                history.push('/reset-password/success');
                dispatch(alertActions.passwordResetSuccess('Your password has been reset!'));
            },
            error => {
                if (error.response.status === 404) {
                    dispatch(failure('This token has expired!'));
                    dispatch(alertActions.passwordResetError('This token has expired/is invalid!'));
                } else if (error.response.status === 400) {
                    dispatch(failure('This token has expired!'));
                    dispatch(alertActions.passwordResetError('This token has expired/is invalid!'));
                } else {
                    dispatch(failure(error.response.data.toString()));
                    dispatch(alertActions.passwordResetError(error.response.data.toString()));
                }
            }
        );
    };

    function request(token) { return { type: userConstants.PASSWORD_VERIFY_REQUEST, token } }
    function success(user) { return { type: userConstants.PASSWORD_VERIFY_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PASSWORD_VERIFY_FAILURE, error } }
}

function filter(parameters) {
    return dispatch => {
        dispatch(request(parameters));

        userService.resetPassword(parameters)
        .then(
            user => {
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error.response.data.toString()));
                dispatch(alertActions.error(error.response.data.toString()));
            }
        );
    };

    function request(parameters) { return { type: userConstants.FILTER_REQUEST, parameters } }
    function success(user) { return { type: userConstants.FILTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FILTER_FAILURE, error } }
}
