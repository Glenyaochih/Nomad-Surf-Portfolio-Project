import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const adminCouponsAPI = {
    getCoupons: async (page = 1) => {
        return axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`);
    },
    createCoupon: async (couponData) => {
        return axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, couponData);
    },
    updateCoupon: async (id, couponData) => {
        return axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`, couponData);
    },
    deleteCoupon: async (id) => {
        return axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`);
    },
};
