

const cluster = require( 'cluster' ) ;


if (cluster.isMaster)
 {

  const worker = cluster.fork() ;

  worker.on( 'message' ,  (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) } ) ;

  worker.send( [ [ 1 , 2 , 3 ] , [ 4 , 5 , 6 ] ]  ) ;

  worker.disconnect() ;

 }

else if (cluster.isWorker)
 {

//  process.on( 'message' , (msg) => { console.log( msg ); } );

  process.on( 'message' , (msg) => { console.log( msg[0][1] , msg[1][1] , msg[1][2] ) ; process.send( [ [ 2 , 3 , 4 ] , [ 5 , 6 , 7 ] ] ) ;  } ) ;

  process.on( 'disconnect' , () => { console.log( 'worker disconnected.' ) ; } ) ;

 }

