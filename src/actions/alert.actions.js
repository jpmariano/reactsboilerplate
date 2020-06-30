import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear,
    passwordResetSuccess,
    passwordResetError,
    verifySuccess,
    verifyError
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

function verifySuccess(message) {
    return { type: alertConstants.VERIFY_SUCCESS, message };
}

function verifyError(message) {
    return { type: alertConstants.VERIFY_ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}