import { userConstants } from '../constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
            loading: true
        };

    case userConstants.GETALL_SUCCESS:
        let users = action.users;
        let roleId = [];
        users.map((user) => (
            // eslint-disable-next-line
            roleId = [],
            user.users_roles.map((item) => (
                roleId.push(item.users_rolesid.rid)
            )),
            user['roles'] = roleId
        ));

        return {
            items: users
        };

    case userConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };

    case userConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            items: state.items.map(user =>
                user.id === action.id
                    ? { ...user, deleting: true }
                    : user
                )
        };

    case userConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            items: state.items.filter(user => user.id !== action.id)
        };

    case userConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
            ...state,
            items: state.items.map(user => {
                if (user.id === action.id) {
                    // make copy of user without 'deleting:true' property
                    const { deleting, ...userCopy } = user;
                    // return copy of user with 'deleteError:[error]' property
                    return { ...userCopy, deleteError: action.error };
                }

                return user;
            })
        };

    case userConstants.FILTER_SUCCESS:
        let filteredUsers = action.users;
        let filteredUserRoleId = [];
        filteredUsers.map((filteredUser) => (
            // eslint-disable-next-line
            filteredUserRoleId = [],
            filteredUser.users_roles.map((item) => (
                filteredUserRoleId.push(item.users_rolesid.rid)
            )),
            filteredUser['roles'] = filteredUserRoleId
        ));

        return {
            items: filteredUsers
        };

    case userConstants.FILTER_FAILURE:
        return { 
            error: action.error
        };

    default:
        return state
  }
}