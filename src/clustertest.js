
const EventEmitter = require( 'events' ) ;
const Cluster      = require( 'cluster' ) ;
const Systemsleep  = require( '/usr/share/node/head/lib/node_modules/system-sleep' ) 


if( Cluster.isMaster )
 {

  let   i   = undefined ;
  const ip  =     4 ;

  let   j   = undefined ;
  const jc  =  1024 ;


  let   k  = undefined ;
  const kc =      4 ;


  const workerpool  = new Array( ip ) ;
  
  const emitterpool = new Array( ip ) ;

  const resultpool  = new Array( jc ) ;


  for( i = 0; i < ip; ++i )
   {
	 
     emitterpool[i] = new EventEmitter() ;

     emitterpool[i].on( ('send' + i.toString()) , ( j ) => {

       workerpool[i].send( { 'i': i ,  'j': j } ) ;
     
      } ) ;

     emitterpool[i].on( 'error' , (err) => { console.log( err ); } ) ;

   } ;


  for( i = 0; i < ip; ++i )
   {

    workerpool[i]  = Cluster.fork() ;

    workerpool[i].on( 'message' , (msg) => {

//    console.log( 'Message:' , msg ) ;

      resultpool[msg.j] = msg.r ;

      i = ( ++i % ip ) ;

      if( ++j < jc )
	    
        emitterpool[i].emit( ('send' + i.toString()) , j ) ;

      else

	console.log( resultpool ) ;

     } ) ;

   } ;


  for( k = 0; k < kc; ++k )
   {

    i = j = 0 ;

    emitterpool[i].emit( ('send' + i.toString()) , j ) ;

   } ;

  Systemsleep( 1000 ) ;

  for( i = 0; i < ip; ++i )  workerpool[i].disconnect() ;


 }

else if( Cluster.isWorker )
 {

  process.on( 'message'    , (msg) => { 

    var ix     = ( Math.random() * 1e3 ) ;
    var result = undefined;

    for( var i = 0; i < ix; ++i )  result = ( Math.sin( i ) + Math.cos( i ) ) ;

//  if( Math.random() > 1.00 )  result = undefined ;

//  console.log( 'Message from worker:' , result );

    process.send( { 'i': msg.i , 'j': msg.j , 'r': result } );

   } );

  process.on( 'disconnect' , () => { console.log( 'worker #' , Cluster.worker.id , ' disconnected.' ); } );

 }

