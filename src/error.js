

try
 {

  const error = new Error( { name: 'Mame' , message: 'Message' } ) ;

//  error.code    = 1 ;
//  error.name    = 'Error name' ;
//  error.message = 'Error message.' ;

  throw error ;

 }


catch( e )
 {

  console.log( e.code , e.name , e.message ) ;

 }


