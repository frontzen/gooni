import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { client } from './adapter';
import { AnyMutateService, FullParameters } from './types';
import { serviceToClientArgs } from './utils';

export function useMutationService<S extends AnyMutateService>(
  service: S,
  options?: Omit<UseMutationOptions<S['Response'], unknown, FullParameters<S>, unknown>, 'mutationFn'>,
) {
  return useMutation((parameters: FullParameters<S>) => {
    const [method, url] = serviceToClientArgs(service, ...parameters);
    return client(method, url, parameters);
  }, options);
}