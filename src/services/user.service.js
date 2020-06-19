// import config from 'config';
// import { authHeader } from '../helpers';
import API from "../utils/api";

export const userService = {
    login,
    logout,
    register,
    getAll,
    // getById,
    // update,
    // delete: _delete
};

async function login(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: authHeader()
    // };
    
    const data = {
        username: username,
        password: password
    }

    const response = await API.post('/login', data);
    const user = await handleResponse(response);

    // store user details and jwt token in session storage to keep user logged in between page refreshes
    sessionStorage.setItem('user', JSON.stringify(user.body.user));
    sessionStorage.setItem('token', JSON.stringify(user.body.key[0]));
    return user;
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.clear()
}

async function getAll() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // const response = await fetch(`${config.apiUrl}/users`, requestOptions);
    const response = await API.get('/users?pageNo=0&pageSize=100&sortBy=uid',);
    return handleResponse(response);
}

// async function getById(id) {
//     // const requestOptions = {
//     //     method: 'GET',
//     //     headers: authHeader()
//     // };

//     const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//     return handleResponse(response);
// }

async function register(user) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user)
    // };

    const data = user;

    const response = await API.post('/register', data);
    return handleResponse(response);
}

// async function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     const response = await fetch(`${config.apiUrl}/users/${user.id}`, requestOptions);
//     return handleResponse(response);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// async function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     const response = await fetch(`${config.apiUrl}/users/${id}`, requestOptions);
//     return handleResponse(response);
// }

function handleResponse(response) {
    const data = response.data;

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