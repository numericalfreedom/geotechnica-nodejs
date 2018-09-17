/*

https://stackoverflow.com/questions/41423905/wait-for-several-web-workers-to-finish

*/


/*

When the last piece of data is received, call your compute-the-final-solution function:

var data = [];

function createWorker(i) {
    var v = new Worker('js/worker.js');
    v.postMessage(i);
    v.onmessage = function(event){
        data.push(event.data);
        if (data.length === 100) {               // <====
            computeFinalSolution();              // <====
        }                                        // <====
    };
}

for(var i = 0; i < 100; i++) {
    createWorker(i);

}

*/


/*

Obviously, parameterize that as you consider necessary, but createWorker isn't currently parameterized other than i, so...

Note that the entries in data may not be in order. The worker for i == 0 might not complete until after the worker for i == 1, just because of the vagaries of thread scheduling or if the work requires more processing. If you need them in order, it's easily done, but we have to add a counter (or loop through data on each completion to check):

var data = [];
var dataReceived = 0;

function createWorker(i) {
    var v = new Worker('js/worker.js');
    v.postMessage(i);
    v.onmessage = function(event){
        data[i] = event.data;                    // <====
        if (++dataReceived === 100) {            // <====
            computeFinalSolution();              // <====
        }                                        // <====
    };
}

for(var i = 0; i < 100; i++) {
    createWorker(i);
}

*/


/*

If you want a more modern, flexible approach, consider using promises, which are native to JavaScript as of ES2015 (aka ES6) and can be polyfilled for use on older JavaScript engines:

function createWorker(i) {
    return new Promise(function(resolve, reject) {
        var v = new Worker('js/worker.js');
        v.postMessage(i);
        v.onmessage = function(event){
            // If you report errors via messages, you'd have a branch here for checking
            // for an error and either calling `reject` or `resolve` as appropriate.
            resolve(event.data);
        };
        // EITHER:
        v.onerror = reject; // Rejects the promise if an error is raised by the web worker, passing along the ErrorEvent
        // OR:
        v.onerror = function(event) {
            // Rejects the promise using the error associated with the ErrorEvent
            reject(event.error);
        };
    });
}

var promises = [];
for(var i = 0; i < 100; i++) {
    promises.push(createWorker(i));
}
Promise.all(promises)
    .then(function(data) {
        // `data` has the results, compute the final solution
    })
    .catch(function(error) {
        // something went wrong
    });

*/


/*

You could promisify the workers and then use Promise.all:

Promise.all(Array.from(Array(100), (x, i) => i).map(i =>
  new Promise((resolve, reject) => {
    const worker = new Worker('js/worker.js');
    worker.postMessage(i);
    worker.addEventListener('message', event => resolve(event.data));
    worker.addEventListener('error', reject);
  }))
  .then(results => ...);

*/


const cluster      = require( 'cluster' ) ;
const EventEmitter = require( 'events' ) ;
const sleep        = require( '/usr/share/node/head/lib/node_modules/sleep' );
const systemsleep  = require( '/usr/share/node/head/lib/node_modules/system-sleep' );


var v  = new Array( 32 ) ;
var iv = 0 ;


function vector( msg )
 {

  console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) ;
  v[msg.id] = msg.r ;

  ++iv ;

 } ;


class Data
 {

  constructor( id , a , b , c )
   {
    this.id  = id ;
    this.a   = a ;
    this.b   = b ;
    this.c   = c ;
    this.r   = undefined ;
   } ;

  run()
   {
    this.r = ( this.a * this.b * this.c ) ;
   } ;

  static run( a , b , c )
   {
    sleep.msleep( Math.floor( 10 * Math.random() ) + 1 ) ;
    return( a + b + c ) ;
   } ;

  static response( msg )
   {

    console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) ;

   } ;

 } ;


if( cluster.isMaster )
 {

  let i  = undefined ;
  let ic = 32 ;
  let iw = undefined ;

  const ee = new EventEmitter() ;
  const pm = new Promise( (resolve , reject) => {} ) ;


  ee.on( 'wait' , () => { console.log( v ); } ) ;


  const workerpool = new Array( 4 ) ;

  let dm = new Data( undefined , undefined , undefined , undefined ) ;


  for( i = 0; i < workerpool.length; ++i )
   {

    workerpool[i]    = new Array( 2 ) ;

    workerpool[i][0] = cluster.fork() ;
    workerpool[i][1] = false ;

   } ;


  for( i = iv = 0; i < workerpool.length; ++i )
   {

    workerpool[i][0].on( 'message' , vector ) ;

   } ;


  for( i = iw = 0; i < ic; iw = ++i % workerpool.length )
   {

    dm.id = i ;

    dm.a  = ( i + 1 ) ;
    dm.b  = ( i + 2 ) ;
    dm.c  = ( i + 3 ) ;

    workerpool[iw][0].send( dm ) ;

   } ; // end if()


//  ee.emit( 'wait' ) ;


    setTimeout( () => { console.log( v ) ; } , 1000 ) ;


//  console.log( v ) ;


//  while( iv < 16 )  console.log( iv );


  for( i = 0; i < workerpool.length; ++i )
  
    workerpool[i][0].disconnect() ;

 }


else if ( cluster.isWorker )
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

  process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

 } ;

