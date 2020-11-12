
const async = require('async')
const fs = require('fs')

async.every(['ifx.js', 'ify.js', 'ifz.js'], function (filePath, callback) {
  fs.access(filePath, function (err) {
    console.log ('Callback=', callback)
    callback(null, !err)
  })
}, function (err, result) {
  console.log( err, result )
  // if result is true then every file exists
})

