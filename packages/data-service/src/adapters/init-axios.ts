/// <reference path="./rest.d.ts" />
import { AxiosInstance } from 'axios';
import { initClientAdapter } from '../adapter';

export const initAxiosAdapter = (api: AxiosInstance) =>
  initClientAdapter(
    async (method, url, inputs) => {
      const summaryKey = ['get', 'delete'].includes(method) ? 'query' : 'body';
      const fullInputs: typeof inputs = inputs.query || inputs.body ? inputs : { [summaryKey]: inputs };
      const res = await api({ method, url, params: fullInputs.query, data: fullInputs.body });
      return res.data;
    },
    { query: 'get', mutate: 'post' },
  );
