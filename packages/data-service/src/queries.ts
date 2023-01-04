import {
  DefinedUseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AnyQueryService, FullParameters } from './types';
import { queryKeyGen } from './utils';

/**
 * TODO:
 * 1- manage initial data overload when needed
 * 2- manage selector generic when needed
 */
export function useQueryService<S extends AnyQueryService>(
  service: S,
  variables: FullParameters<S>,
  options?: Omit<UseQueryOptions<S['Response'], unknown, S['Response']>, 'queryKey' | 'suspense' | 'enabled'> & {
    suspense?: true;
    enabled?: true;
  },
): DefinedUseQueryResult<S['Response'], unknown>;

export function useQueryService<S extends AnyQueryService>(
  service: S,
  variables: FullParameters<S>,
  options?: Omit<UseQueryOptions<S['Response'], unknown, S['Response']>, 'queryKey'>,
): UseQueryResult<S['Response'], unknown>;

export function useQueryService<S extends AnyQueryService>(service: S, variables: FullParameters<S>, options: any) {
  return useQuery(queryKeyGen(service, ...variables), options);
}

export function useInfiniteQueryService<S extends AnyQueryService>(
  service: S,
  variables: FullParameters<S>,
  options?: Omit<UseInfiniteQueryOptions<S['Response'], unknown, S['Response'], S['Response']>, 'queryKey'>,
) {
  return useInfiniteQuery<S['Response']>(queryKeyGen(service, ...variables), options);
}
