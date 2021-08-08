export interface Options {
  id?: string;
  title?: string;
  prettyPrint?: boolean;
  silent?: boolean;
}

export type Json = Record<string, unknown> | Array<any>;
