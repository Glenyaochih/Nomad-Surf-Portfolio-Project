import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminCouponsAPI = {
    getCoupons: (page = 1) => {
        const req = axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`);
        return Promise.all([req]).then(([res]) => res);
    },
    createCoupon: (couponData) => {
        const req = axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, couponData);
        return Promise.all([req]).then(([res]) => res);
    },
    updateCoupon: (id, couponData) => {
        const req = axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`, couponData);
        return Promise.all([req]).then(([res]) => res);
    },
    deleteCoupon: (id) => {
        const req = axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`);
        return Promise.all([req]).then(([res]) => res);
    },
};
