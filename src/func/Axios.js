import { default as Axios } from 'axios';

const axios = Axios.create({
  baseURL: 'https://digilib.jalanrahmat.id/api',
  headers: {
    'X-Requested-With': 'digilib',
  }
});

axios.interceptors.request.use(
  function (config) {
    if (config.headers.Authorization) return config;

    // TODO: get token
    // config.headers.Authorization = 'Bearer ' + token
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (res) {
    res.data.status = res.status;
    return res;
  },
  function (err) {
    err.message = err.response?.data?.message;
    err.data = err.response?.data;
    err.status = err.response?.status;

    return Promise.reject(err);
  }
);

export default axios;
