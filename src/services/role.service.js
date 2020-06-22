// import config from 'config';
// import { authHeader } from '../helpers';
import API from "../utils/api";

export const roleService = {
    getRole,
};

async function getRole(id) {

    const response = await API.get('/admin/role/' + id,);

    return response.data;
}
