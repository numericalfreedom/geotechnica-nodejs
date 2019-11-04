

module.exports = { Server , Client } ;


const net = require('net') ;

const L = console.log ;

const c_ReadModel        =  0 ;
const c_WriteModel       =  1 ;
const c_Cycle            =  2 ;
const c_Safety           =  3 ;
const c_Project          =  4 ;

const c_MVelocityHalf    =  0 ;
const c_MForce           =  1 ;
const c_MDiscretisation  =  2 ;
const c_MExchange        =  3 ;
const c_MAcceleration    =  4 ;
const c_MVelocityFull    =  5 ; 
const c_MDisplacement    =  6 ;
const c_MFixity          =  7 ;
const c_MHistory         =  8 ;

const c_HDischarge       =  0 ;
const c_HExchange        =  1 ;
const c_HPressure        =  2 ;

const c_TDischarge       =  0 ;
const c_TExchange        =  1 ;
const c_TTemperature     =  2 ;


function Server( streampath )
 {

  this.server = net.createServer( function( stream ) {

    L('Server: on connection')

    stream.on( 'data', function( data ) {

    datafields = data.toString().split( '.' ) ;

    L( datafields ) ;

    for( var datafield of datafields )
     {
 
      switch( datafield.toString() )
       {

        case( 'Client ready!' ):

          stream.write( 'Client ready!.' ) ;

          break ;

        case( 'Operation from Client!' ):

          stream.write( 'Operation client!.' ) ;

          break ;

        case( 'Byebye from Client!' ):

          stream.write( 'Take it easy client!.' ) ;

          break ;
       } ;

     } ;

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

   }) ;

  client.write( 'Client ready!.' ) ;

  client.write( 'Operation from Client!.' ) ;

  client.on( 'data' , function(data) {

    L('Client: on data:', data.toString()) ;
	 
    datafields = data.toString().split( '.' ) ;

    L( datafields ) ;

    for( var datafield of datafields )
     {

      if( datafield == 'Operation client!' )
       {
        L( 'Operation client!' ) ;
        client.write( 'Byebye from Client!.' ) ;
       } ;

      if( datafield == 'Take it easy client!' )

        client.end( 'Thanks!' ) ;

     } ;

   }) ;

  client.on( 'end' , function() {

    L('Client: on end');
	  
   }) ;

 } ;


