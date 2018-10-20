
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
const np = 4

const worker = new Array(nw)
const emitter = new Event()

const points = new Array(np)

for (i = 0; i < np; ++i) {
  points[i] = new Point(Math.random(), Math.random(), Math.random())
}


function workercompute (obj) {

  worker[k = (++k % nw)].send(obj)

  console.log('Send:', k, obj)

  let promise = new Promise((resolve, reject) => {
    emitter.once(('result' + k.toString()), (msg) => {
//    if (msg !== null) {
//      worker[k].status = false
//      console.log('receive:', msg.id, msg.obj)
        resolve(msg.obj)
//    } else {
//      reject('error')
//    }
    })
  })

  console.log (promise)

  return (promise)
}


function writeresult (err,result) {
  console.log (result)
}


async function compute (obj,callback) {
  let result = await workercompute (obj)
  callback()
}


if (Cluster.isMaster) {
  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()
    worker[i].status = false
    worker[i].on ('message', (msg) => {
      emitter.emit (('result' + i.toString()), msg)
    })
  }

  Async.everyLimit (points, 4, compute, (err,msg) => { console.log(msg) })

  for (i = 0; i < nw; ++i) {
    worker[i].disconnect()
  }

  Cluster.on('disconnect', disconnect)
} else if (Cluster.isWorker) {
//  var ix = (1e1 + Math.random() * 1e1)
//  var result = undefined

//  for (var i = 0; i < ix; ++i) {
//    result = (Math.sin(i) + Math.cos(i))
//  }

  process.on ('message', (msg) => {
    process.send ({ 'id': Cluster.worker.id, 'obj': msg })
  })
}
