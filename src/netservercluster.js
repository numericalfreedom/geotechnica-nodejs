
var net     = require('net') ;
var cluster = require( 'cluster' ) ;


var PIPE_NAME = "mypipe";
// var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
var PIPE_PATH = "." + PIPE_NAME;


var L = console.log;

// == Server part == //


if( cluster.isMaster )
 {

   worker1 = cluster.fork() ;
   worker2 = cluster.fork() ;
   worker3 = cluster.fork() ;
   worker4 = cluster.fork() ;

  var server = net.createServer(function(stream) {

    L('Server: on connection')

    stream.on('data', function(data) {

      L('Server: on data:', data.toString());

      switch( data.toString() )
       {

        case( 'Operation from Client #1!' ):

          stream.write('Operation client #1!') ;

          break ;

        case( 'Operation from Client #2!' ):

          stream.write('Operation client #2!') ;

          break ;

        case( 'Operation from Client #3!' ):

          stream.write('Operation client #3!') ;

          break ;

        case( 'Operation from Client #4!' ):

          stream.write('Operation client #4!') ;

          break ;

        case( 'Byebye from Client #1!' ):

          stream.write('Take it easy client #1!') ;

          worker1.disconnect() ;

          break ;

        case( 'Byebye from Client #2!' ):

          stream.write('Take it easy client #2!') ;

          worker2.disconnect() ;

          break ;

        case( 'Byebye from Client #3!' ):

          stream.write('Take it easy client #3!') ;

          worker3.disconnect() ;

          break ;

        case( 'Byebye from Client #4!' ):

          stream.write('Take it easy client #4!') ;

          worker4.disconnect() ;

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


  cluster.on( 'disconnect' , function( worker ){ console.log( `Worker #${worker.id} disconnected` ) } ) ;
 
 }

else if( cluster.isWorker )
 {

  // == Client part == //

  var client = net.connect(PIPE_PATH, function() {
    L('Client: on connection');
   })

  client.write( `Operation from Client #${cluster.worker.id}!` ) ;

  client.on('data', function(data) {
    L('Client: on data:', data.toString()) ;
    if( data.toString() == 'Operation client #' + String( cluster.worker.id ) + '!' ) ;
     {
      L( `Operation client #${cluster.worker.id}!` ) ;
      let jx = Math.ceil( 1e9 + Math.random() * 1e9 ) ;
      let result = undefined ;
      for (let j = 0 ; j < jx ; ++j)  result = (Math.sin(j) + Math.cos(j)) ;
      client.write( `Byebye from Client #${cluster.worker.id}!` ) ;
     }
    if( data.toString() == 'Take it easy client #' + String( cluster.worker.id ) + 
'!' ) ;
      client.end( `Thanks from client #${cluster.worker.id}!` ) ;
   }) ;

  client.on('end', function() {
    L('Client: on end');
   }) ;

 } ; // end else
