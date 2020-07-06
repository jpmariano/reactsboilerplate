import { userConstants } from '../constants';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    case userConstants.GETBYID_REQUEST:
        return {
            ...state,
            retrieving: true
        };
    case userConstants.GETBYID_SUCCESS:

        const { retrieving, ...stateCopy } = state;
        return {
            ...stateCopy,
            retrieved: true,
            user: action.user
        };
    case userConstants.GETBYID_FAILURE:
        return {};
    case userConstants.CHECK_PASSWORD_SUCCESS:
        return {
            ...state,
            checkPassword: action.res
        };
    case userConstants.CHECK_PASSWORD_FAILURE:
        return {
            ...state,
            checkPassword: action.error
        };
    default:
        return state
  }
}