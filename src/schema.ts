import * as fs from 'fs';
import * as path from 'path';
import { Json, Options } from 'types';
import { Schema } from './schema.interface';
import { parse } from './types/any';

/**
 * Returns a Json schema object
 * @param json A valid json structure
 * @param options Options to pass
 */
export function schemify(json: Json, options?: Options) {
  const schema: Schema = {
    ...(options && options.id && { $id: options.id }),
    $schema: 'http://json-schema.org/draft-07/schema#',
    ...(options && options.title && { title: options.title }),
    ...parse(json),
  };
  return schema;
}

/**
 * Write
 * @param json A valid json structure
 * @param filename The path of the output file to write to
 * @param options Options to pass
 */
export function writeSchema(json: Json, filepath: string, options?: Options) {
  const schema = schemify(json, options);
  if (!fs.existsSync(path.dirname(filepath))) {
    fs.mkdirSync(path.dirname(filepath));
  }
  if (options?.prettyPrint) {
    fs.writeFileSync(filepath, JSON.stringify(schema, null, 2));
  } else {
    fs.writeFileSync(filepath, JSON.stringify(schema));
  }
  if (!options?.silent) {
    console.log(`[json-schemify] Json schema written to ${filepath}`);
  }
}
