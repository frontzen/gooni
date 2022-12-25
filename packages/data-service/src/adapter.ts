import { QueryFunctionContext } from '@tanstack/react-query';
import { AnyService } from './types';

export interface Adapter {
  // MethodTypes: string;
  // QueryInputShape: {};
  // MutateInputShape: {};
}

export type MethodTypes = Adapter extends { MethodTypes: infer U } ? U : string;
export type QueryInputShape = Adapter extends { QueryInputShape: infer U } ? U : {};
export type MutateInputShape = Adapter extends { MutateInputShape: infer U } ? U : {};

interface AdapterClient<MethodTypes extends string = string> {
  <S extends AnyService>(
    method: MethodTypes,
    service: S,
    adapterInputs: S['Inputs'],
    context?: QueryFunctionContext,
  ): Promise<S['Response']>;
}

type DefaultMethods = Record<'query' | 'mutate', MethodTypes>;

export let client: AdapterClient = () => {
  throw new Error('using data-service before initializing its adapter');
};

export let defaultMethods: DefaultMethods;

export function initAdapterClient(adapterClient: AdapterClient, methods: DefaultMethods) {
  client = adapterClient;
  defaultMethods = methods;
}
