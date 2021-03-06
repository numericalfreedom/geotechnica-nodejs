
const net = require('net');

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log( 'client connected' );
  c.on( 'end', () => {
    console.log('client disconnected');
    server.close() ;
  });
  c.write('hello\r\n') ;
//  c.end() ;
  c.pipe(c);
});

server.on('error', (err) => {
  throw err;
});

server.listen( 'channel1' , () => {
  console.log('server bound to channel1!');
});


setTimeout( () => {

  const client = net.createConnection( 'channel2' , () => {
    // 'connect' listener.
    console.log('connected to server channel2!');
    client.write('world!\r\n');
  });

  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });

  client.on('end', () => {
    console.log('disconnected from server channel2!');
  });

} , 3000);


