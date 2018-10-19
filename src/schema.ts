import { Schema } from './schema.interface';
import { parse } from './types/any';

/**
 * Return a generated schema as a json object
 * @param json A valid json object or array
 * @param options Options to pass
 */
export function generate(
  json: {} | Array<any>,
  options?: { id?: string; title?: string },
) {
  const schema: Schema = {
    ...(options && options.id && { $id: options.id }),
    $schema: 'http://json-schema.org/draft-07/schema#',
    ...(options && options.title && { title: options.title }),
    ...parse(json),
  };
  return schema;
}
