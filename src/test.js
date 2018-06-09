

var data = { error: undefined , result: undefined } ;


function solve( err , res , callback )
 {

// setTimeout( callback , 100 , err , res ) ;

  callback( err , res ) ;

 }


function process( err , res )
 {

  data.error = err ;
  data.result = res ; 

  console.log( "err= " , err , " res= " , res ) ;

 }


function finish( err , res )
 {

  data.error = err ;
  data.result = res ; 

  console.log( "err= " , err , " res= " , res ) ;

 }


solve( 1 , 2 , process ) ;

console.log( "err= " , data.error , " res= " , data.result ) ;


solve( 2 , 1 , finish ) ;

console.log( "err= " , data.error , " res= " , data.result ) ;


console.log( process.argv ) ;

