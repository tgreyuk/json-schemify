import { isArray, isEqual, mergeWith, uniqWith } from 'lodash';
import { Schema } from '../schema.interface';
import { parse } from './any';

export function parseArray(array: Array<any>): Schema {
  return {
    type: 'array',
    items: getItems(array) || {},
  };
}

function getItems(array: Array<any>): Schema | Array<Schema> {
  const arrayOfTypes: Array<any> = uniqWith(
    array.map(item => {
      return parse(item);
    }),
    isEqual,
  );

  if (arrayOfTypes.length > 1) {
    const compareObjects: Array<{}> = [];
    arrayOfTypes.forEach(type => {
      if (type.properties) {
        compareObjects.push(type.properties);
      }
    });

    if (compareObjects.length > 1 && objectsHaveSameKeys(compareObjects)) {
      const mergeObject = compareObjects[0];
      for (let i = 1; i < compareObjects.length; i++) {
        mergeWith(mergeObject, compareObjects[i], (mergeValue, compareValue) => {
          //if (!mergeValue) {
          // return null;
          //}
          if (isArray(mergeValue.type)) {
            return {
              type: mergeValue.type.includes(compareValue.type)
                ? mergeValue.type
                : [...mergeValue.type, compareValue.type],
            };
          } else if (!isEqual(mergeValue, compareValue)) {
            return { type: [mergeValue.type, compareValue.type] };
          } else {
            return mergeValue;
          }
        });
      }
      return { type: 'object', properties: mergeObject };
    } else {
      return {
        oneOf: arrayOfTypes,
      };
    }
  } else {
    return arrayOfTypes[0];
  }
}

function objectsHaveSameKeys(...objects: Array<any>): boolean {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}
