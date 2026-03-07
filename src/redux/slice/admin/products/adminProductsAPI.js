import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminProductsAPI = {
    getProducts: async (page = 1, category = '') => {
        const url = category
            ? `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}&category=${category}`
            : `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`;
        return axios.get(url);
    },
    createProduct: async (productData) => {
        return axios.post(
            `${BASE_URL}/v2/api/${API_PATH}/admin/product`,
            productData
        );
    },
    updateProduct: async (id, productData) => {
        return axios.put(
            `${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`,
            productData
        );
    },
    deleteProduct: async (id) => {
        return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`);
    },
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file-to-upload', file);
        return axios.post(
            `${BASE_URL}/v2/api/${API_PATH}/admin/upload`,
            formData
        );
    },
};
