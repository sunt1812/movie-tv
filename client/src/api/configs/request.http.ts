import { AxiosResponse } from 'axios';
import privateClient from '../client/private.client';
import publicClient from '../client/public.client';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requestHttp = {
  // ======== public ======
  get: <T>(url: string) =>
    publicClient.get<T>(url).then(sleep(1000)).then(responseBody),
  post: <T>(url: string, body: {}) =>
    publicClient.post<T>(url, body).then(sleep(1000)).then(responseBody),
  // ======== public ======

  // ======== pravite ======
  getPrivate: <T>(url: string) =>
    privateClient.get<T>(url).then(sleep(1000)).then(responseBody),
  putPrivate: <T>(url: string, body: {}) =>
    privateClient.put<T>(url, body).then(sleep(1000)).then(responseBody),
  postPrivate: <T>(url: string, body: {}) =>
    privateClient.post<T>(url, body).then(sleep(1000)).then(responseBody),
  removePrivate: <T>(url: string) =>
    privateClient.delete<T>(url).then(sleep(1000)).then(responseBody),
  // ======== pravite ======
};
export default requestHttp;
