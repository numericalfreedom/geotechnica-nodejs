
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


const nw = 4
const np = 8 

const worker  = new Array(nw)
const emitter = new Event()


const points  = new Array(np)

for (i = 0; i < np; ++i) {
  points[i] = new Point(Math.random(), Math.random(), Math.random())
}


function workercompute (i,callback) {

  var k = undefined

  for( k = 0; ((k < nw) && worker[k].status); ++k ); 

  worker[k].send( {'id': i , 'obj': points[i] } )

  console.log( 'Send:', i, points[i] )

  let promise = new Promise ((resolve, reject) => {

    console.log ( 'Emitter.once' , i.toString())

    emitter.once (msg.id.toString(), (msg) => {
	    
      console.log ('Message received:', msg.id, msg.obj, msg.rst)

      resolve (msg.rst)

      callback()

    })
	  
  })


  return (promise)

}


if (Cluster.isMaster) {


  var i = undefined


  for (i = 0; i < nw; ++i) {

    worker[i] = Cluster.fork()

    worker[i].status = false

    worker[i].on ('message', (msg) => {

      console.log ( 'Emit:', msg.id.toString(), msg)

      emitter.emit (msg.id.toString(), msg)

    })

  }


  var q = Async.queue(workercompute, nw)

  q.drain = () => { console.log( 'Alli items have been processed.' ) }


  for( i = 0; i<np; ++i ) {

    q.push( i , (err) => { console.log( 'A done' ) } )

  }


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
