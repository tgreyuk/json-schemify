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
