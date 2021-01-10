

const Paralleljs = require( '/usr/share/node/head/lib/node_modules/paralleljs' ) ;


function radd( A )
 {

  A.r = ( A.a + A.b + A.c ) ;

  return( A ) ;

 } ;


class A
 {

  constructor( a , b , c )
   {
    this.a = a ;
    this.b = b ;
    this.c = c ;
   }

  aadd()
   {

    this.r = ( this.a + this.b + this.c ) ;

   }

 }


class B extends A
 {

  constructor( a , b , c , d , e , f )
   {
    super( a , b , c );
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

    console.log( 'Add in B.' );

    return( r );

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


let ix = 10 ;

let i  = 0 ;

let As = new Array( ix ) ;

for( i = 0; i < ix; ++i )
 {

  As[i] = new A( i+1 , i+2 , i+3 , i+4 , i+5 , i+6 ) ;

 }

console.log( As ) ;

PA = new Paralleljs( As ) ;

PA.map(radd).then( () => { console.log( As ) } ) ;

