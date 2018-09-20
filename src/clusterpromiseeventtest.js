
const events  = require( 'events' ) ;
const cluster = require( 'cluster' )


if( cluster.isMaster )
 {

  let   i  = undefined ;
  const ip = 16 ;

  let   j  = undefined ;
  const jc = 10 ;	 

 
  const e = new events() ;


  pool = new Array( 2 ) ;

  workerpool  = new Array( ip ) ;

  promisepool = new Array( ip ) ;

  pool[0] = workerpool ;

  pool[1] = promisepool ;


  for( i = 0; i < ip; ++i )

    pool[0][i] = cluster.fork() ;

	 
  for( i = 0; i < ip; ++i )

    pool[0][i].on( 'message' , (msg) => { console.log( msg ); e.emit( ('emit' + msg.id.toString()) , msg.r ); console.log( ('emit' + msg.id.toString()) , msg.r )  } ) ;


    for( i = 0; i < ip; ++i )

      pool[1][i] = new Promise( (resolve,reject) => {

        e.once( ('emit' + i.toString()) , (msg) => { if( msg != undefined ) resolve(msg); else reject( 'error' ); } );

       } ) ;

   
    for( i = 0; i < ip; ++i )  pool[0][i].send( { 'id': i } ) ;


    Promise.all( pool[1] ).then( (value) => {

      console.log( value );
      console.log( ' Result: ' , pool[1] );

     } ).catch( (err) => {
	     
      console.log( 'Error:' , err );
     
     } ) ;


  for( i = 0; i < ip; ++i )  pool[0][i].disconnect() ;


 }

else if( cluster.isWorker )
 {

  process.on( 'message'    , (msg) => { 

    var ix     = ( Math.random() * 1e2 ) ;
    var result = undefined;

    for( var i = 0; i < ix; ++i )  result = ( Math.sin( i ) + Math.cos( i ) ) ;

    if( Math.random() > 1.00 )  result = undefined ;

    console.log( 'Message from worker:' , result );

    process.send( { 'id': msg.id , 'r': result } );

   } );

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ); } );

 }

