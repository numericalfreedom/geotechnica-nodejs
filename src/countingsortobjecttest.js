

class O
 {

  constructor( n , x , y , z )
   {

    this.n = n ;

    this.x = x ;
    this.y = y ;
    this.z = z ;

   } ;

  get on()
   {

    return( this.n ) ;

   } ;

 } ;


var o0 = new O( 'o0' ,  1.1 , 6.5 , 1.7 ) ;
var o1 = new O( 'o1' ,  2.3 , 1.5 , 3.4 ) ;
var o2 = new O( 'o2' ,  1.7 , 2.3 , 5.6 ) ;
var o3 = new O( 'o3' ,  3.4 , 3.5 , 2.8 ) ;
var o4 = new O( 'o4' ,  5.6 , 5.7 , 4.7 ) ;
var o5 = new O( 'o5' ,  2.8 , 1.1 , 6.5 ) ;
var o6 = new O( 'o6' ,  4.7 , 2.3 , 1.5 ) ;


o = [ o0 , o1 , o2 , o3 , o4 , o5 , o6 ] ;


for( i = 0; i<o.length; ++i ) console.log( o[i].on ) ;


an = new Array( 10 ) ;

ac = [ new Array( 7 ) , new Array( 7 ) , new Array( 7 ) ] ;

c  = [ 'x' , 'y' , 'z' ] ;


for( j=0; j<c.length; ++j )
 {

  cc = c[j] ;

  for( i = 0; i<an.length; ++i ) an[i] = 0 ;

  for( i = 0; i<o.length; ++i )
   {
    ia = Math.floor( o[i][cc] - 1.0 ) ;
    ++an[ia] ;
    // console.log( ia ) ;
   } ;

  for( i = 1; i<an.length; ++i )  an[i] += an[i-1] ;

  for( i = 0; i<o.length; ++i )
   {
    ia = Math.floor( o[i][cc] - 1.1 ) ;
    ac[j][--an[ia]] = o[i] ;
    // console.log( ia , an[ia] ) ;
   } ;

  console.log( an ) ;

  console.log( "\n" , cc , "\n" ) ;

  console.log( ac[j] ) ;

  console.log( "\n" ) ;

 } ;


