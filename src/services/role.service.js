// import config from 'config';
// import { authHeader } from '../helpers';
import API from "../utils/api";

export const roleService = {
    getRole,
    updateRole
};

async function getRole(id) {

    const response = await API.get('/admin/role/' + id,);

    return response.data;
}

async function updateRole(object, id) {

    const response = await API.put('/admin/role/' + id, object);

    return response.data;
}
