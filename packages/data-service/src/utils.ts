import { defaultMethods, MethodTypes, MutateInputShape, QueryInputShape } from './adapter';
import { templateParamRegex } from './constants';
import { AnyService, FullParameters, Service } from './types';

/**
 * @sig (base , method) -> path -> service
 * @param base
 * @param method
 * @returns a service with fully typed properties
 */
export const createService =
  <Inputs, Response>(base: string, method: MethodTypes) =>
  <Path extends string>(path: Path) => {
    return `${method}:${base}${path}` as Service<Path, Inputs, Response>;
  };

export const createMutateService = <Inputs extends MutateInputShape, Response>(
  base: string = '',
  method: MethodTypes = defaultMethods.mutate,
) => createService<Inputs, Response>(base, method);

export const createQueryService = <Response, Inputs extends QueryInputShape>(
  base: string = '',
  method: MethodTypes = defaultMethods.query,
) => createService<Inputs, Response>(base, method);

export function queryKeyGen<S extends AnyService>(service: S, ...variables: FullParameters<S>): [S, FullParameters<S>] {
  return [service, variables];
}

/**
 *@param service - a url with method prefix and with or without templateParams
 *@param parameters - all service params including templateParams values
 *@example serviceToClientArgs('get:/posts/{id}' , [{id : 12}, x]) // returns ['get', '/posts/12', x]
 */
export const serviceToClientArgs = <S extends AnyService>(
  service: S,
  ...parameters: FullParameters<S>
): [MethodTypes, S, S['Inputs']] => {
  const method = service.split(':')[0] as MethodTypes;
  let url = service.replace(`${method}:`, '') as S;
  const [templateParams, adapterInputs] = parameters.length === 1 ? [null, parameters[0]] : parameters;

  if (templateParams) {
    url = url.replaceAll(templateParamRegex, (_, templateParamName: string) =>
      templateParamName in templateParams ? (templateParams as Record<string, string>)[templateParamName] : '',
    ) as S;
  }

  return [method, url, adapterInputs];
};
