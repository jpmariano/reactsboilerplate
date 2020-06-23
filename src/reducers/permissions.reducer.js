import { permissionConstants } from '../constants';

export function permissions(state = {}, action) {
  switch (action.type) {
    case permissionConstants.GETALL_REQUEST:
        return {
            loading: true
        };

    case permissionConstants.GETALL_SUCCESS:
        return {
            items: action.permissions
        };

    case permissionConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };

    default:
        return state
  }
}