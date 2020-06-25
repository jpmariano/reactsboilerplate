import { roleConstants } from '../constants';

export function role(state = { currentRole: [], items: []}, action) {
  switch (action.type) {
    case roleConstants.ROLE_REQUEST:
        return {
            ...state,
            loading: true
        };

    case roleConstants.ROLE_SUCCESS:
        const currentItems = state.currentRole ? state.currentRole : [];
        currentItems.push(action.role);

        const { loading, ...roleCopy } = state;

        return {
            ...roleCopy,
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