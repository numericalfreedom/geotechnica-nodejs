

const net = require('net');


const server = net.createServer((c) => {
  // 'connection' listener.

  console.log( 'client connected' );

  c.setEncoding( 'utf8' ) ;

  c.on( 'end', () => {
    console.log('client disconnected');
//  server.close() ;
  });

  c.on( 'data' , (data) => {
    console.log( data.toString() ) ;
    if( data.toString() == "close\n" )
     {
      console.log( data ) ;
      server.close() ;
     }

  }) ;

});

server.on('error', (err) => {
  throw err;
});

server.listen( 'channel' , () => {
  console.log('server bound to channel!');
});



setTimeout( () => {

  const client = net.createConnection( 'channel' , () => {
    // 'connect' listener.
    console.log('connected to server channel!');
  });

  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });

  client.on('end', () => {
    console.log('disconnected from server channel!');
  });

  var data = Buffer.from( 'data\n' ) ;

  client.write( data ) ;

  client.pipe( client ) ;

  var close = Buffer.from( 'close\n' ) ;

  client.write( close ) ;

  client.pipe( client ) ;

//  client.end() ;

} , 1000 );


