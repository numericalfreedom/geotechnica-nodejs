

console.log( 'izzq=' , izzqf( 0.0 , 1.0 ) ) ;


const x = [ [0.01] , [0.01] , [-1.0] , [-1.0] , [1.0] , [1.0] , [0.025] ] ;

console.log( 'izzq=' , QuadrilateralFoundation( x ) ) ;


function QuadrilateralFoundation( x )
 {

  const c_dx   = 0 ;
  const c_dy   = 1 ;
  const c_xl   = 2 ;
  const c_yl   = 3 ;
  const c_xr   = 4 ;
  const c_yr   = 5 ;
  const c_z    = 6 ;

  const dx     = x[c_dx][0] ;
  const dy     = x[c_dy][0] ;
  const xl     = x[c_xl][0] ;
  const yl     = x[c_yl][0] ;
  const xr     = x[c_xr][0] ;
  const yr     = x[c_yr][0] ;
  const z      = x[c_z][0] ;

  const dx__2  = ( dx / 2.0 ) ;
  const dy__2  = ( dy / 2.0 ) ;

  const zz     = ( z * z ) ;
  const da     = ( dx * dy ) ;

  var x        = undefined ;
  var y        = undefined ;
  var rr       = undefined ;
  var izzq     = undefined ;

  for( izzq = 0.0 , x = (xl + dx__2); x < xr; x += dx )

    for( y = (yl + dy__2); y < yr; y += dy )
     {

      rr    = ( (x * x) + (y * y) ) ;

      izzq += izzqf( rr , zz ) ;

     } ; // end for()

  return( izzq * da ) ;

 } ; // end function newmark()


function izzqf( rr , zz )
 {

  const c_3__2pi = ( 3.0 / (2.0 * Math.PI) ) ;

  const rrzz = ( rr / zz ) ;

  const izzq = ( (c_3__2pi / zz) * Math.pow( (1.0 / (1.0 + rrzz)) , 2.5 ) ) ;

  return( izzq ) ;

 } ; // end function izzqr()


