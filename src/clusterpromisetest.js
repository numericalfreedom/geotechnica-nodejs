
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
  let ic = 16 ;
  let iw = undefined ;
  let ip =  4 ;


  let promisepool = new Array( ic ) ;

  let dm          = new Data( undefined , undefined , undefined , undefined ) ;


  for( i = 0; i < ip; ++i )  cluster.fork() ;


  function sendData( i , iw )
   {

    dm.id = i ;

    dm.a  = ( i + 1 ) ;
    dm.b  = ( i + 2 ) ;
    dm.c  = ( i + 3 ) ;

    cluster.workers[iw].send( dm ) ;

   } ;


  function receiveData( i , iw )
   {

    var p = new Promise( (resolve,reject) => {

      cluster.workers[iw].on( 'message' , (msg) => {

	if( msg.id == i )
	 {

          console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) ;

	  resolve( msg.r ) ;

         } ;
      
       } ) ;

     } ) ;

//  cluster.workers[iw].removeListener( 'message' ) ;

    return( p ) ;

   } ;


  for( i = 0 , iw = 1; i < ic; ++i , iw %= ip , ++iw )
   {

    console.log( 'i=' , i , 'iw=' , iw ) ;

    sendData( i , iw ) ;

    promisepool[i] = receiveData( i , iw ) ;

   } ;


  Promise.all( promisepool ).then( (v) => { console.log( v ) } ) ;


  for( i=1; (i <= ip); ++i )  cluster.workers[i].disconnect() ;


 }


else if ( cluster.isWorker )
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

  process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

 } ;

