
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

server.listen( 'channel' , () => {
  console.log('server bound');
});

