import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear,
    passwordResetSuccess,
    passwordResetError
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function passwordResetSuccess(message) {
    return { type: alertConstants.PASSWORD_RESET_SUCCESS, message };
}

function passwordResetError(message) {
    return { type: alertConstants.PASSWORD_RESET_ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}