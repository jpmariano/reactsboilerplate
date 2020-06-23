import { permissionConstants } from '../constants';

export function permissions(state = {}, action) {
  switch (action.type) {
    case permissionConstants.GETALL_REQUEST:
        return {
            loading: true
        };

    case permissionConstants.GETALL_SUCCESS:
        let permissions = action.permissions;
        let roleId = [];
        permissions.map((permission) => (
            // eslint-disable-next-line
            roleId = [],
            permission.role_permissions.map((item) => (
                roleId.push(item.role_permissionsid.rid)
            )),
            permission['roles'] = roleId
        ));
        
        return {
            items: permissions
        };

    case permissionConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };

    default:
        return state
  }
}