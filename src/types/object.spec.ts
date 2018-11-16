import { parseObject } from './object';

test('should return correct object type', () => {
  const json = {
    name: 'John Doe',
    age: 21,
  };
  const result = parseObject(json);
  expect(result).toEqual({
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'integer' },
    },
  });
});

test('should return object keys as pattern properties', () => {
  const json = {
    x: {
      name: 'John Doe',
      age: 21,
    },
    2: {
      name: 'Peter Smith',
      age: 30,
    },
  };
  const result = parseObject(json);
  expect(result).toEqual({
    type: 'object',
    patternProperties: {
      '^(+)+$': {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
        },
      },
    },
  });
});
