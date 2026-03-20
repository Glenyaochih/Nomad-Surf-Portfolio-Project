import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminAuthAPI = {
    login: (account) => {
        const req = axios.post(`${BASE_URL}/v2/admin/signin`, account);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    logout: () => {
        const req = axios.post(`${BASE_URL}/v2/logout`);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    checkAuth: () => {
        const req = axios.post(`${BASE_URL}/v2/api/user/check`);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
};
