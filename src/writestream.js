const fs = require( 'fs' ) ;
const path = require( 'path' ) ;
const stream = require( 'stream' ) ;

var streampath = path.join('\\\\?\\pipe', process.cwd(), 'readstream' ) ;

var ws = fs.createWriteStream( streampath ) ;

ws.write( 'data' ) ;


