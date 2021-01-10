
const events  = require( 'events' ) ;
const cluster = require( 'cluster' )


if( cluster.isMaster )
 {

  let   i  = undefined ;
  const ip =  4 ;

  let   j  = undefined ;
  const jc =  4 ;

  let   k  = undefined ;
  const kc =  4 ;


  const workerpool  = new Array( ip ) ;
  
  const resultpool  = new Array( jc ) ;

  const promisepool = new Array( jc ) ;


  const e = new events() ;


  for( i = 0; i < ip; ++i )  workerpool[i]  = cluster.fork() ;


  for( i = 0; i < ip; ++i )

    workerpool[i].on( 'message' , (msg) => {

      console.log( 'Message:' , msg ) ;

      console.log( ('result' + msg.ip) , msg ) ;

      e.emit( ('result' + msg.ip) , msg ) ;

     } ) ;


  for( k = 0; k < kc; ++k )
   {

    for( i = 0; i < ip; ++i )

      promisepool[i] = new Promise( (resolve,reject) => {

        e.once( ('result' + i.toString) , (msg) => {

          if( msg != undefined )
	   {

             resultpool[msg.ip] = msg.r ;

	     resolve(msg);

	   }

          else reject( 'error' ); } );

       } ) ;


    for( i = j = 0; j < jc; ++j , i = (++i % ip) )
 
      workerpool[i].send( { 'ip': i , 'jc': j } ) ;


    Promise.all( promisepool ).then( (value) => {

      console.log( value );
 
      console.log( ' Result: ' , resultpool );

     } ).catch( (err) => {
	     
      console.log( 'Error:' , err );
     
     } ) ;


   } ;


  for( i = 0; i < ip; ++i )  workerpool[i].disconnect() ;

 }

else if( cluster.isWorker )
 {

  process.on( 'message'    , (msg) => { 

    var ix     = ( Math.random() * 1e5 ) ;
    var result = undefined;

    for( var i = 0; i < ix; ++i )  result = ( Math.sin( i ) + Math.cos( i ) ) ;

//  if( Math.random() > 1.00 )  result = undefined ;

    console.log( 'Message from worker:' , result );

    process.send( { 'ip': msg.ip , 'jc': msg.jc , 'r': result } );

   } );

  process.on( 'disconnect' , () => { console.log( 'worker #' , cluster.worker.id , ' disconnected.' ); } );

 }

