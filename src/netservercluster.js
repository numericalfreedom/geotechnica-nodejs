
var net     = require('net') ;
var cluster = require( 'cluster' ) ;


var PIPE_NAME = "mypipe";
// var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
var PIPE_PATH = "." + PIPE_NAME;


var L = console.log;

// == Server part == //


if( cluster.isMaster )
 {

  cluster.fork() ;

  var server = net.createServer(function(stream) {

    L('Server: on connection')

    stream.on('data', function(data) {
      L('Server: on data:', data.toString());
      switch( data.toString() )
       {

        case( 'Operation from Client!' ):

          stream.write('Operation client!') ;

          break ;

        case( 'Byebye from Client!' ):

          stream.write('Take it easy client!') ;

          break ;

       }

     });

    stream.on('end', function() {
      L('Server: on end')
      server.close();
      cluster.disconnect() ;
     }) ;

   }) ;


  server.on('close',function(){
    L('Server: on close');
   }) ;


  server.listen(PIPE_PATH,function(){
    L('Server: on listening');
   }) ;


  cluster.on( 'disconnect' , function( worker ){ console.log( 'Worker #${worker.id} disconnected' ) } ) ;


 }

else if( cluster.isWorker )
 {

  // == Client part == //

  var client = net.connect(PIPE_PATH, function() {
    L('Client: on connection');
   })

  client.write( 'Operation from Client!' ) ;

  client.on('data', function(data) {
    L('Client: on data:', data.toString()) ;
    if( data.toString() == 'Operation client!' )
     {
      L( 'Operation client!' ) ;
      let jx = Math.ceil( 1e9 + Math.random() * 1e9 ) ;
      let result = undefined ;
      for (let j = 0 ; j < jx ; ++j)  result = (Math.sin(j) + Math.cos(j)) ;
      client.write( 'Byebye from Client!' ) ;
     }
    if( data.toString() == 'Take it easy client!' )
      client.end('Thanks!') ;
   }) ;

  client.on('end', function() {
    L('Client: on end');
   }) ;

 } ; // end else
