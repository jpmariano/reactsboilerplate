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
            items: currentItems
        };

    case roleConstants.ROLE_FAILURE:
        return { 
            error: action.error
        };


    default:
        return state
  }
}