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

interface ClientAdapter {
  <S extends AnyService>(
    method: MethodTypes,
    service: S,
    adapterInputs: S['Inputs'],
    context?: QueryFunctionContext,
  ): Promise<S['Response']>;
}

type DefaultMethods = Record<'query' | 'mutate', MethodTypes>;

export let clientAdapter: ClientAdapter = () => {
  throw new Error('using data-service before initializing its adapter');
};

export let defaultMethods: DefaultMethods;

export function initClientAdapter(_clientAdapter: ClientAdapter, methods: DefaultMethods) {
  clientAdapter = _clientAdapter;
  defaultMethods = methods;
}
