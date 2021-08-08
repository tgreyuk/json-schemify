import { isArray, isObject } from 'lodash';
import { Json } from 'types';
import { parseArray } from './array';
import { parseObject } from './object';
import { parsePrimitive } from './primitive';

export function parse(json: Json | number | string) {
  return isArray(json)
    ? parseArray(json)
    : isObject(json)
    ? parseObject(json)
    : parsePrimitive(json);
}
