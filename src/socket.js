var net = require( 'net' ) ;

var server = net.createServer() ;

server.listen( 'channel' ) ;

server.on( 'data' , (data) => { console.log( 'data' ) ; } ) ;


server.on( 'close' , () => { server.disconnect(); console.log( 'Server on socket closed.' ) } ) ;

console.log( 'socket server is running and listening.' ) ;
