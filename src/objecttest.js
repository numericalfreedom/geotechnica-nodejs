

const Async  = require( 'async' ) ;
const Events = require( 'events' ) ;


class Node
 {
 
  constructor( x , y , z )
   {

    this.x = x ;
    this.y = y ;
    this.z = z ;

   } ;

  movenode()
   {

    ++this.x ;
    ++this.y ;
    ++this.z ;

    ++this.x ;
    ++this.y ;
    ++this.z ;

   } ;

 } ;


class A
 {

	 
  constructor( a , b , c )
   {

    this.a = a ;
    this.b = b ;
    this.c = c ;

    this.node = new Array( 10 ) ;

    for( let i = 0; i < 10; ++i )

      this.node[i] = new Node( i , i+1 , i+2 ) ;

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


            for( let i = 0; i < 10; ++i )

              A.node[i].movenode() ;

		   
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


