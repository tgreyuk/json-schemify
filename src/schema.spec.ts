import * as Ajv from 'ajv';
import * as jsonfile from 'jsonfile';
import { schemify } from './schema';
import { Schema } from './schema.interface';

let schema: Schema;
let mockJson: {};

beforeEach(() => {
  mockJson = {
    fixtures: [
      {
        deadline_time: '2018-08-10T18:00:00Z',
        stats: [
          {
            goals_scored: {
              a: [
                {
                  value: 1,
                },
              ],
            },
          },
        ],
      },
    ],
  };
});

test('should declare JSON schema as draft-07', () => {
  schema = schemify(mockJson);
  jsonfile.writeFileSync('./logs/mock.schema.json', schema);
  expect(schema.$schema).toEqual('http://json-schema.org/draft-07/schema#');
  const eventLive = jsonfile.readFileSync('./logs/event-live.json');
  const testSchema = schemify(eventLive);
  jsonfile.writeFileSync('./logs/event-live.schema.json', testSchema);
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
