

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
  await promise ;
  return( promise ) ;
}


async function displayitems ( item, key , callback ) {
  var promise = new Promise((resolve, reject) => {
    var timeout = (5000 * Math.random())
    setTimeout(() => {
      console.log('timeout=', timeout)
      console.log('key : ' + key + '')
      console.log('item : ' + item + '')
      resolve(timeout)
//    callback() ;
    } , timeout) ;
  })
  await promise ;
  return( promise ) ;
}


function queuedisplayitems (item, callback) {
    var timeout = (3000 + (500 * Math.random()))
    setTimeout(() => {
      console.log('timeout=', timeout)
      console.log('item : ' + item + '')
      callback()
    }, timeout)
}


function promisedisplayitems (item, callback) {
console.log(callback)
  var promise = new Promise((resolve, reject) => {
    var timeout = (3000 + (500 * Math.random()))
    setTimeout(() => {
      console.log('timeout=', timeout)
      console.log('item : ' + item + '')
      resolve(timeout)
      callback()
    }, timeout)
  })
  return (promise)
}


async function asyncdisplayitems (data , callback) {
//console.log(callback)
  var promise = new Promise((resolve, reject) => {
    var timeout = (3000 + (500 * Math.random()))
    setTimeout(() => {
      console.log( 'timeout=', timeout)
      console.log( 'key : ' + data.key + '' )
      console.log( 'item : ' + data.item + '' )
      resolve( timeout )
    }, timeout )
  })
  await promise
  return (promise)
}


function finalcallback (err , result) {
  if (err) {
    console.log('error')
  }
  console.log( 'all done' , result )
}


Async.forEachLimit( proxies , 2 , asyncdisplayitems , finalcallback )

// Async.eachOf(proxies, asyncdisplayitems, finalcallback)

// Async.eachOfSeries(proxies, asyncdisplayitems, finalcallback)

// Async.eachOfLimit(proxies, 3, asyncdisplayitems, finalcallback)


// var q = Async.queue(queuedisplayitems, 3)


var q = Async.queue( asyncdisplayitems, 3 )

q.drain( function() { console.log( 'All items have been processed.' ) ; } ) ;


let i = undefined

// for( i = 0; i<10; ++i ) {

//  q.push( i , function( err ) { console.log( 'A done' ) } )

// }


// for( i = 0; i<10; ++i ) {

//  q.push( { "key": i , "item": (i+1) } , function( err ) { console.log( 'A done' ) } )

// }


