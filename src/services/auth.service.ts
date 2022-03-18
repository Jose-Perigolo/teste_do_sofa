import api from "./api";

export async function login(email: string, password: string) {
    const response = await api
        .post("/users/login", {
            email,
            password
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

export function logout() {
    localStorage.removeItem("user");
}

export async function checkAuth() {
    const token = JSON.parse(localStorage.getItem('user.token') || '{}') !== null

    const response = await api
        .get("/users/validate", {
            headers: { 'Authorization': 'Bearer ' + token }
        });

    if (response.status === 200) {
        return true
    }

    return false;
}

export async function register(username: string, email: string, password: string) {
    const response = await api.post("/users/register", {
        username,
        email,
        password
    });

    if (response.status === 201) {
        return true
    }
    return false;
}

export function getToken() {
    return JSON.parse(localStorage.getItem('user.token') || '{}');
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}

