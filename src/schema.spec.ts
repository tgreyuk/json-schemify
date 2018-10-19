import * as Ajv from 'ajv';
import * as jsonfile from 'jsonfile';
import { generate } from './schema';
import { Schema } from './schema.interface';

let json: {};
let schema: Schema;

beforeEach(() => {
  json = jsonfile.readFileSync(`./spec/mock.json`);
});

test('should declare JSON schema as draft-07', () => {
  schema = generate(json);
  expect(schema.$schema).toEqual('http://json-schema.org/draft-07/schema#');
});

test('should declare a unique identifier if required', () => {
  schema = generate(json, { id: 'http://shema/id.json' });
  expect(schema.$id).toEqual('http://shema/id.json');
});

test('should declare a title if required', () => {
  schema = generate(json, { title: 'Mock Schema' });
  expect(schema.title).toEqual('Mock Schema');
});

test('should validate that the mock json validates against the generated schema', () => {
  schema = generate(json);
  jsonfile.writeFileSync('./spec/out/schema.mock.json', schema);
  const ajv = new Ajv();
  const valid = ajv.validate(schema, json);
  if (ajv.errors) {
    console.error(ajv.errors);
  }
  expect(valid).toBeTruthy();
});
