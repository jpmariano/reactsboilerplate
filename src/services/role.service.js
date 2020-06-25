// import config from 'config';
import { authHeader } from '../helpers';
import API from "../utils/api";

export const roleService = {
    getAllRole,
    getRole,
    addRolePermissions,
    removeRolePermissions,
    addRole,
};

async function getAllRole() {

    const response = await API.get('/admin/role',);

    return response.data;
}

async function getRole(id) {

    const response = await API.get('/admin/role/' + id,);

    return response.data;
}

async function addRolePermissions(permissionRole, id) {

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

async function removeRolePermissions(permissionRole, id) {
    const requestOptions = {
        headers: authHeader()
    };

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

    const response = await API.put('/admin/role/' + id + '?rolepermission=remove', data, requestOptions);

    return response.data;
}

async function addRole(role) {
    const data = role;

    const response = await API.post('/admin/role', data);
    return handleResponse(response);
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.clear()
}

function handleResponse(response) {
    let data = response.data;
    
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
    } else if (response.status === 500) {
        const error = response;
        return Promise.reject(error.message);
    }

    return data;
}
