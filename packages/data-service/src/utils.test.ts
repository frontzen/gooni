import { useQueryService } from './queries';
import { createQueryService, createService, queryKeyGen, serviceToClientArgs } from './utils';

describe('serviceToClientArgs', () => {
  describe('inject template params', () => {
    const generateService = createService<void, {}>('', 'get');

    it('should return correct result with no template param', () => {
      const result = serviceToClientArgs(generateService('/posts'));
      expect(result[1]).toEqual('/posts');
    });
    it('should return correct result with template params', () => {
      const result = serviceToClientArgs(generateService('/posts/{id:number}'), { id: 2 });
      expect(result[1]).toEqual('/posts/2');
    });
    it('should return correct result with a result that has just params', () => {
      const result = serviceToClientArgs(generateService('/{id:number}/{name}'), { id: 2, name: 'John' });
      expect(result[1]).toEqual('/2/John');
    });
    it('should return correct result with a result that contains multiple params', () => {
      const result = serviceToClientArgs(generateService('/posts/{postId:number}/user/{name}'), {
        postId: 2,
        name: 'John',
      });
      expect(result[1]).toEqual('/posts/2/user/John');
    });
  });

  describe('extract methods', () => {
    it('should return correct result with no template param', () => {
      const result = serviceToClientArgs(createService('', 'get')('/posts'), []);
      expect(result).toEqual(['get', '/posts', []]);
    });
    it('should return correct result with template params', () => {
      const result = serviceToClientArgs(createService('baseUrl', 'del')('/posts'), []);
      expect(result).toEqual(['del', 'baseUrl/posts', []]);
    });
  });

  describe('extracting inputs', () => {
    const generateService = createService('', 'get');

    it('should return correct result with no template param', () => {
      const result = serviceToClientArgs(generateService('/posts'), [{ foo: '' }]);
      expect(result).toEqual(['get', '/posts', [{ foo: '' }]]);
    });
    it('should return correct result with no template param', () => {
      const result = serviceToClientArgs(generateService('/posts/{id:number}'), { id: 5 }, { foo: '' });
      expect(result).toEqual(['get', '/posts/5', [{ foo: '' }]]);
    });
  });
});

describe('examples of createService and queryKeyGen (type-checking)', () => {
  interface IResponse {}
  type IQueryParams = { a: string };
  interface IBodyInput {}

  const myService1 = createQueryService<IResponse, { query: IQueryParams; body: IBodyInput }>('', 'get')('/posts/{id}');
  const myService2 = createService<{ query: IQueryParams; body?: IBodyInput } | [IQueryParams, IBodyInput?], IResponse>(
    '',
    'post',
  )('/posts/{id}');
  const myService3 = createService<[void, IBodyInput], IResponse>('', 'put')('/posts');
  const myService4 = createService<{ body: IBodyInput }, IResponse>('', 'put')('/posts');

  queryKeyGen(myService1, { id: '' }, { query: { a: '' }, body: {} });
  queryKeyGen(myService2, { id: '' }, { query: { a: '' } });
  queryKeyGen(myService2, { id: '' }, [{ a: '' }]);
  queryKeyGen(myService3, [undefined, {}]);
  queryKeyGen(myService4, { body: {} });

  useQueryService(myService1, [{ id: '' }, { query: { a: '' }, body: {} }], {
    enabled: false,
  });
});
