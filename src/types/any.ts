import { isArray, isObject } from 'lodash';

import { parseArray } from './array';
import { parseObject } from './object';
import { parsePrimitive } from './primitive';

export function parse(json: any | Array<any>) {
  return isArray(json)
    ? parseArray(json)
    : isObject(json)
    ? parseObject(json)
    : parsePrimitive(json);
}
