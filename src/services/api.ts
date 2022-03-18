import { getToken } from "./auth.service";
import axios from 'axios';

const token = getToken();

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default api