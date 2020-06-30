import { alertConstants } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.PASSWORD_RESET_SUCCESS:
      return {
        type: 'alert-success',
        passwordResetMessage: action.message
      };
    case alertConstants.PASSWORD_RESET_ERROR:
      return {
        type: 'alert-danger',
        passwordResetMessage: action.message
      };
    case alertConstants.VERIFY_SUCCESS:
      return {
        type: 'alert-success',
        verifyMessage: action.message
      };
    case alertConstants.VERIFY_ERROR:
      return {
        type: 'alert-danger',
        verifyMessage: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}