
const cluster = require( 'cluster' ) ;
const sleep   = require( '/usr/share/node/head/lib/node_modules/sleep' );


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
    sleep.msleep( Math.floor( 1000 * Math.random() ) + 1 ) ;
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
  let ic =   16 ;
  let iw = undefined ;
  let ip =    4 ;

  let j  = undefined ;

	 
  let promisepool = new Array( ip ) ;

  let dm          = new Data( undefined , undefined , undefined , undefined ) ;


  for( i = 0; i < ip; ++i )  cluster.fork() ;


  function sendData( i , iw )
   {

    dm.id = i ;

    dm.a  = ( i + 1 ) ;
    dm.b  = ( i + 2 ) ;
    dm.c  = ( i + 3 ) ;

    cluster.workers[iw].send( dm ) ;

    console.log( 'i=' , i , 'iw=' , iw ) ;

   } ;


  function receiveData( i , iw )
   {

    var p = new Promise( (resolve,reject) => {

      cluster.workers[iw].on( 'message' , (msg) => {

        console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) ;

        if( msg.id == i )  resolve( msg.r ) ;
      
       } ) ;

     } ) ;

    return( p ) ;

   } ;


  for( i = 0; i < ic; i += ip )
   {

    for( j = 0 , iw = 1; j < ip; ++j , ++iw )
     {

      sendData( i+j , iw ) ;

      promisepool[j] = receiveData( i+j , iw ) ;
    
     } ;
     
    Promise.all( promisepool ).then( (v) => { console.log( v ) } ) ;

   } ;


// Promise.all( promisepool ).then( (v) => { console.log( v ) } ) ;


  for( i=1; (i <= ip); ++i )  cluster.workers[i].disconnect() ;


 }


else if ( cluster.isWorker )
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

  process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

// process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

 } ;

