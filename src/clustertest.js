
const cluster = require( 'cluster' ) ;
const sleep   = require( '/usr/share/node/head/lib/node_modules/sleep' );


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
    sleep.msleep( Math.floor( 2000 * Math.random() ) + 1 ) ;
    return( a * b * c ) ;
   } ;

 }


function run( a , b , c )
 {
  return( a * b * c ) ;
 }


if (cluster.isMaster)
 {

  const workerpool = new Array( 4 ) ;

  let i  = undefined ;
  let ii = undefined ;
  let j  = undefined ;
  let k  = undefined ;

  for( i = 0; i < workerpool.length; ++i )
   {

    workerpool[i]    = new Array( 2 ) ;

    workerpool[i][0] = cluster.fork() ;
    workerpool[i][1] = true ;

   } ;

  for( i = 0; i < workerpool.length; ++i )
   {

    workerpool[i][0].on( 'message' , (msg) => { console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ); workerpool[msg.id-1][1] = true; } ) ;

   }

  let dm = new Data( undefined , undefined , undefined , undefined ) ;

  for( ii = j = 0; j < 16; ++j )
   {

    dm.a = ( j + 1 ) ;
    dm.b = ( j + 2 ) ;
    dm.c = ( j + 3 ) ;

    for( i = 0; ((i < workerpool.length) && workerpool[ii][1]); ii = ++i % workerpool.length )

      if( workerpool[ii][1] )
       {

        workerpool[ii][0].send( dm ) ;

	workerpool[ii][1] = true ;

//	console.log( 'ii=' , ii ) ;

       } ;

     console.log( 'j=' , j ) ;

   } ;


  for( i = 0; i < workerpool.length; ++i )
  
    workerpool[i][0].disconnect() ;


// const worker1 = cluster.fork() ;

// const worker2 = cluster.fork() ;


// let dm1 = new Data( undefined , 1 , 2 , 3 ) ;

// let dm2 = new Data( undefined , 4 , 5 , 6 ) ;


// worker.on( 'message' ,  (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) } ) ;

// worker1.on( 'message' , (msg) => { console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) } ) ;

// worker2.on( 'message' , (msg) => { console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c , msg.r ) } ) ;


// worker.send( [ [ 1 , 2 , 3 ] , [ 4 , 5 , 6 ] ]  ) ;

// worker1.send( { data: dm1 , fct: run } ) ;

// worker2.send( { data: dm2 , fct: run } ) ;


// console.log( cluster ) ;

// worker1.disconnect() ;

// worker2.disconnect() ;

 }

else if (cluster.isWorker)
 {

    let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

//  process.on( 'message' , (msg) => { console.log( msg ); } );

//  process.on( 'message' , (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) ;
  
//  process.on( 'message' , (msg) => { msg.run() , console.log( "Message from master:" , msg.id , msg.a , msg.b , msg.c ) } ) ;

    process.on( 'message' , (msg) => { dw.id = cluster.worker.id; dw.a = msg.a; dw.b = msg.b; dw.c = msg.c; dw.r = Data.run( dw.a , dw.b , dw.c ); process.send( dw ); console.log( "Message from master:" , msg ) } ) ;

//  process.on( 'message' , (msg) => { dw.id = cluster.worker.id; dw.r = run( msg.data.a , msg.data.b , msg.data.c ); dw.a = msg.data.a; dw.b = msg.data.b; dw.c = msg.data.c; process.send( dw ); console.log( "Message from master:" , msg ) } ) ;
  
//  process.on( 'message' , (msg) => { console.log( "Message from master:" , msg ) } ) ;

//  process.send( [ [ 2 , 3 , 4 ] , [ 5 , 6 , 7 ] ] ) ;  } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;


//  process.send( dw ) ;

//  console.log( cluster ) ;

 }

