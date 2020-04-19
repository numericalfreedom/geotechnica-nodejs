/**
 *  Calculation of pile forces in a plane pile raft system
 * 
 *  @function
 *  @name noekkentved
 *  @param  {Array}  x - Input data field
 *  @return {Array}      Pile force results
 *  @customfunction
 */

function noekkentved( x )
 {
 
  const c_x    = 0 ;
  const c_ap   = 1 ;
  const c_l    = 2 ;
  const c_a    = 3 ;
  const c_e    = 4 ;
  const c_xy   = 5 ;
  const c_xs   = 0 ;
  const c_ys   = 1 ;
  const c_v    = 2 ;
  const c_h    = 3 ;

  const r_nu   = 0 ;
  const r_eta  = 1 ;
  const r_xy   = 2 ;
  const r_x0   = 0 ;
  const r_y0   = 1 ;
  const r_x0s  = 2 ;
  const r_y0s  = 3 ;
  const r_s    = 4 ;
  const r_m    = 5 ;
 
  const r_txpap  = 3 ;       
  const r_xp     = 0 ;
  const r_tap    = 1 ;
  const r_xpp    = 2 ;
  const r_tapp   = 3 ;
  const r_tppmtp = 4 ;
  
  const r_cv     = 4 ;
  const r_ch     = 5 ;
  const r_cm     = 6 ;
  const r_qv     = 7 ;
  const r_qh     = 8 ;
  const r_q      = 9 ;

  const r_nr     = 10 ;
  const r_nc     = x[0].length ;
   
  var   ca     = undefined ;
  var   ta     = undefined ;
  var   nu     = undefined ;

  var   snu    = undefined ;
  var   snux   = undefined ;
  var   snut   = undefined ; 
  var   snutx  = undefined ;
  var   snutt  = undefined ;
  
  var   eta    = undefined ;
  var   snuee  = undefined ;
  
  var   apr    = undefined ;

  var   xp     = undefined ;
  var   tap    = undefined ;
  var   xpp    = undefined ;
  var   tapp   = undefined ;
  var   tppmtp = undefined ;
  
  var   taps   = undefined ;
  var   apsr   = undefined ;

  var   x0     = undefined ;
  var   y0     = undefined ;
  var   x0s    = undefined ;
  var   y0s    = undefined ;
  var   dxs    = undefined ;
  var   dys    = undefined ;
  
  var   d      = undefined ;
  
  var   v      = undefined ;
  var   h      = undefined ;
  var   s      = undefined ;
  var   m      = undefined ;
  
  var   i      = undefined ;
  var   j      = undefined ;
  
  var   r      = new Array( r_nr ) ;

  for( i = 0 ; i < r_nr ; r[i++] = new Array( r_nc ) ) ;

  for( snu = snux = snut = snutx = snutt = 0.0 , j = 0 ; j < r_nc ; ++j )
   {
   
    apr = radians( x[c_ap][j] ) ;
   
    ca = Math.cos( apr ) ;
    ta = Math.tan( apr ) ;
    
    snu   += r[r_nu][j] = nu = ( ((x[c_e][j] * x[c_a][j]) / x[c_l][j]) * ca * ca ) ;
    snux  += ( nu * x[c_x][j] ) ;
    snut  += ( nu * ta ) ;
    snutx += ( nu * ta * x[c_x][j] ) ;
    snutt += ( nu * ta * ta ) ;
    
   } ; // end for()

  tap    = ( snut  / snu  ) ;
  xp     = ( snux  / snu  ) ;
  tapp   = ( snutt / snut ) ;
  xpp    = ( snutx / snut ) ;

  tppmtp = ( tapp  - tap  ) ;

  r[r_xy][r_y0] = y0 = ( (xp - xpp) / tppmtp ) ;
  r[r_xy][r_x0] = x0 = ( xp + (y0 * tap) ) ;

  for( snuee = 0.0 , j = 0 ; j < r_nc ; ++j )
   {
   
    apr          = radians( x[c_ap][j] ) ;
    ta           = Math.tan( apr ) ; 
    
    r[r_eta][j]  = eta = ( x[c_x][j] - x0 + (y0 * ta) ) ;
    
    snuee       += ( r[r_nu][j] * eta * eta ) ;
    
   } ; // end for()

  dxs = ( x[c_xy][c_xs] - x0 ) ;
  dys = ( x[c_xy][c_ys] - y0 ) ;
 
  v   = x[c_xy][c_v] ;
  h   = x[c_xy][c_h] ;
 
  if( v )
   {
  
    taps = (- h / v) ;
    
    apsr = Math.atan( taps ) ;
    
    r[r_xy][r_y0s] = y0s = x[c_xy][c_ys] ;
    r[r_xy][r_x0s] = x0s = ( x0 - (dys * taps) ) ;
    
    d = ( (x[c_xy][c_xs] - x0s) * Math.cos( apsr ) ) ;
    
   } // end if() +
 
  else
   {
  
    y0s = x[c_xy][c_ys] ;
    x0s = x[c_xy][c_ys] ;
  
    d = dxs ;
   
   } ; // end else

  r[r_xy][r_s] = s = Math.sqrt( (v * v) + (h * h) ) ;
  r[r_xy][r_m] = m = ( s * d ) ;

  r[r_txpap][r_xp]     = xp ;
  r[r_txpap][r_tap]    = tap ;
  r[r_txpap][r_xpp]    = xpp ;
  r[r_txpap][r_tapp]   = tapp ;
  r[r_txpap][r_tppmtp] = tppmtp ;

  for( j = 0 ; j < r_nc ; ++j )
   {
   
    apr        = radians( x[c_ap][j] ) ;
    
    ca         = Math.cos( apr ) ; 
    ta         = Math.tan( apr ) ;
    
    r[r_cv][j] = ( (r[r_nu][j] / snu ) * ((tapp - ta ) / tppmtp) ) ;
    r[r_ch][j] = ( (r[r_nu][j] / snut) * ((ta   - tap) / tppmtp) ) ;
    r[r_cm][j] = ( (r[r_nu][j] * r[r_eta][j]) / snuee ) ;
    
    r[r_qv][j] = ( (r[r_cv][j] * v) + (r[r_ch][j] * h) + (r[r_cm][j] * m) ) ;
    r[r_qh][j] = ( r[r_qv][j] * ta ) ;
    r[r_q][j]  = ( r[r_qv][j] / ca ) ;

   } ; // end for()
 
  return( r ) ;
  
 } ; // end function noekkentved()
