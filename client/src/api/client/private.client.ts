import axios, { AxiosError } from 'axios';
import queryString from 'query-string';

const baseURL = 'http://localhost:5000/api/v1/';

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
privateClient.interceptors.request.use(
  async (config) => {
    if (config.url && config.url.charAt(0) !== '/') {
      config.url = `${baseURL}${config.url}`;
    }

    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  (error) => Promise.reject(error)
);

privateClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        throw error.response?.data;
      // console.error(data);
      // break;

      case 401:
        throw error.response?.data;
      // console.error('unauthorised');
      // break;

      case 404:
        throw error.response?.data;
      // console.log('/not-found');
      // break;

      case 500:
        throw error.response?.data;
      // console.error('/server-error');
      // break;
    }
    return Promise.reject(error.response?.data);
  }
);

export default privateClient;
