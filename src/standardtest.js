
const Cluster = require('cluster')

function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}

var i = undefined
var j = undefined
const nw = 4

const worker = new Array(nw)

if (Cluster.isMaster) {
  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()
    worker[i].status = false
  }

  for (j = 0; j < 100; ++j) {
    worker[j%3].status = true

    for (i = 0; i < nw; ++i) {
      if (worker[i].status) { worker[i].send('Message ' + i) }
    }

    worker[j%3].status = false
  }

  for (i = 0; i < nw; ++i) worker[i].disconnect()

  Cluster.on('disconnect', disconnect)
} else if (Cluster.isWorker) {
  process.on('message', (msg) => {
    console.log(msg)
    process.send(msg)
  })
}
