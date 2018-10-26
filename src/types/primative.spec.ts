import { parsePrimitive } from './primitive';

test('should return a string', () => {
  const data = 'hello';
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'string',
  });
});

test('should return string with date-time format', () => {
  const data = '2013-10-21T13:28:06.419Z';
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'string',
    format: 'date-time',
  });
});

test('should return a boolean', () => {
  const data = true;
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'boolean',
  });
});

test('should return null', () => {
  const data = null;
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'null',
  });
});

test('should return integer', () => {
  const data = 42;
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'integer',
  });
});

test('should return number', () => {
  const data = 3.1415926;
  const result = parsePrimitive(data);
  expect(result).toEqual({
    type: 'number',
  });
});
