import { IsolatedComponent } from '@front.zen/react';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { ReactChild, ReactElement, Suspense } from 'react';
import { AnyService, FullParameters } from './types';

type Props<S extends AnyService> = Omit<
  UseQueryOptions<S['Response'], unknown, S['Response'], [S, FullParameters<S>]>,
  'initialData'
> & {
  fallback?: ReactChild;
  render: (data: S['Response'], result: UseQueryResult<S['Response']>) => ReactElement;
};

export function QueryServiceRenderer<S extends AnyService>({ render, fallback, ...options }: Props<S>) {
  function useRender() {
    const result = useQuery(options);
    const data = result.data!;
    return render(data, result);
  }
  return (
    <Suspense fallback={fallback || null}>
      <IsolatedComponent useRender={useRender} />
    </Suspense>
  );
}
