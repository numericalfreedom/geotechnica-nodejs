

module.exports = { Server , Client } ;


const net = require('net') ;

const L = console.log ;


function Server( streampath )
 {

  this.server = net.createServer( function( stream ) {

    L('Server: on connection')

    stream.on('data', function( data ) {

      L( 'Server: on data:', data.toString() ) ;

      switch( data.toString() )
       {

        case( 'Operation from Client!' ):

          stream.write('Operation client!') ;

          break ;

        case( 'Byebye from Client!' ):

          stream.write('Take it easy client!') ;

          break ;
       }

     }) ;

    stream.on( 'end' , function() {
      L('Server: on end')
      this.server.close();
     }) ;
	  
  }) ;


  this.server.on( 'close' , function() {
   L('Server: on close');
  }) ;


  this.server.listen( streampath , function() {
   L('Server: on listening');
  }) ;

 } ;


function Client( streampath )
 {

  var client = net.connect( streampath , function() {

    L('Client: on connection') ;

   })

  client.write( 'Operation from Client!' ) ;

  client.on('data', function(data) {

    L('Client: on data:', data.toString()) ;
	  
    if( data.toString() == 'Operation client!' )
     {
      L( 'Operation client!' ) ;
      client.write( 'Byebye from Client!' ) ;
     }

    if( data.toString() == 'Take it easy client!' )

      client.end('Thanks!') ;

   }) ;

  client.on('end', function() {

    L('Client: on end');
	  
   }) ;

 } ;

