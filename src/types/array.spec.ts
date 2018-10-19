import { parseArray } from './array';

test('should return correct array type', () => {
  const array = ['apple', 'orange', 'pear'];
  const result = parseArray(array);
  expect(result).toEqual({ type: 'array', items: { type: 'string' } });
});

test('should return correct oneOf defs for mixed types', () => {
  const array = ['stuff', null, 200];
  const result = parseArray(array);
  expect(result).toEqual({
    type: 'array',
    items: {
      oneOf: [{ type: 'string' }, { type: 'null' }, { type: 'integer' }],
    },
  });
});

test('should merge array types of object properties', () => {
  const array = [
    {
      a: '1',
      b: '2',
      c: '3',
    },
    {
      a: 1,
      b: '2',
    },
    {
      a: null,
      b: '2',
    },
    {
      a: '1',
      b: '2',
    },
  ];
  const result = parseArray(array);
  expect(result).toEqual({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        a: { type: ['string', 'integer', 'null'] },
        b: { type: 'string' },
        c: { type: 'string' },
      },
    },
  });
});

test('should allow any schema with an empty array', () => {
  const array: Array<any> = [];
  const result = parseArray(array);
  expect(result).toEqual({
    type: 'array',
    items: {},
  });
});
