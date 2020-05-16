
var net     = require('net') ;
var cluster = require( 'cluster' ) ;


var PIPE_NAME = "mypipe";
// var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
var PIPE_PATH = "." + PIPE_NAME;

var L = console.log;


var client = new Array( 4 ) ;


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

      switch( data.toString() )
       {

        case( 'Operation from Client #1!' ):

          stream.write('Operation Client #1!') ;

          break ;

        case( 'Operation from Client #2!' ):

          stream.write('Operation Client #2!') ;

          break ;

        case( 'Operation from Client #3!' ):

          stream.write('Operation Client #3!') ;

          break ;

        case( 'Operation from Client #4!' ):

          stream.write('Operation Client #4!') ;

          break ;

        case( 'Byebye from Client #1!' ):

          stream.write('Take it easy Client #1!') ;

          break ;

        case( 'Byebye from Client #2!' ):

          stream.write('Take it easy Client #2!') ;

          break ;

        case( 'Byebye from Client #3!' ):

          stream.write('Take it easy Client #3!') ;

          break ;

        case( 'Byebye from Client #4!' ):

          stream.write('Take it easy Client #4!') ;

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

       }

     });

    stream.on('end', function() {
      L('Server: on end')
      server.close();
     }) ;

   }) ;


  server.on('close',function(){
    L('Server: on close');
   }) ;


  server.listen(PIPE_PATH,function(){
    L('Server: on listening');
   }) ;


  cluster.on( 'disconnect' , function( worker ){ console.log( `Worker #${worker.id} disconnected.` ) } ) ;
 
 }

else if( cluster.isWorker )
 {

  // == Client part == //

  client[ cluster.worker.id - 1 ] = net.connect(PIPE_PATH, function() {
    L('Client: on connection');
   })

  client[ cluster.worker.id - 1 ].write( `Operation from Client #${cluster.worker.id}!` ) ;

  client[ cluster.worker.id - 1 ].on('data', function(data) {
    L('Client: on data:', data.toString()) ;
    if( data.toString() == 'Operation Client #' + String( cluster.worker.id ) + '!' ) 
     {
      L( `Operation client #${cluster.worker.id}!` ) ;
      let jx = Math.ceil( 1e9 + Math.random() * 1e9 ) ;
      let result = undefined ;
      for (let j = 0 ; j < jx ; ++j)  result = (Math.sin(j) + Math.cos(j)) ;
      client[ cluster.worker.id - 1 ].write( `Byebye from Client #${cluster.worker.id}!` ) ;
     }
    if( data.toString() == 'Take it easy Client #' + String( cluster.worker.id ) + '!' )
      client[ cluster.worker.id - 1 ].end( `Thanks from Client #${cluster.worker.id}!` ) ;
   }) ;

  client[ cluster.worker.id - 1 ].on('end', function() {
    L('Client: on end');
   }) ;

 } ; // end else

