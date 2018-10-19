import * as any from './any';
import * as array from './array';
import * as object from './object';
import * as primitive from './primitive';

test('should parse as array if json is an array type', () => {
  const spy = jest.spyOn(array, 'parseArray');
  const json = [1, 2, 3];
  any.parse(json);
  expect(spy).toHaveBeenCalled();
});

test('should parse as object if json is an object type', () => {
  const spy = jest.spyOn(object, 'parseObject');
  const json = { a: 1, b: 2 };
  any.parse(json);
  expect(spy).toHaveBeenCalled();
});

test('should parse as primitive if json is a primative type', () => {
  const spy = jest.spyOn(primitive, 'parsePrimative');
  const json = 1;
  any.parse(json);
  expect(spy).toHaveBeenCalled();
});
