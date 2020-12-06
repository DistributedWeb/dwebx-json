var fs = require('fs')
var path = require('path')
var test = require('tape')
var ddrive = require('ddrive')
var ram = require('random-access-memory')
var datJSON = require('..')

test('Default dwebx.json', function (t) {
  var archive = ddrive(ram)
  archive.ready(function () {
    var dwebxjson = datJSON(archive)
    dwebxjson.read(function (err) {
      t.ok(err, 'error read before write')
      dwebxjson.create({ name: 'test' }, function (err) {
        t.error(err, 'no error')

        dwebxjson.read(function (err, data) {
          t.error(err, 'no error')
          t.ok(data, 'has metadata')
          t.same(data.url, `dwebx://${archive.key.toString('hex')}`)
          t.same(data.name, 'test', 'has name value')
          t.end()
        })
      })
    })
  })
})

test('Write dwebx.json to archive', function (t) {
  var archive = ddrive(ram)
  archive.ready(function () {
    var dwebxjson = datJSON(archive)
    dwebxjson.create(function (err) {
      t.error(err, 'no error')
      dwebxjson.write({ specialVal: 'cat' }, check)

      function check (err) {
        t.error(err, 'no error')
        dwebxjson.read(function (err, data) {
          t.error(err, 'no error')
          t.ok(data, 'has metadata')
          t.same(data.url, `dwebx://${archive.key.toString('hex')}`, 'url ok')
          t.same(data.specialVal, 'cat', 'has special value')
          t.end()
        })
      }
    })
  })
})

test('.create with no writable archive errors', function (t) {
  var archive = { writable: false }
  var dwebxjson = datJSON(archive)
  var async = false
  dwebxjson.create(function (err) {
    t.is(err.message, 'Archive not writable', 'should error')
    t.is(async, true, 'callback is asyncronous')
    t.end()
  })
  async = true
})

test('.write with key/value and no writable archive errors', function (t) {
  var archive = { writable: false }
  var dwebxjson = datJSON(archive)
  var async = false
  dwebxjson.write('key', 'value', function (err) {
    t.is(err.message, 'Archive not writable', 'should error')
    t.is(async, true, 'callback is asyncronous')
    t.end()
  })
  async = true
})

test('.write with data object and no writable archive errors', function (t) {
  var archive = { writable: false }
  var dwebxjson = datJSON(archive)
  var async = false
  dwebxjson.write({ specialVal: 'cat' }, function (err) {
    t.is(err.message, 'Archive not writable', 'should error')
    t.is(async, true, 'callback is asyncronous')
    t.end()
  })
  async = true
})

test('Write dwebx.json to file and archive', function (t) {
  var archive = ddrive(ram)
  var file = path.join(__dirname, 'dwebx.json')
  archive.ready(function () {
    var dwebxjson = datJSON(archive, { file: file })
    dwebxjson.create(function (err) {
      t.error(err, 'no error')
      dwebxjson.write({ specialVal: 'cat' }, checkFile)

      function checkFile (err) {
        t.error(err, 'no error')
        fs.readFile(file, 'utf-8', function (err, data) {
          data = JSON.parse(data)
          t.error(err, 'fs no error')
          t.ok(data, 'fs has metadata')
          t.same(data.url, `dwebx://${archive.key.toString('hex')}`, 'fs url ok')
          t.same(data.specialVal, 'cat', 'fs has special value')
          fs.unlinkSync(file)
          checkRead()
        })
      }

      function checkRead (err) {
        t.error(err, 'no error')
        dwebxjson.read(function (err, data) {
          t.error(err, 'no error')
          t.ok(data, 'has metadata')
          t.same(data.url, `dwebx://${archive.key.toString('hex')}`, 'url ok')
          t.same(data.specialVal, 'cat', 'has special value')
          t.end()
        })
      }
    })
  })
})
