export interface Schema {
  $ref?: string;

  $id?: string;

  $schema?: string;

  title?: string;

  description?: string;

  /**
   * 6.1.1. type
   * The value of this keyword MUST be either a string or an array.
   * If it is an array, elements of the array MUST be strings and MUST be unique.
   * String values MUST be one of the six primitive types ("null", "boolean", "object", "array", "number", or "string"),
   * or "integer" which matches any number with a zero fractional part.
   * An instance validates if and only if the instance is in any of the sets listed for this keyword.
   */
  type?: 'boolean' | 'object' | 'array' | 'number' | 'string' | 'integer' | 'null';

  /**
   * date-time:
   * A string instance is valid against this attribute if it is a valid representation according to the "date-time" production
   * date:
   * A string instance is valid against this attribute if it is a valid representation according to the "full-date" production.
   * time:
   * A string instance is valid against this attribute if it is a valid representation according to the "full-time" production.
   * email:
   * As defined by RFC 5322, section 3.4.1 [RFC5322].
   */
  format?: 'date-time' | 'date' | 'time' | 'email';

  properties?: { [property: string]: Schema };

  patternProperties?: { [property: string]: Schema };

  items?: Schema | Array<Schema>;

  oneOf?: Array<Schema>;

  anyOf?: Array<Schema>;
}
