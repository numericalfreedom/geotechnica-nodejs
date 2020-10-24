

var async = require( 'async' ) ;


function model()
 {

  this.a = 1 ;

  this.b = 2 ;

  this.c = 3 ;  

 }


function ma( m )
 {

  let r = new Promise( (reject , resolve) => { resolve( m.a ) } ) ;

  return( r ) ;

 }


function mb( m )
 {

  let r = new Promise( (reject , resolve) => { resolve( m.b ) } ) ;

  return( r ) ;
  
 }


function mc( m )
 {

  let r = new Promise( (reject , resolve) => { resolve( m.c ) } ) ;

  return( r ) ;

 }


var m = new model() ;

// console.log( m ) ;


async.applyEachSeries( [ ma , mb , mc ] , m , (err,data) => { console.log( data ) ; } ) ;



