
var net = require('net');


var PIPE_NAME = "mypipe";
// var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
var PIPE_PATH = "./" + PIPE_NAME;


var L = console.log;

// == Server part == //


var server = net.createServer(function(stream) {

  L('Server: on connection')

  stream.on('data', function(data) {
    L('Server: on data:', data.toString());
    switch( data.toString() )
     {

      case( 'Operation from Client1!' ):

        stream.write('Operation client1!') ;

        break ;

      case( 'Operation from Client2!' ):

        stream.write('Operation client2!') ;

        break ;

      case( 'Operation from Client3!' ):

        stream.write('Operation client3!') ;

        break ;

      case( 'Byebye from Client1!' ):

        stream.write('Take it easy client1!') ;

        break ;


      case( 'Byebye from Client2!' ):

        stream.write('Take it easy client2!');

	break ;

      case( 'Byebye from Client3!' ):

        stream.write('Take it easy client3!');

	break ;

     }

   });

  stream.on('end', function() {
    L('Server: on end')
    server.close();
   });

});


server.on('close',function(){
 L('Server: on close');
})


server.listen(PIPE_PATH,function(){
 L('Server: on listening');
})




// == Client1 part == //

var client1 = net.connect(PIPE_PATH, function() {
  L('Client1: on connection');
 })

client1.write( 'Operation from Client1!' ) ;

client1.on('data', function(data) {
  L('Client1: on data:', data.toString());
  if( data.toString() == 'Operation client1!' )
   {
    L( 'Operation client1!' ) ;
    client1.write( 'Byebye from Client1!' ) ;
   }
  if( data.toString() == 'Take it easy client1!' )
    client1.end('Thanks!');
 });

client1.on('end', function() {
  L('Client1: on end');
 })


// == Client2 part == //

var client2 = net.connect(PIPE_PATH, function() {
  L('Client2: on connection');
 })

client2.write( 'Operation from Client2!' ) ;

client2.on('data', function(data) {
  L('Client2: on data:', data.toString());
  if( data.toString() == 'Operation client2!' )
   {
    L( 'Operation client2!' ) ;
    client2.write( 'Byebye from Client2!' ) ;
   }
  if( data.toString() == 'Take it easy client2!' )
    client2.end('Thanks!');
 });

client2.on('end', function() {
  L('Client2: on end');
 })


// == Client3 part == //

var client3 = net.connect(PIPE_PATH, function() {
  L('Client3: on connection');
 })

client3.write( 'Operation from Client3!' ) ;

client3.on('data', function(data) {
  L('Client3: on data:', data.toString());
  if( data.toString() == 'Operation client3!' )
   {
    L( 'Operation client3!' ) ;
    client3.write( 'Byebye from Client3!' ) ;
   }
  if( data.toString() == 'Take it easy client3!' )
    client3.end('Thanks!');
 });

client3.on('end', function() {
  L('Client3: on end');
 })

