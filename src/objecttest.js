
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

    let r = ( this.a + this.b + this.c ) ;

    console.log( 'Add in A.' );

    return( r );

   }

 }


class B extends A
 {

  constructor( a ,  b , c , d , e , f )
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


