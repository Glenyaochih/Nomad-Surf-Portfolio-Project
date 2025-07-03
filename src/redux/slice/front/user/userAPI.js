import axios from 'axios';

export const getUserAPI = {
  userRegister: async (data) => {
    return axios.post('https://nomad-server-4254.onrender.com/register', data);
  },
  userSignup: async (data) => {
    return axios.post('https://nomad-server-4254.onrender.com/register', data);
  },
};
