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
const { schemify } = require('json-schemify');
```

or

```js
import { schemify } from 'json-schemify';
```

## API

The package exposes a single method:

### schemify(json, options)

```js
const schema = schemify(json, options);
```

#### Params

#### `json`

Any valid JSON.

#### `options`

Options object (all options are optional).

| Option | Description                      |
| ------ | -------------------------------- |
| id     | The \$id property of the schema  |
| title  | The title property of the schema |

#### Returns

A valid JSON Schema Object (draft-07)

## Basic Example

This example returns a schema at the most basic level:

### API


```js
const { schemify } = require('json-schemify');

const json = {
  firstName: 'John',
  lastName: 'Doe',
  age: 21,
};

const schema = schemify(json);

// do something with the schema
console.log(schema);
```

### Result

```js
{
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    firstName: { "type": "string" },
    lastName: { "type": "string" },
    age: { "type": "integer" }
  }
}
```


