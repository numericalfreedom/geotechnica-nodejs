
const Cluster = require('cluster')

function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}

if (Cluster.isMaster) {
  const worker1 = Cluster.fork()
  const worker2 = Cluster.fork()
  const worker3 = Cluster.fork()
  const worker4 = Cluster.fork()

  worker2.status = 'ready.'

  console.log(worker2)

  if (worker2.status === 'ready.') {
    worker2.send('Worker ready.')
  }

  worker2.status = 'running.'

  if (worker2.status === 'running.') {
    worker2.send('Worker running.')
  }

  console.log(worker2)

  worker2.status = 'ready.'

  if (worker2.status === 'ready.') {
    worker2.send('Worker ready.')
  }

  console.log(worker2)

  var a = (Math.sin(2.0) + Math.exp(3) + Math.log(3))

  worker1.disconnect()
  worker2.disconnect()
  worker3.disconnect()
  worker4.disconnect()

  Cluster.on('disconnect', disconnect)
} else if (Cluster.isWorker) {
  process.on('message', (msg) => {
    console.log(msg)
    process.send(msg)
  })
}
