

const Async  = require( 'async' ) ;
const Events = require( 'events' ) ;


class A
 {

	 
  constructor( a , b , c )
   {

    this.a = a ;
    this.b = b ;
    this.c = c ;

   } ;


  aadd()
   {

    let r = ( this.a + this.b + this.c ) ;

    console.log( 'Add in A.' ) ;

    return( r ) ;

   } ;


  af( A , callback )
   {

    var promise = new Promise
     (

      function( resolve , reject )
       {

        setTimeout
	 ( 

	  function()
           {

            A.a = i ;
            A.b = i+1 ;
            A.c = i+2 ;

   	    resolve( true ) ;

            callback() ;

           } , 1000

	 ) ;
	    
       }
     
     ) ;

    return( promise ) ;

   } ;


  fa( callback )
   {

    console.log( aa ) ;

    callback( null , 'fa' ) ;

   } ;


  fb( callback )
   {

    callback( null , 'fb' ) ;

   } ;


  fc( callback )
   {

    callback( null , 'fc' ) ;

   } ;


 } ;


class B extends A
 {

  constructor( a ,  b , c , d , e , f )
   {
    super( a , b , c ) ;
    this.ba = a ;
    this.bb = b ;
    this.bc = c ;
    this.d  = d ;
    this.e  = e ;
    this.f  = f ;
   }

  badd()
   {

    let r = ( this.a + this.b + this.c + this.d + this.e + this.f ) ;

    console.log( 'Add in B.' ) ;

    return( r ) ;

   }

  set std( d )
   {

    this.d = d ;

   }

  get gtd()
   {

    return( this.d );

   }

 }


const b = new B( 1 , 2 , 3 , 4 , 5 , 6 );

console.log( b );

b.std = 7 ;

console.log( b ) ;

var d = b.gtd ;

console.log( d ) ;


const aa = new A( 1 , 2 , 3 ) ;


const q = new Async.queue ( aa.af , 3 ) ;


q.drain = function( err )
 {

  if( err )
	 
    console.log( 'Error.' ) ;

  else

    console.log( 'All operations done:' , aa ) ;

 } ;


for( var i = 0; i < 10; ++i )
 {

  q.push
   (

     aa ,

     function( err )
      {

       if( err )

         console.log( 'Error.' ) ;

       else

         console.log( 'Push peration done.' ) ;

      }

   ) ;

 } ;


Async.series
 (

  [ aa.fa , aa.fb , aa.fc ] ,

  function( err , results )
   {
   
    console.log( 'Results:' , results ) ;   
   
   }

 ) ;


