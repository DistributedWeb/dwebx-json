# dwebx-json

read &amp; write dwebx.json files. Uses toiletdb under the hood.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

## Install

```
npm install dwebx-json
```

## Usage

```js
var DWebxJSON = require('dwebx-json')

var dwebxjson = DWebxJSON(archive)

dwebxjson.create({title: 'a dwebx', description: 'exciting'}, function (err) {
  if (err) throw err
})

dwebxjson.read(function (err, data) {
  console.log(data)
})
```

Write to a `dwebx.json` on the file system also:

```js
var DWebxJSON = require('dwebx-json')

var dwebxjson = DWebxJSON(archive, {file: path.join(dwebx.path, 'dwebx.json')})

dwebxjson.create({title: 'a dwebx', description: 'exciting'}, function (err) {
  if (err) throw err
})
```

**TODO: replace file option with ddrive indexing**

## API

### `var dwebxjson = DWebxJSON(archive, [opts])`

create a new dwebxJson db

Options:

* `opts.file` - dwebx.json file path, updates will be written to file system and archive

#### `dwebxjson.create([data], cb)`

Create a new `dwebx.json` file in the archive with the default keys (`url`, `title`, `description`). Pass in any additional data to add on initial create.

#### `dwebxjson.write(key, val, cb)` or `dwebxjson.write(data, cb)`

Write a single `key` and `value` or an object, `data`, to the `dwebx.json` file. Use `file` option above to also update the file on the file system.

#### `dwebxjson.delete(key, cb)`

Delete a `key` from the `dwebx.json` file.

#### `dwebxjson.read(cb)`

Read the current `dwebx.json`.

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/dwebx-json.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/dwebx-json
[travis-image]: https://img.shields.io/travis/datproject/dwebx-json.svg?style=flat-square
[travis-url]: https://travis-ci.org/datproject/dwebx-json
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
