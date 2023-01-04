import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { clientAdapter } from './adapter';
import { AnyMutateService, FullParameters } from './types';
import { serviceToClientArgs } from './utils';

export function useMutationService<S extends AnyMutateService>(
  service: S,
  options?: Omit<UseMutationOptions<S['Response'], unknown, FullParameters<S>, unknown>, 'mutationFn'>,
) {
  return useMutation((parameters: FullParameters<S>) => {
    const [method, url, adapterInputs] = serviceToClientArgs(service, ...parameters);
    return clientAdapter(method, url, adapterInputs);
  }, options);
}
