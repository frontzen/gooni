import { QueryClientConfig, QueryFunction, QueryFunctionContext } from '@tanstack/react-query';
import { client } from './adapter';
import { AnyQueryService, FullParameters } from './types';
import { serviceToClientArgs as serviceToAdapterArgs } from './utils';

const defaultQueryFn = <S extends AnyQueryService>(context: QueryFunctionContext<readonly [S, FullParameters<S>]>) => {
  const [service, parameters] = context.queryKey;

  if (typeof service !== 'string' || (parameters !== undefined && typeof parameters !== 'object')) {
    throw new Error(`default query function called by unsupported params. url=${service} variables=${parameters}`);
  }

  const [method, url, adapterInputs] = serviceToAdapterArgs(service, ...parameters);
  return client(method, url, adapterInputs, context);
};

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn as QueryFunction,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
};
