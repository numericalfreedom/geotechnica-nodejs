
const Async   = require('async')
const Cluster = require('cluster')
const Event   = require('events')

function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}

class Point {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

var i = undefined
var j = undefined
var k = 0

const nw = 4
const np = 8 

const worker = new Array(nw)
const emitter = new Event()

const points = new Array(np)

for (i = 0; i < np; ++i) {
  points[i] = new Point(Math.random(), Math.random(), Math.random())
}


// console.log (points)


function workercompute (obj,i,callback) {

  worker[k = (++k % nw)].send(obj)

  console.log('Send:', k, obj, i)

  let promise = new Promise ((resolve, reject) => {
    console.log ( 'Emitter.once' , k.toString())
    emitter.once (('result' + k.toString()), (msg) => {
//    if (msg !== null) {
//      worker[k].status = false
        console.log ('Message received:', msg.id, msg.obj, msg.rst)
        resolve (msg.rst)
//      callback ()
//    } else {
//      reject('error')
//    }
    })
  })

//  await promise

//  console.log (promise)

  return (promise)

}


function writeresult (err,result) {
  console.log (result)
}


async function compute (obj,i,callback) {
  let result = await workercompute (obj,i)
  callback (result)
}


if (Cluster.isMaster) {
  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()
    worker[i].status = false
    worker[i].on ('message', (msg) => {
      console.log ( 'Emit:' , 'result' + msg.id.toString(), msg)
      emitter.emit (('result' + msg.id.toString()), msg)
    })
  }

//  Async.eachOfLimit (points, 2, compute, (err,msg) => { console.log (points); console.log('Promises resolved.') })

  Async.eachOf (points, compute, (err,msg) => { console.log (points); console.log('Promises resolved.') })

// setTimeout( () => {} , 5000 )


  for (i = 0; i < nw; ++i) {
    worker[i].disconnect()
  }

  Cluster.on('disconnect', disconnect)


} else if (Cluster.isWorker) {

  process.on ('message', (msg) => {

    var ix = (1e7 + (Math.random() * 1e7))

    var result = undefined

    for (var i = 0; i < ix; ++i) {

      result = (Math.sin(i) + Math.cos(i))

    }

   process.send ({ 'id': Cluster.worker.id, 'obj': msg, 'rst': result })
	  
  })

}
