import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminOrdersAPI = {
    getOrders: async (page = 1) => {
        return axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`);
    },
    updateOrder: async (id, orderData) => {
        return axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`, orderData);
    },
    deleteOrder: async (id) => {
        return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`);
    },
    deleteAllOrders: async () => {
        return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/orders/all`);
    },
};
