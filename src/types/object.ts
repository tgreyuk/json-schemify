import { Schema } from '../schema.interface';
import { parse } from './any';

export function parseObject(object: {}): Schema {
  return {
    type: 'object',
    properties: Object.assign(
      {},
      ...Object.entries(object).map(([key, value]) => ({
        [key]: parse(value),
      })),
    ),
  };
}
