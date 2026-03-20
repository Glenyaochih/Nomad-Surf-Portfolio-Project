import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminProductsAPI = {
    getProducts: (page = 1, category = '') => {
        const url = category
            ? `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}&category=${category}`
            : `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`;
        const req = axios.get(url);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    createProduct: (productData) => {
        const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, productData);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    updateProduct: (id, productData) => {
        const req = axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`, productData);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    deleteProduct: (id) => {
        const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file-to-upload', file);
        const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/upload`, formData);
        return Promise.all([req]).then(([res]) => {
            return {
                data: res.data,
            };
        });
    },
};
