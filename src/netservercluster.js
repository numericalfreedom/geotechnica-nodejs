
var net     = require('net') ;
var cluster = require( 'cluster' ) ;


var PIPE_NAME = "mypipe";
// var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
var PIPE_PATH = "." + PIPE_NAME;

var L = console.log;

var i = 0 ;
var nworker = 4 ;

var message = undefined ;

// == Server part == //

if( cluster.isMaster )
 {

   worker1 = cluster.fork() ;
   worker2 = cluster.fork() ;
   worker3 = cluster.fork() ;
   worker4 = cluster.fork() ;

  var server = net.createServer( function( stream ) {

    L('Server: on connection')

    stream.on( 'data' , function( data ) {

      L( 'Server: on data:' , data.toString() );

      message = {} ;

      switch( data.toString() )
       {

        case( 'Ready from Client #1!' ):

          message = { 'command' : 'Operation' , 'worker' : 1 , 'number' : 1e9 } ;

          break ;

        case( 'Ready from Client #2!' ):

          message = { 'command' : 'Operation' , 'worker' : 2 , 'number' : 1e9 } ;

          break ;

        case( 'Ready from Client #3!' ):

          message = { 'command' : 'Operation' , 'worker' : 3 , 'number' : 1e9 } ;

          break ;

        case( 'Ready from Client #4!' ):

          message = { 'command' : 'Operation' , 'worker' : 4 , 'number' : 1e9 } ;

          break ;

        case( 'Byebye from Client #1!' ):

          message = { 'command' : 'Goodbye' , 'worker' : 1 } ;

          break ;

        case( 'Byebye from Client #2!' ):

          message = { 'command' : 'Goodbye' , 'worker' : 2 } ;

          break ;

        case( 'Byebye from Client #3!' ):

          message = { 'command' : 'Goodbye' , 'worker' : 3 } ;

          break ;

        case( 'Byebye from Client #4!' ):

          message = { 'command' : 'Goodbye' , 'worker' : 4 } ;

          break ;

        case( 'Thanks from Client #1!' ):

          worker1.disconnect() ;

          break ;

        case( 'Thanks from Client #2!' ):

          worker2.disconnect() ;

          break ;

        case( 'Thanks from Client #3!' ):

          worker3.disconnect() ;

          break ;

        case( 'Thanks from Client #4!' ):

          worker4.disconnect() ;

          break ;

	default:

	  break ;

       } ; // end switch ;

      stream.write( Buffer.from( JSON.stringify( message ) ) ) ;

     });


    stream.on( 'end' , function() {

      L( 'Server: on end' ) ;

      if( (++i % nworker) == 0 )  server.close();

     }) ;


   }) ;


  server.on( 'close' , function() {

    L('Server: on close');

   }) ;


  server.listen( PIPE_PATH , function() {

    L('Server: on listening');

   }) ;


  cluster.on( 'disconnect' , function( worker ){ console.log( `Worker #${worker.id} disconnected.` ) } ) ;
 
 }

else if( cluster.isWorker )
 {

  // == Client part == //

  var client  = undefined ;
  var message = undefined ;

  client = net.connect( PIPE_PATH , function() {

    L( 'Client: on connection' );

   }) ;

  client.write( `Ready from Client #${cluster.worker.id}!` ) ;

  client.on( 'data' , function( data ) {

    message = JSON.parse( data.toString() );

    L( 'Client: on data:' , data.toString() ) ;

    switch( message.command )
     {

      case( 'Operation' ):

        if( message.worker == cluster.worker.id )
         {

          L( `Server write: Operation Client #${cluster.worker.id}!` ) ;
    
          let jx = Math.ceil( message.number + (Math.random() * message.number) ) ;
  
          let result = undefined ;

          for( let j = 0 ; j < jx ; ++j )  result = ( Math.sin(j) + Math.cos(j) ) ;

          client.write( `Byebye from Client #${cluster.worker.id}!` ) ;

         }

        break ;

      case( 'Goodbye' ):

        if( message.worker == cluster.worker.id )

          client.end( `Thanks from Client #${cluster.worker.id}!` ) ;

        break ;

      } ;  // end switch()

   }) ;


  client.on('end', function() {

    L('Client: on end');

   }) ;


 } ; // end else

