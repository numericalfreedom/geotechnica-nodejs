
const EventEmitter = require( 'events' ) ;
const Cluster      = require( 'cluster' ) ;
const Async        = require( '/usr/share/node/head/lib/node_modules/async' ) ;

const emitter      = new EventEmitter() ;


function disconnect (worker) {
  console.log(`Worker #${worker.id} has disconnected.`)
}


function sleep(millis)
 {
  return new Promise( resolve => setTimeout(resolve, millis) );
 }


if( Cluster.isMaster )
 {
 
  var i   = undefined ;
  var j   = undefined ;
  var k   = undefined ;
  var msg = undefined ;

  d = [ 0 , 1 , 2 , 3 ] ;
  v = new Array( 10 ) ;

  const worker  = Cluster.fork() ;

  worker.on( 'message' , (msg) => {

//  console.log( 'msg=' , msg ) ;

    emitter.emit( ('result' + msg.i.toString()) , msg ) ;

   } ) ;


  async function compute( i )
   {

    worker.send( { 'i': i } ) ;

//  console.log( 'i=' , i ) ;

    let result  = undefined ;

    let promise = new Promise( (resolve,reject) => {
	      
      emitter.once( ('result'+i.toString()) , (msg) => {

        if( msg != undefined )
         {

//        console.log( 'i=' , msg.i , msg ) ;

          v[msg.i] = msg.r ;

          resolve( result = msg.r );

//        console.log( v ) ;

         }
  
        else reject( 'error' ) ;
	
       } ) ;

     } ) ;

    console.log( 'promise=' , promise ) ;

    await promise ;

    console.log( 'promise=' , promise ) ;

    console.log( i , v[i] )

    return( result ) ;
 
   } ;


//  for( i = 0; i < 10; ++i )

//   for( j = 0; j < 10; ++j )

//     v[j] = compute(j).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;

	 
//  compute(4).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(5).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(6).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;

//  compute(7).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(8).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(9).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;

//  compute(6).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(7).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(8).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;
//  compute(9).then( (r) => { console.log( r ); } ).catch( (err) => { console.log( err ) } ) ;


//  for( i = 0; i < 10; ++i , sleep( 1 ) )

//    Async.map( [i] , compute , (err,r) => { console.log( r , v ); } ) ;


  for( j = 0; j < 1; ++j )

    for( i = 0; i < 20; ++i )
     {

      compute( i ) ;

     } ;


//  console.log( v ) ;


  worker.disconnect () ;

  Cluster.on ('disconnect', disconnect)

 }

else if( Cluster.isWorker )
 {

  process.on( 'message' , (msg) => {

    var ix     = ( 1e6 + Math.random() * 1e7 ) ;

    var result = undefined;

    for( var i = 0; i < ix; ++i )  result = ( Math.sin( i ) + Math.cos( i ) ) ;

    msg.r = result ;

//  console.log( msg.i , msg.r ) ;

    process.send( msg ) ;
  
   } ) ;

 } ;

