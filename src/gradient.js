
const c_0_0     = 0.0 ;
const c_1_0     = 1.0 ;
const c__1_0    = (- 1.0 ) ;
const c_1__3    = ( 1.0 / 3.0 ) ;
const c__1__3   = (- (1.0 / 3.0) ) ;
const c_sq2__sq3  = (  Math.sqrt( 2.0 / 3.0 ) ) ;
const c__sq2__sq3 = (- Math.sqrt( 2.0 / 3.0 ) ) ;
const c_sq2__3    = (  Math.sqrt( 2.0 ) / 3.0 ) ;
const c__sq2__3   = (- Math.sqrt( 2.0 ) / 3.0 ) ;
const c_sq8__3    = (  Math.sqrt( 8.0 ) / 3.0 ) ;
const c__sq8__3   = (- Math.sqrt( 8.0 ) / 3.0 ) ;
const c_sq8__sq3  = (  Math.sqrt( 8.0 / 3.0 ) ) ;
const c__sq8__sq3 = (- Math.sqrt( 8.0 / 3.0 ) ) ;


var d = [ [  c__sq8__3 , c__sq2__3   , c__sq2__3  , c_0_0  ] ,
          [  c_0_0     , c__sq2__sq3 , c_sq2__sq3 , c_0_0  ] ,
          [  c_1__3    , c_1__3      , c_1__3     , c__1_0 ] ] ;


var v = [ [ 0 , 0 , 0 ] ,
          [ 0 , 0 , 0 ] ,
          [ 0 , 0 , 0 ] ,
          [ 0 , 0 , 1 ] ] ;


var p = [ [  1.0 ] ,
          [  1.0 ] ,
          [  1.0 ] ,
          [  2.0 ] ] ;


var gv = [ [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ] ;


var gp = [ [ undefined ] ,
           [ undefined ] ,
           [ undefined ] ] ;

var e  = [ [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ] ;

var o  = [ [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ,
           [ undefined , undefined , undefined ] ] ;

var t = 0.0 ;


matmul( gv , 3 , 4 , 3 , d , v ) ;

matmul( gp , 3 , 4 , 1 , d , p ) ;


matsymmetric( e , 3 , gv ) ;

matantisymmetric( o , 3 , gv ) ;

mattrace( t , 3 , e ) ;


console.log( "\n" ) ;

console.log( gv ) ;

console.log( "\n" ) ;

console.log( e ) ;

console.log( "\n" ) ;

console.log( o ) ;

console.log( "\n" ) ;

console.log( gp ) ;

console.log( "\n" ) ;

console.log( t ) ;

console.log( "\n" ) ;


function matmul( c , nla , nca , ncb , a , b )
 {

  var i = undefined ;
  var j = undefined ;
  var k = undefined ;
  var v = undefined ;

  for( i=0; i<nla; ++i )

    for( j=0; j<ncb; c[i][j++] = v )

      for( v=0 , k=0; k<nca; ++k )

        v += ( a[i][k] * b[k][j] ) ;

  return ;

 };


function matsymmetric( b , n , a )
 {

  const c_2_0 = 2.0 ;

  var i = undefined ;
  var j = undefined ;

  for( i=0; i<n; ++i )
  
    for( j=0; j<n; b[i][j] = (a[i][j] + a[j++][i]) / c_2_0 ) ;

  return ;

 };


function matantisymmetric(  b , n , a )
 {

  const c_2_0 = 2.0 ;

  var i = undefined ;
  var j = undefined ;

  for( i=0; i<n; ++i )

    for( j=0; j<n; b[i][j] = (a[i][j] - a[j++][i]) / c_2_0 ) ;

  return ;

 };


function mattrace( t , n , a )
 {

  const c_0_0 = 0.0 ;

  var i = undefined ;

  for( t = c_0_0 , i=0; i<n; t += a[i][i++] ) ;

  return ;

 };


