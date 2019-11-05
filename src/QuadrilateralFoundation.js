

module.exports = { test , izzFz , izzqzAQ } ;



function test()
 {

  const v_dx =  0.01 ;
  const v_dy =  0.01 ;
  const v_xl = -1.0 ;
  const v_yl = -1.0 ;
  const v_xr =  1.0 ;
  const v_yr =  1.0 ;
  const v_z  =  0.025 ;

  const x = [ [v_dx] , [v_dy] , [v_xl] , [v_yl] , [v_xr] , [v_yr] , [v_z] ] ;

  const v_izzFz = izzFz( 0.0 , 1.0 ) ;
  
  const v_izzqzAQ = izzqzAQ( x ) ;

  return( [ v_izzFz , v_izzqzAQ ] ) ;

 }



function izzFz( x , y , z )
 {

  const c_3__2pi = ( 3.0 / (2.0 * Math.PI) ) ;

  const rr   = ( (x * x) + (y * y) ) ;
  const zz   = ( z * z ) ;
  const rrzz = ( rr / zz ) ;

  const izzf = ( (c_3__2pi / zz) * Math.pow( (1.0 / (1.0 + rrzz)) , 2.5 ) ) ;

  return( izzf ) ;

 } ; // end function izzFz()



function izzqzAQ( x )
 {

  const c_0    = 0.00 ;
  const c_1    = 1.00 ;
  const c_1__2 = 0.50 ;  
  const c_1__4 = 0.25 ;

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
  
  const da     = ( dx * dy ) ;

  var x        = undefined ;
  var y        = undefined ;
  var izzq     = undefined ;

  izzq = c_0 ;


  if( z > c_0 )

    for( x = (xl + dx__2); x < xr; x += dx )

      for( y = (yl + dy__2); y < yr; y += dy )
      
        izzq += ( izzFz( x , y , z ) * da ) ;

  else

    if( ((xl == 0) || (xr == 0)) && ((yl == 0) || (yr == 0)) )
    
      izzq = c_1__4 ;
    
    else
    
      if( (xl == 0) || (yl == 0) || (xr == 0) || (yr == 0) )
      
        izzq = c_1__2 ;
        
      else
      
        if( (xl < 0) && (xr > 0) && (yl < 0) && (yr > 0) )
        
          izzq = c_1 ;


  return( izzq ) ;


 } ; // end function izzqzAQ()
