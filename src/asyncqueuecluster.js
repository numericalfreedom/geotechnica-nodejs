'use strict';

const Async = require('async');
const Cluster = require('cluster');
const Event = require('events');



function draincallback()
 {

  console.log('All items have been processed.');

  for (i = 0; i < nw; ++i)  worker[i].disconnect();

 }



function pushcallback( err )
 {

  if (err)  console.log('Error:', err);

  else  console.log('Done.');

 }



function disconnectcallback(worker)
 {

  console.log(`Worker #${worker.id} has disconnected.`) ;

 }


class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = 0.0;
  }

  static compute() {
    const ix = (1e6 + (Math.random() * 1e6));

    let result = undefined;

    for (let i = 0; i < ix; ++i) {
      result = (Math.sin(i) + Math.cos(i));
    }

    return (result);
  }


  static solve() {
    const promise = new Promise((resolve, reject) => {
      emitter.on('exit', (msg) => {
        console.log( 'Emitter message:', msg );
        resolve();
      });
    });

    return (promise);
  }

}


const nw = 10;
const np = 20;

const emitter = new Event();
const worker  = new Array(nw);
const points  = new Array(np);


for (let i = 0; i < np; ++i) 
 {

  points[i] = new Point(Math.random(), Math.random(), Math.random()) ;

 }


function workercompute(j, callback) {

  let k = 0;

  while (worker[k].status)
   {
    ++k;
   }

  worker[k].status = true;

  console.log( 'Send:' , {'w': k, 'j': j, 'obj': points[j]} );

  worker[k].send( {'w': k, 'j': j, 'cmd': 'compute', 'obj': points[j]} );

  const promise = new Promise((resolve, reject) => {
    console.log('Emitter.once', k.toString());

    emitter.once(j.toString(), (msg) => {
      console.log('Message received:', msg.w, msg.j, msg.obj, msg.rst);

      worker[msg.w].status = false;

      points[msg.j].r = msg.rst;

      resolve(msg.rst);

      callback();
    });
  });

  return (promise);
}


if (Cluster.isMaster) {
  let i = undefined;
  const j = undefined;
  const result = undefined;

  for (i = 0; i < nw; ++i) {
    worker[i] = Cluster.fork();

    worker[i].status = false;

    worker[i].on('message', (msg) => {
      console.log('Emit:', msg.j.toString(), msg);

      emitter.emit(msg.j.toString(), msg);
    });
  }


  const q = Async.queue( workercompute , nw ) ;


  function draincallback()
   {

    console.log('All items have been processed.');

    for (i = 0; i < nw; ++i)  worker[i].disconnect();

   }


  function pushcallback( err )
   {

    if (err)
	   
     console.log('Error:', err);
      
    else
     
     console.log('Done.');

   }



  q.drain( draincallback ) ;


  for (i = 0; i < np; ++i)
   {

    console.log( 'i=' , i );

    q.push( i , pushcallback );

   }


  Cluster.on( 'disconnect' , disconnectcallback );


} else if (Cluster.isWorker) {
  process.on('message', (msg) => {
    switch (msg.cmd) {
      case ('compute'):

        var result = Point.compute();

        break;
    }

    process.send({'w': msg.w, 'j': msg.j, 'cmd': msg.cmd, 'obj': msg.obj, 'rst': result});
  });
}
