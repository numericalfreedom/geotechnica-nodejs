
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

const client = net.createConnection( 'channel' , () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('world!\r\n');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});


function model()
 {

  this.step    = false ;
  this.phase   = 0 ;
  this.start   = function(){ this.step = true  } ;
  this.finish  = function(){ this.step = false } ;

  this.program = program ;

  return ;

 }


function program()
 {

  switch( this.phase )
   {

    case( 0 ):

      this.start() ;

      break ;

    case( 1 ):

      break ;

    case( 2 ):

      break ;

    default:

      this.finish() ;

      break ;

   }
 
 }

