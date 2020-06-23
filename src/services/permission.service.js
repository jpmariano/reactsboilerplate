// import config from 'config';
// import { authHeader } from '../helpers';
import API from "../utils/api";

export const permissionService = {
    getAll,
};

async function getAll() {
    const response = await API.get('/admin/permissions',);
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