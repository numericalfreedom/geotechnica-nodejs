
const Async = require('async')


var proxies = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16 }


async function process () {
  var promise = new Promise((resolve, reject) => {
    var timeout = (5000 * Math.random())
    setTimeout(() => {
      console.log('timeout=', timeout)
      resolve(timeout)
    }, timeout)
  })
  await promise
}


function displayitems (item, key, callback) {
// callback()
  process()
  console.log('key : ' + key + '')
  console.log('item : ' + item + '')
  callback()
}


async function asyncdisplayitems (item, key, callback) {
  var promise = new Promise((resolve, reject) => {
    var timeout = (3000 + (500 * Math.random()))
    setTimeout(() => {
      console.log('timeout=', timeout)
      console.log('key : ' + key + '')
      console.log('item : ' + item + '')
      resolve(timeout)
    }, timeout)
  })
  await promise
// callback()
  return (promise)
}


function finalcallback (err) {
  if (err) {
    console.log('error')
  }
  console.log('all done')
}


Async.eachOfLimit(proxies, 5, asyncdisplayitems, finalcallback)


