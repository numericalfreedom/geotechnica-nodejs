
const events  = require( 'events' ) ;
const cluster = require( 'cluster' )


if( cluster.isMaster )
 {

  let   i   = undefined ;
  const ip  =   4 ;

  let   j   = undefined ;
  let   jr  = undefined ;
  let   jre = undefined ;
  const jc  =  16 ;


  let   k  = undefined ;
  const kc =    4 ;


  const workerpool  = new Array( ip ) ;
  
  const resultpool  = new Array( jc ) ;


  const e = new events() ;


  e.on( 'result' , () => { jre = jr; if( jre == (jc-1) )  console.log( resultpool ); } ) ;


  for( i = 0; i < ip; ++i )  workerpool[i]  = cluster.fork() ;


  for( i = 0; i < ip; ++i )

    workerpool[i].on( 'message' , (msg) => {

      console.log( 'Message:' , msg ) ;

//    console.log( 'Result: ' , msg.kc , msg.jc , msg.r ) ;

      resultpool[jr = msg.jc] = msg.r ;

     } ) ;


  for( k = 0; k < kc; ++k )
   {
	   
    for( i = j = jre = jr = 0; j < jc; ++j , i = (++i % ip) )
     {
 
      workerpool[i].send( { 'kc': k , 'ip': i , 'jc': j } ) ;

      console.log( 'Send:' , { 'kc': k , 'ip': i , 'jc': j } ) ;

     } ;

    setTimeout( () => { console.log( resultpool ); } , 500 ) ;
	   
   } ;


  for( i = 0; i < ip; ++i )  workerpool[i].disconnect() ;

 }

else if( cluster.isWorker )
 {

  process.on( 'message'    , (msg) => { 

    var ix     = ( 1e5 + Math.random() * 1e3 ) ;
    var result = undefined;

    for( var i = 0; i < ix; ++i )  result = ( Math.sin( i ) + Math.cos( i ) ) ;

//  if( Math.random() > 1.00 )  result = undefined ;

//  console.log( 'Message from worker:' , result );

    process.send( { 'kc': msg.kc , 'ip': msg.ip , 'jc': msg.jc , 'r': result } );

   } );

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ); } );

 }

