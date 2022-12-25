import type { IsNever } from 'ts-essentials';

type ParseType<Type> = Type extends `${infer L}|${infer R}`
  ? ParseType<L> | ParseType<R>
  : Type extends 'number'
  ? number
  : Type extends 'string'
  ? string
  : Type;

type Parameters<Path extends string> = Path extends `${string}{${infer Token}}${infer Rest}`
  ? Token | Parameters<Rest>
  : never;

export type TemplateParamsType<Path extends string> = IsNever<Parameters<Path>> extends true
  ? never
  : {
      [K in Parameters<Path> as K extends `${infer Key}:${string}` ? Key : K]: K extends `${string}:${infer Type}`
        ? ParseType<Type>
        : string;
    };

export type Service<
  Path extends string,
  Inputs,
  Response,
  TemplateParams extends object = TemplateParamsType<Path>,
> = Path & {
  TemplateParams: TemplateParams;
  Inputs: Inputs;
  Response: Response;
};

export type FullParameters<S extends AnyService> = S['TemplateParams'] extends void
  ? [adapterInputs: S['Inputs']]
  : [templateParams: S['TemplateParams'], adapterInputs: S['Inputs']];

export type AnyService = Service<string, any, any, object>;

export type AnyMutateService = AnyService;
export type AnyQueryService = AnyService;
