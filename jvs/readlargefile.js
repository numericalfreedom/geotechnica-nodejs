
var fs = require('fs') ;


let stream = fs.createReadStream( 'plane.msh' , {
    flags: 'r',
    encoding: 'utf-8',
    fd: null,
    buffersize: 1
  }) ;


line = '' ;


//start reading the file
stream.on( 'data' , ( data ) =>
 {

  // pause stream if a newline char is found
  // console.log( 'data=' , data ) ;

  stream.pause() ;

  console.log( 'data=' , data ) ;

  if( data == '\n' )
   {
    console.log( line ) ;
    line = '';
   }
  else
   {
    //add the new char to the current line
    line += data ;
   }

  stream.resume() ;

 }

)


stream.on( 'end' , () => { console.log( 'end' ) ;  } );


stream.on( 'close' , () => { console.log( 'close' ) ;  } );


stream.resume();


