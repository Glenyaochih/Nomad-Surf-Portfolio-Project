import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminOrdersAPI = {
    getOrders: (page = 1) => {
        const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`);
        return Promise.all([req]).then(([res]) => res);
    },
    updateOrder: (id, orderData) => {
        const req = axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`, orderData);
        return Promise.all([req]).then(([res]) => res);
    },
    deleteOrder: (id) => {
        const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`);
        return Promise.all([req]).then(([res]) => res);
    },
    deleteAllOrders: () => {
        const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/all`);
        return Promise.all([req]).then(([res]) => res);
    },
};
