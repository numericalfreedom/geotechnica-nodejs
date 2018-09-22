
const EventEmitter = require( 'events' ) ;
const Cluster      = require( 'cluster' ) ;
const Async        = require( '/usr/share/node/head/lib/node_modules/async' ) ;

const emitter      = new EventEmitter() ;


function sleep(millis)
 {
  return new Promise( resolve => setTimeout(resolve, millis) );
 }


if( Cluster.isMaster )
 {
 
 
  var i = undefined ;
  var j = undefined ;
  var k = undefined ;

  d = [ 0 , 1 , 2 , 3 ] ;
  v = new Array( 10 ) ;

  const worker  = Cluster.fork() ;

  worker.on( 'message' , (msg) => {

    emitter.emit( 'result' , msg ) ;
    
   } ) ;


  async function compute( i )
   {

    worker.send( { 'i': i } ) ;

    let result  = undefined ;

    let promise = new Promise( (resolve,reject) => {
	      
      emitter.once( 'result' , (msg) => {

        if( msg != undefined )
         {

          v[msg.i] = msg.r ;

          resolve( result = msg.r );

         }
  
        else reject( 'error' ) ;
	
       } ) ;

     } ) ;

    await promise ;

    return( result ) ;
 
   } ;


//  for( i = 0; i < 10; ++i )

//   for( j = 0; j < 10; ++j )

//     v[j] = compute(j).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;

//  compute(1).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(2).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(3).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(4).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;

// for( i = 0; i < 10; ++i , sleep( 1 ) )

//   Async.map( [i] , compute , (err,r) => { console.log( r , v ); } ) ;


  for( i = 0; i < 12; ++i , sleep( 1000 ) )

    compute( i ) , console.log( v ) ;


  worker.disconnect() ;


 }

else if( Cluster.isWorker )
 {

  process.on( 'message' , (msg) => {

    msg.r = Math.random( msg.i ) ;

    process.send( msg ) ;    
  
   } );

 } ;

