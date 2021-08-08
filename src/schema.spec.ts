import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs';
import * as tmp from 'tmp';
import { schemify, writeSchema } from './schema';

const mockJson = {
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

beforeEach(() => {});

test('should declare JSON schema as draft-07', () => {
  const schema = schemify(mockJson);
  expect(schema.$schema).toEqual('http://json-schema.org/draft-07/schema#');
});

test('should declare a unique identifier if required', () => {
  const schema = schemify(mockJson, {
    id: 'http://shema/id.json',
  });
  expect(schema.$id).toEqual('http://shema/id.json');
});

test('should declare a title if required', () => {
  const schema = schemify(mockJson, { title: 'Mock Schema' });
  expect(schema.title).toEqual('Mock Schema');
});

test('should validate that the mock json validates against the generated schema', () => {
  const schema = schemify(mockJson, {
    id: 'http://shema/id.json',
    title: 'Mock Schema',
  });
  const ajv = new Ajv();
  addFormats(ajv);
  const valid = ajv.validate(schema, mockJson);
  if (ajv.errors) {
    console.error(ajv.errors);
  }
  expect(valid).toBeTruthy();
});

test('should write to file', () => {
  tmp.setGracefulCleanup();
  const tmpobj = tmp.dirSync();
  const jsonfile = tmpobj.name + '/schema.json';
  writeSchema(mockJson, jsonfile, {
    prettyPrint: true,
    silent: true,
  });
  expect(fs.readFileSync(jsonfile).toString()).toMatchSnapshot();
});
