import { isBoolean, isInteger, isNumber, isString } from 'lodash';
import { Schema } from '../schema.interface';

export function parsePrimitive(value: any): Schema {
    return {
        type: getType(value),
        ...(isString(value) && getFormat(value) && { format: getFormat(value) }),
    };
}

function getType(value: any) {
    return isBoolean(value)
        ? 'boolean'
        : isNumber(value) && !isInteger(value)
        ? 'number'
        : isInteger(value)
        ? 'integer'
        : isString(value)
        ? 'string'
        : 'null';
}

function getFormat(value: any) {
    const d = new RegExp(
        /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
    );
    const isDateTime = d.test(value);
    return isDateTime ? 'date-time' : undefined;
}
