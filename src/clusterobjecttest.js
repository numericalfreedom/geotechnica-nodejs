
const cluster      = require( 'cluster' ) ;
const sleep        = require( '/usr/share/node/head/lib/node_modules/sleep' );
const EventEmitter = reuqire( 'events' ) ;


let i  = undefined ;
let ic = 16 ;
let iw = undefined ;
let iv = 0 ;

let v  = new Array( ic ) ;


function outputVector()
 {

  if( iv < ic )
   {

    setTimeout( outputVector , 100 );

    return;

   }

  console.log( v ) ;
	 
 } ;


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

	 
  const workerpool = new Array( 4 ) ;


  let dm = new Data( undefined , undefined , undefined , undefined ) ;


  for( i = 0; i < workerpool.length; ++i )
   {

    workerpool[i]    = new Array( 2 ) ;

    workerpool[i][0] = cluster.fork() ;
    workerpool[i][1] = false ;

   } ;


  for( i = 0; i < workerpool.length; ++i )
   {

    // workerpool[i][0].on( 'message' , vector ) ;

    workerpool[i][0].on( 'message' , vector ) ;

   }


  for( i = iw = 0; i < ic; iw = ++i % workerpool.length )
   {

    dm.id = i ;

    dm.a  = ( i + 1 ) ;
    dm.b  = ( i + 2 ) ;
    dm.c  = ( i + 3 ) ;

    workerpool[iw][0].send( dm ) ;

   } ; // end if()


  outputVector() ;


  for( i = 0; i < workerpool.length; ++i )
  
    workerpool[i][0].disconnect() ;

 
 }


else if ( cluster.isWorker )
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

  process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

 } ;

