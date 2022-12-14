import { AnyService } from './types';

export interface Adapter {
  // MethodTypes: string;
  // QueryInputShape: {};
  // MutateInputShape: {};
}

export type MethodTypes = Adapter extends { MethodTypes: infer U } ? U : string;
export type QueryInputShape = Adapter extends { QueryInputShape: infer U } ? U : {};
export type MutateInputShape = Adapter extends { MutateInputShape: infer U } ? U : {};

interface ClientService<MethodTypes extends string = string> {
  <S extends AnyService>(method: MethodTypes, service: S, variables: S['Inputs']): Promise<S['Response']>;
}

type DefaultMethods = Record<'query' | 'mutate', MethodTypes>;

export let client: ClientService;

export let defaultMethods: DefaultMethods;

export function initClientAdapter(api: ClientService, methods: DefaultMethods) {
  client = api;
  defaultMethods = methods;
}
