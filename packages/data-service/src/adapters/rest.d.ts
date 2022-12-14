import { Adapter as BaseAdapter } from '../..';

declare module '@front.zen/data-service' {
  export interface Adapter extends BaseAdapter {
    MethodTypes: 'get' | 'put' | 'post' | 'delete';
    QueryInputShape: { query?: any; body?: any };
    MutateInputShape: { query?: any; body?: any };
  }
}
