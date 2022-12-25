import { AnyObject } from '@front.zen/utils';
import { Adapter as BaseAdapter } from '../..';

declare module '@front.zen/data-service' {
  type FullAdapterInputs = { query?: AnyObject; body?: AnyObject };
  type SummaryAdapterInputs = AnyObject;
  export interface Adapter extends BaseAdapter {
    MethodTypes: 'get' | 'put' | 'post' | 'delete';
    QueryInputShape: FullAdapterInputs | SummaryAdapterInputs;
    MutateInputShape: FullAdapterInputs | SummaryAdapterInputs;
  }
}
