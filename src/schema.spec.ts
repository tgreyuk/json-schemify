import * as Ajv from 'ajv';
import { schemify } from './schema';
import { Schema } from './schema.interface';

let json: {};
let schema: Schema;

beforeEach(() => {
  json = require(`../spec/mock.js`);
});

test('should declare JSON schema as draft-07', () => {
  schema = schemify(json);
  expect(schema.$schema).toEqual('http://json-schema.org/draft-07/schema#');
});

test('should declare a unique identifier if required', () => {
  schema = schemify(json, { id: 'http://shema/id.json' });
  expect(schema.$id).toEqual('http://shema/id.json');
});

test('should declare a title if required', () => {
  schema = schemify(json, { title: 'Mock Schema' });
  expect(schema.title).toEqual('Mock Schema');
});

test('should validate that the mock json validates against the generated schema', () => {
  schema = schemify(json);
  const ajv = new Ajv();
  const valid = ajv.validate(schema, json);
  if (ajv.errors) {
    console.error(ajv.errors);
  }
  expect(valid).toBeTruthy();
});
