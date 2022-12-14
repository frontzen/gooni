/// <reference path="./rest.d.ts" />
import { AxiosInstance } from 'axios';
import { initClientAdapter } from '../adapter';

export const initAxiosClient = (api: AxiosInstance) =>
  initClientAdapter(
    (method, url, variables) => {
      return api({ method, url, params: variables.query, data: variables.body }).then((x) => x.data);
    },
    { query: 'get', mutate: 'post' },
  );
