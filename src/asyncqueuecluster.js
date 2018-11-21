'use strict'

const Async = require('async')
const Cluster = require('cluster')
const Event = require('events')

function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}

class Point {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    this.r = 0.0
  }

  static compute () {
    var ix = (1e6 + (Math.random() * 1e6))

    var result = undefined

    for (var i = 0; i < ix; ++i) {
      result = (Math.sin(i) + Math.cos(i))
    }

    return (result)
  }
}

const nw = 4
const np = 24

const worker = new Array(nw)
const emitter = new Event()

const points = new Array(np)

for (let i = 0; i < np; ++i) {
  points[i] = new Point(Math.random(), Math.random(), Math.random())
}

function workercompute (j, callback) {
  var k = 0

  while (worker[k].status) {
    ++k
  }

  worker[k].status = true

  console.log('Send:', { 'w': k, 'j': j, 'obj': points[j] })

  worker[k].send({ 'w': k, 'j': j, 'cmd': 'compute', 'obj': points[j] })

  let promise = new Promise((resolve, reject) => {
    console.log('Emitter.once', k.toString())

    emitter.once(j.toString(), (msg) => {
      console.log('Message received:', msg.w, msg.j, msg.obj, msg.rst)

      worker[msg.w].status = false

      points[msg.j].r = msg.rst

      resolve(msg.rst)

      callback()
    })
  })

  return (promise)
}

if (Cluster.isMaster) {
  var i = undefined
  var j = undefined
  var result = undefined

  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork()

    worker[i].status = false

    worker[i].on('message', (msg) => {
      console.log('Emit:', msg.j.toString(), msg)

      emitter.emit(msg.j.toString(), msg)
    })
  }

  var q = Async.queue(workercompute, nw)

  q.drain = function () {
    console.log('All items have been processed.')

    for (i = 0; i < nw; ++i) {
      worker[i].disconnect()
    }

    for (i = 0; i < np; ++i) {
      console.log(points[i])
    }
  }

  for (i = 0; i < np; ++i) {
    console.log('i=', i)

    q.push(i, (err) => {
      if (err) { console.log('Error:', err) } else { console.log('Done.') }
    })
  }

  Cluster.on('disconnect', disconnect)
} else if (Cluster.isWorker) {
  process.on('message', (msg) => {
    switch (msg.cmd) {
      case ('compute'):

        var result = Point.compute()

        break
    }

    process.send({ 'w': msg.w, 'j': msg.j, 'cmd': msg.cmd, 'obj': msg.obj, 'rst': result })
  })
}
