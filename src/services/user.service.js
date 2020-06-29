// import config from 'config';
import { authHeader } from '../helpers';
import API from "../utils/api";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    addUser,
    update,
    delete: _delete,
    addUserRole,
    removeUserRole,
    resetPassword
};

async function login(username, password) {
    const data = {
        username: username,
        password: password
    }

    const response = await API.post('/login', data);
    const user = await handleResponse(response);

    // store user details and jwt token in session storage to keep user logged in between page refreshes
    // sessionStorage.setItem('user', JSON.stringify(user.body.user[0].name));
    let roleId = [];
    user.body.user[0].users_roles.map((item) => (
        roleId.push(item.users_rolesid.rid)
    ))

    user.body.user[0]['roles'] = roleId
    sessionStorage.setItem('user', JSON.stringify(user.body.user[0]));
    sessionStorage.setItem('token', JSON.stringify(user.body.key[0]));

    return user.body.user[0];
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.clear()
}

async function getAll() {
    const response = await API.get('/users?pageNo=0&pageSize=100&sortBy=uid',);
    return handleResponse(response);
}

async function getById(id) {
    const response = await API.get('/users/' + id,);
    const user = await handleResponse(response);

    let roleId = [];
    user.users_roles.map((item) => (
        roleId.push(item.users_rolesid.rid)
    ))

    user['roles'] = roleId

    return user;
}

async function addUser(user) {
    const data = user;

    const response = await API.post('/register', data);
    return handleResponse(response);
}

async function register(user) {
    const data = user;

    const response = await API.post('/register?register=1', data);
    return handleResponse(response);
}

async function update(user, userId) {
    const data = user;

    const response = await API.put('/users/' + userId, data);
    return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {

    const response = await API.delete('/users/' + id,);
    const user = handleResponse(response);
    return user;
}

async function addUserRole(userRole, id) {

    const data = {
        users_roles: [
            {
                users_rolesid: {
                    uid: userRole[0],
                    rid: userRole[1]
                }
            }
        ]
    }

    const response = await API.put('/users/' + id, data);
    const user = handleResponse(response);

    return user;
}

async function removeUserRole(userRole, id) {
    const requestOptions = {
        headers: authHeader()
    };

    const data = {
        users_roles: [
            {
                users_rolesid: {
                    uid: userRole[0],
                    rid: userRole[1]
                }
            }
        ]
    }

    const response = await API.put('/users/' + id + '?userrole=remove', data, requestOptions);
    const user = handleResponse(response);

    return user;
}

async function resetPassword(username) {
    const data = username;
    const response = await API.get('/password-reset/request', data);
    const user = await handleResponse(response);

    return user;
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