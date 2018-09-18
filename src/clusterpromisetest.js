
const cluster = require( 'cluster' ) ;
const sleep   = require( '/usr/share/node/head/lib/node_modules/sleep' );


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


  let dm = new Data( undefined , undefined , undefined , undefined ) ;


  const workerpool = new Array( 4 ) ;


  for( i = 0; i < workerpool.length; ++i )
   {

    workerpool[i] = cluster.fork() ;

    workerpool[i].on( 'message' , vector ) ;

   } ;


  for( i = iw = 0; i < ic; iw = ++i % workerpool.length )
   {

    dm.id = i ;

    dm.a  = ( i + 1 ) ;
    dm.b  = ( i + 2 ) ;
    dm.c  = ( i + 3 ) ;

    workerpool[iw].send( dm ) ;

   } ; // end if()


  // outputVector() ;

 
  setTimeout( () => { console.log( v ); } , 3000 ) ;


  for( i = 0; i < workerpool.length; ++i )  workerpool[i].disconnect() ;


 }


else if ( cluster.isWorker )
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

  process.on( 'message' , (msg) => { dw.id = msg.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

 } ;

