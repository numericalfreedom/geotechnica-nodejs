
module.exports = { tns: Tns , tensor: Tensor } ;


function Tns()
 {
 
  var T = new Tensor();
  var Q = new Tensor();
  var R = new Tensor();
  var S = new Tensor();
 
  T.cst( 1 );
  Q.cst( 2 );
  
  R.ttm( T , Q );
  S.eqt( R );

  console.log( T ) ;
  console.log( Q ) ;
  console.log( R ) ;
  console.log( S ) ;

  return S.v;
 
 };



function Tensor()
 {

  var v = new Array( 6 );

  for( i = 0; i < v.length; v[ i++ ] = 0 );

  this.v   = v;
  
  this.eqt = eqt;
  this.unt = unt;
  this.cst = cst;
  this.trc = trc;
  this.enm = enm;
  this.add = add;
  this.sub = sub;
  this.stm = stm;
  this.ttm = ttm;

 }; // end function Tensor()



function idx( i , j )
 {

  var k = i;

  if( i - j )  k = ( i + j + 2 );

  return k;

 }; // end function Tensor.idx()



function eqt( x )
 {

  for( i = 0; i < this.v.length; this.v[ i ] = x.v[i++] );

 }; // end function Tensor.eqt()



function unt( s )
 {

  for( i = 0; i < this.v.length; ++i )
  
    if( i < 3 )  this.v[ i ] = s;
  
 }; // end function Tensor.unt()



function cst( s )
 {

  for( i = 0; i < this.v.length; ++i )
  
    this.v[ i ] = s;
    
 }; // end function Tensor.cst()




function trc()
 {

  var t = 0;

  for( i = 0; i < 3; ++i )  t += this.v[ i ];

  return t;
  
 }



function enm()
 {

  var t = 0;
  var y = 0;

  for( i = 0; i < this.v.length; ++i )

    y = this.v[ idx( i , j ) ] , t += ( y * y );

  return Math.sqrt( t );

 }



function add( x )
 {

  for( i = 0; i < this.v.length; this.v[ i ] += x.v[ i++ ] );

 };




function sub( x )
 {

  for( i = 0; i < this.v.length; this.v[ i ] -= x.v[ i++ ] );

 };



function stm( s )
 {

  for( i = 0; i < this.v.length; this.v[ i++ ] *= s );

 };



function ttm( x , y )
 {

  for( i = 0; i < 3; ++i )

    for( j = 0; j <= i; ++j )

      for( k = this.v[ idx( i , j ) ] = 0; k < 3; ++k )

        this.v[ idx( i , j ) ] += ( x.v[ idx( i , k ) ] * y.v[ idx( k , j ) ] );

 };



