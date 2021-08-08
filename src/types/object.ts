import { isObject, values } from 'lodash';
import { Json } from 'types';
import { Schema } from '../schema.interface';
import { parse } from './any';

export function parseObject(object: Json): Schema {
  const objects = values(object);
  if (objects.length > 1 && objectsHaveSameKeys(objects)) {
    return {
      type: 'object',
      patternProperties: {
        '^(+)+$': parse(objects[0] as Json),
      },
    };
  } else {
    return {
      type: 'object',
      properties: Object.assign(
        {},
        ...Object.entries(object).map(([key, value]) => ({
          [key]: parse(value as Json),
        })),
      ),
    };
  }
}

function objectsHaveSameKeys(objects: Array<any>): boolean {
  const objToCompare = objects[0];
  let match = isObject(objToCompare);
  if (isObject(objToCompare)) {
    objects.forEach((obj) => {
      if (isObject(obj) && !compareKeys(objToCompare, obj)) {
        match = false;
      }
    });
  }
  return match;
}

function compareKeys(a: any, b: any) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
