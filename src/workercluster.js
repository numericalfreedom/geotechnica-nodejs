
const Cluster = require('cluster')
const Event   = require('events')

var i = undefined
var j = undefined
var k = undefined
var n = undefined

const nw = 4
const np = 4

const emitter = new Event()
const worker = new Array(nw)
const promise = new Array(nw)

class Point {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

const points = new Array(np)

for (i = 0; i < np; ++i) {
  points[i] = new Point(Math.random(), Math.random(), Math.random())
}

function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}


async function thread (i) {
  let threadpromise = new Promise ((resolve, reject) => {
    let jx = (1e6 + Math.random() * 1e6)
    for (var j = 0; j < jx; ++j) {
      let k = (Math.sin(j) + Math.cos(j))
    }
    resolve (true)
  })
  let result = await threadpromise
  return (result)
}


if (Cluster.isMaster) {
  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()
  }

  for (i = 0; i < nw; ++i) {
    promise[i] = thread(i)
  }

  console.log (promise)

  Promise.all (promise).then( console.log('Finished.') )

  for (i = 0; i < nw; ++i) {
    worker[i].disconnect()
  }

  Cluster.on('disconnect', disconnect)
} else if (Cluster.isWorker) {
  var ix = (1e1 + Math.random() * 1e1)
  var result = undefined
  for (var i = 0; i < ix; ++i) {
    result = (Math.sin(i) + Math.cos(i))
  }
  process.on('message', (msg) => {
    process.send({ 'id': Cluster.worker.id, 'obj': msg })
  })
}
