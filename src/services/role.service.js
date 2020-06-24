// import config from 'config';
// import { authHeader } from '../helpers';
import API from "../utils/api";

export const roleService = {
    getRole,
    updateRolePermissions
};

async function getRole(id) {

    const response = await API.get('/admin/role/' + id,);

    return response.data;
}

async function updateRolePermissions(permissionRole, id) {

    const data = {
        role_permissions: [
            {
                role_permissionsid: {
                    pid: permissionRole[0],
                    rid: permissionRole[1]
                }
            }
        ]
    }

    const response = await API.put('/admin/role/' + id, data);

    return response.data;
}
