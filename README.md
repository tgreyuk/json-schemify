# json-schemify

![json-schemify](logos.png)

Converts any JSON structure to a valid [JSON Schema](http://json-schema.org/) object.

[![npm](https://img.shields.io/npm/v/json-schemify.svg)](https://www.npmjs.com/package/json-schemify)
![CI](https://github.com/tgreyuk/json-schemify/actions/workflows/ci.yml/badge.svg?branch=master)

## Getting started

### Installation

```js
npm install json-schemify --save-dev
```

### Usage

```js
const { writeSchema } = require('json-schemify');
```

## API

### writeSchema

**writeSchema**(`json`, `filepath`, `options`)

Writes to a JSON schema output file.

```js
const json= {
  firstName: 'John',
  lastName: 'Doe',
  age: 21,
}

writeSchema(json, 'schema.json');
```

#### Params

##### `json`

Any valid JSON.

##### `filepath`

The filepath of the file to write.

##### `options`

| Option       | Description                      |
| ------------ | -------------------------------- |
| id?          | The \$id property of the schema  |
| title?       | The title property of the schema |
| prettyPrint? | Pretty print Json  output        |

___

### schemify

**schemify**(`json`, `options`)

Returns the JSON schema object (rather than writing to file).


```js
const json= {
  firstName: 'John',
  lastName: 'Doe',
  age: 21,
}

const schema = schemify(json);

// do something with schema
console.log(schema);
```

#### Params

##### `json`

Any valid JSON.

##### `options`

| Option | Description                      |
| ------ | -------------------------------- |
| id?    | The \$id property of the schema  |
| title? | The title property of the schema |

#### Returns

A valid JSON Schema Object (draft-07)

## Example

This example returns a basic schema.

### Json

```js
{
  firstName: 'John',
  lastName: 'Doe',
  age: 21,
};
```

### Result

```js
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "firstName": { "type": "string" },
    "lastName": { "type": "string" },
    "age": { "type": "integer" }
  }
}
```


