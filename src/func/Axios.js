import { default as axios } from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'digilib',
  },
  withCredentials: true
});

Axios.interceptors.response.use(
  function (res) {
    res.data.status = res.status;
    return res;
  },
  function (err) {
    err.message = err.response?.data?.message;
    err.data = err.response?.data;
    err.status = err.response?.status;

    if (import.meta.env.DEV) console.error(err);

    return Promise.reject(err);
  }
);

export default Axios;
