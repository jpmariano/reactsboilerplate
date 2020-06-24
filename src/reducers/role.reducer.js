import { roleConstants } from '../constants';

export function role(state = {}, action) {
  switch (action.type) {
    case roleConstants.ROLE_REQUEST:
        return {
            loading: true
        };

    case roleConstants.ROLE_SUCCESS:
        const currentItems = state.items ? state.items : [];
        currentItems.push(action.role);

        return {
            currentRole: currentItems
        };

    case roleConstants.ROLE_FAILURE:
        return { 
            error: action.error
        };
    
    case roleConstants.GETALL_REQUEST:
        return {
            loading: true
        };

    case roleConstants.GETALL_SUCCESS:

        return {
            items: action.roles
        };

    case roleConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };


    default:
        return state
  }
}