

const event = require( 'events' ) ;


const emitter = new event ;


function wait( length )
 {
 
  setTimeout( () => { emitter.emit( 'resolve' ); } , length ) ;
 
 }


function solve()
 {
 
  const promise = new Promise( (resolve,reject) => {

     emitter.once( 'resolve'  , (data) => { resolve( Math.random() )

     } )

     console.log( emitter )
  
   } )

  return( promise )

 }


promisepool = [ solve() , solve() , solve() , solve() ] 


Promise.all( promisepool ).then( (data) => { console.log( 'finished:' , data ) 

} )


console.log( promisepool )


// wait( 2000 ) ;


// emitter.emit( 'resolve' ) ;

