
const fs     = require( 'fs' ) ;
const path   = require( 'path' ) ;
const stream = require( 'stream' ) ;

var readstream = '\\\\.\\pipe\\' +'readstream' ;

var rs = fs.createReadStream( readstream , { autoClose: false } ) ;

rs.on( 'data' , (data) => { console.log( data ) ; } ) ;

