import { useQueryService } from './queries';
import { createQueryService, createService, queryKeyGen, serviceToClientArgs } from './utils';

describe('serviceToClientArgs', () => {
  describe('inject template params', () => {
    const generateService = createService<null, {}>('', 'get');

    it('should return correct result with no template param', () => {
      const result = serviceToClientArgs(generateService('/posts'), null);
      expect(result[1]).toEqual('/posts');
    });
    it('should return correct result with template params', () => {
      const result = serviceToClientArgs(generateService('/posts/{id:number}'), { id: 2 }, null);
      expect(result[1]).toEqual('/posts/2');
    });
    it('should return correct result with a result that has just params', () => {
      const result = serviceToClientArgs(generateService('/{id:number}/{name}'), { id: 2, name: 'John' }, null);
      expect(result[1]).toEqual('/2/John');
    });
    it('should return correct result with a result that contains multiple params', () => {
      const result = serviceToClientArgs(
        generateService('/posts/{postId:number}/user/{name}'),
        {
          postId: 2,
          name: 'John',
        },
        null,
      );
      expect(result[1]).toEqual('/posts/2/user/John');
    });
  });

  describe('extract methods', () => {
    it('should extract correctly without baseUrl', () => {
      const result = serviceToClientArgs(createService('', 'get')('/posts'), []);
      expect(result).toEqual(['get', '/posts', []]);
    });
    it('should extract correctly with baseUrl', () => {
      const result = serviceToClientArgs(createService('baseUrl', 'del')('/posts'), []);
      expect(result).toEqual(['del', 'baseUrl/posts', []]);
    });
  });

  describe('extracting inputs', () => {
    const generateService = createService('', 'get');

    it('should extract inputParams without templateParam', () => {
      const result = serviceToClientArgs(generateService('/posts'), [1, 2]);
      expect(result).toEqual(['get', '/posts', [1, 2]]);
    });
    it('should extract inputParams with templateParam', () => {
      const result = serviceToClientArgs(generateService('/posts/{id:number}'), { id: 5 }, { foo: '' });
      expect(result).toEqual(['get', '/posts/5', { foo: '' }]);
    });
  });
});

/**
 * examples of createService and queryKeyGen (type-checking)
 */
const queryKeyGenExamples = () => {
  interface IResponse {}
  type IQueryParams = { a: string };
  interface IBodyInput {}

  const myService1 = createQueryService<IResponse, { query: IQueryParams; body: IBodyInput }>('', 'get')('/posts/{id}');
  const myService2 = createService<{ query: IQueryParams; body?: IBodyInput } | [IQueryParams, IBodyInput?], IResponse>(
    '',
    'post',
  )('/posts/{id}');
  const myService3 = createService<[null, IBodyInput], IResponse>('', 'put')('/posts');
  const myService4 = createService<{ body: IBodyInput }, IResponse>('', 'put')('/posts');

  queryKeyGen(myService1, { id: '' }, { query: { a: '' }, body: {} });
  queryKeyGen(myService2, { id: '' }, { query: { a: '' } });
  queryKeyGen(myService2, { id: '' }, [{ a: '' }]);
  queryKeyGen(myService3, [null, {}]);
  queryKeyGen(myService4, { body: {} });

  const useServiceQuery = () =>
    useQueryService(myService1, [{ id: '' }, { query: { a: '' }, body: {} }], {
      enabled: false,
    });
};
