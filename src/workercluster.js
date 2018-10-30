
const Cluster = require('cluster')
const Event   = require('events')

var i = undefined
var j = undefined
var k = undefined
var n = undefined

const nw = 4
const np = 4

const emitter = new Event()
const worker  = new Array(nw)
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
  worker[i].send ({ 'i': i })
  let result = undefined
  let threadpromise = new Promise ((resolve, reject) => {
    emitter.once (('result' + i.toString()) , (err,res) => { resolve(result = i) })
  })
    console.log ('threadpromise=' , threadpromise)
    await threadpromise
  return (result)
}


if (Cluster.isMaster) {

  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()
  }

  for (i = 0; i < nw; ++i) {
    worker[i].on ('message' , () => {
      emitter.emit (('result' + i.toString()) , null )
    })
  }
	
  for (i = 0; i < nw; ++i) {
    promise[i] = thread(i)
  }


  console.log (emitter)

  console.log (promise)

	
  let finalpromise = Promise.all (promise)
		
  finalpromise.then( () => { console.log ('Finished.' , promise) })

  console.log( finalpromise )


  setTimeout( () => {} , 5000 )


  Cluster.on ('disconnect', disconnect)


  for (i = 0; i < nw; ++i) {
    worker[i].disconnect()
  }

} else if (Cluster.isWorker) {
  process.on('message', (msg) => {
    console.log( msg )
    var jx = (1e7 + Math.random() * 1e7)
    var result = undefined
    for (var j = 0; j < jx; ++j) {
      result = (Math.sin(j) + Math.cos(j))
    }
    process.send({ 'id': Cluster.worker.id, 'obj': msg })
  })
}

