import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminAuthAPI = {
    login: async (account) => {
        return axios.post(`${BASE_URL}/v2/admin/signin`, account);
    },
    logout: async () => {
        return axios.post(`${BASE_URL}/v2/logout`);
    },
    checkAuth: async () => {
        return axios.post(`${BASE_URL}/v2/api/user/check`);
    },
};
