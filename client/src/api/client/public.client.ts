import axios, { AxiosError } from 'axios';
import queryString from 'query-string';

const baseURL = 'http://movie-tv-api.vercel.app/api/v1/';

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use((config) => {
  return {
    ...config,

    params: {
      ...config.params,
    },
  };
});

publicClient.interceptors.response.use(
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

export default publicClient;
