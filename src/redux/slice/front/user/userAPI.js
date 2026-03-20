import axios from 'axios';

const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL;

export const getUserAPI = {
  userSignup: (data) => {
    const req = axios.post(`${USER_BASE_URL}/signup`, data);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
  userSignin: (data) => {
    const req = axios.post(`${USER_BASE_URL}/signin`, data);
    return Promise.all([req]).then(([res]) => {
      return {
        data: res.data,
      };
    });
  },
};
