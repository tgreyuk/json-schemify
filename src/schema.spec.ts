import * as Ajv from 'ajv';
import * as jsonfile from 'jsonfile';
import { schemify } from './schema';
import { Schema } from './schema.interface';

let schema: Schema;
let mockJson: {};

beforeEach(() => {
  mockJson = {
    title: 'Mock JSON',
    id: 100,
    date: '2013-10-21T13:28:06.419Z',
    fruits: ['apple', 'orange', 'pear'],
    mixed: ['stuff', null, 200],
    employers: [
      {
        name: 'John Doe',
        age: 21,
      },
      {
        name: 'John Doe',
        age: null,
      },
    ],
    person: {
      name: 'John Doe',
      age: 21,
    },
    coords: {
      latitude: 48.858093,
      longitude: 2.294694,
    },
  };
});

test('should declare JSON schema as draft-07', () => {
  schema = schemify(mockJson);
  jsonfile.writeFileSync('./logs/mock.schema.json', schema);
  expect(schema.$schema).toEqual('http://json-schema.org/draft-07/schema#');
});

test('should declare a unique identifier if required', () => {
  schema = schemify(mockJson, { id: 'http://shema/id.json' });
  expect(schema.$id).toEqual('http://shema/id.json');
});

test('should declare a title if required', () => {
  schema = schemify(mockJson, { title: 'Mock Schema' });
  expect(schema.title).toEqual('Mock Schema');
});

test('should validate that the mock json validates against the generated schema', () => {
  schema = schemify(mockJson);
  const ajv = new Ajv();
  const valid = ajv.validate(schema, mockJson);
  if (ajv.errors) {
    console.error(ajv.errors);
  }
  expect(valid).toBeTruthy();
});
