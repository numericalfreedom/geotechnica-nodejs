

const cluster = require( 'cluster' ) ;


class Data
 {

  constructor( id , a , b , c )
   {
    this.id = id ;
    this.a = a ;
    this.b = b ;
    this.c = c ;
   }

 }


if (cluster.isMaster)
 {

  const worker1 = cluster.fork() ;
  const worker2 = cluster.fork() ;

  let dm1 = new Data( undefined , 1 , 2 , 3 ) ;
  let dm2 = new Data( undefined , 4 , 5 , 6 ) ;

// worker.on( 'message' ,  (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) } ) ;

  worker1.on( 'message' , (msg) => { console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c ) } ) ;
  worker2.on( 'message' , (msg) => { console.log( "Message from worker:" , msg.id , msg.a , msg.b , msg.c ) } ) ;

// worker.send( [ [ 1 , 2 , 3 ] , [ 4 , 5 , 6 ] ]  ) ;

  worker1.send( dm1 ) ;
  worker2.send( dm2 ) ;

//  console.log( cluster ) ;

  worker1.disconnect() ;
  worker2.disconnect() ;

 }

else if (cluster.isWorker)
 {

  let dw = new Data( cluster.worker.id , 3 , 2 , 1 ) ;

//  process.on( 'message' , (msg) => { console.log( msg ); } );

//  process.on( 'message' , (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) ;
  
  process.on( 'message' , (msg) => { console.log( "Message from master:" , msg.id , msg.a , msg.b , msg.c ) } ) ;

//  process.send( [ [ 2 , 3 , 4 ] , [ 5 , 6 , 7 ] ] ) ;  } ) ;


  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ) ; } ) ;

  process.send( dw ) ;

//  console.log( cluster ) ;

 }

