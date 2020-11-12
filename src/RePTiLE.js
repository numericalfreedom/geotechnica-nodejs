function RePTiLE( x )
 {

//  Const C_mu    as Integer =  1% : Dim mu   as double : mu   = X( C_mu  , 1% )
//  Const C_ru    as Integer =  2% : Dim ru   as double : ru   = X( C_ru  , 1% )
//  Const C_rho   as Integer =  3% : Dim rho  as double : rho  = X( C_rho , 1% )
//  Const C_gd    as Integer =  4% : Dim gd   as double : gd   = X( C_gd  , 1% )
//  Const C_nud   as Integer =  5% : Dim nud  as double : nud  = X( C_nud , 1% )

//  Const R_fuv   as Integer =  1% : Dim fuv as Double : fuv = 0#
//  Const R_fuh   as Integer =  2% : Dim fuh as Double : fuh = 0#

//  Const R_duv   as Integer =  3% : Dim duv as Double : duv = 0#
//  Const R_duh   as Integer =  4% : Dim duh as Double : duh = 0#

//  Const R_ed    as Integer =  5% : Dim ed  as Double : ed  = 0#
//  Const R_kd    as Integer =  6% : Dim kd  as Double : kd  = 0#
//  Const R_esd   as Integer =  7% : Dim esd as Double : esd = 0#

//  Const R_mun   as Integer =  8% : Dim mun as Double : mun = 0#
//  Const R_muv   as Integer =  9% : Dim muv as Double : muv = 0#
//  Const R_muh   as Integer = 10% : Dim muh as Double : muh = 0#

//  Const R_kuv   as Integer = 11% : Dim kuv as Double : kuv = 0#
//  Const R_kuh   as Integer = 12% : Dim kuh as Double : kuh = 0#

//  Const R_au    as Integer = 13% : Dim au  as Double : au  = 0#

//  Const R_z0v   as Integer = 14% : Dim z0v as Double : z0v = 0#
//  Const R_z0h   as Integer = 15% : Dim z0h as Double : z0h = 0#

//  Dim R( R_z0h - 1% , 0% ) as Double

//  ed  = e( gd , nud )
//  kd  = k( gd , nud )
//  esd = es( gd , nud )
 
//  au  = ( ru * ru * Pi() )

//  mun = 0#

//  If( nud > (1# / 3#) ) Then  mun = ( 2.4# * rho * au * ru * (nud - (1# / 3#)) )

//  muv = ( mu + mun )
//  muh = mu
  
//  z0v = ( ((ru * Pi()) / 4#) * (1# - nud) * (ed / gd) )
//  z0h = ( ((ru * Pi()) / 8#) * (2# - nud) )

//  kuv = ( (au * ed) / z0v )
//  kuh = ( (au * gd) / z0h )

//  duv = ( (au * SQR( rho * ed )) / (2# * SQR( kuv * muv )) )
//  duh = ( (au * SQR( rho * gd )) / (2# * SQR( kuh * muh )) )

//  fuv = ( (1 / (2# * Pi())) * SQR( (1# - (duv * duv)) * (kuv / muv) ) )
//  fuh = ( (1 / (2# * Pi())) * SQR( (1# - (duh * duh)) * (kuh / muh) ) )

//  R( R_fuv , 1%  ) = fuv
//  R( R_fuh , 1%  ) = fuh
  
//  R( R_duv , 1%  ) = duv
//  R( R_duh , 1%  ) = duh

//  R( R_ed  , 1%  ) = ed
//  R( R_kd  , 1%  ) = kd
//  R( R_esd , 1%  ) = esd

//  R( R_mun , 1%  ) = mun
//  R( R_muv , 1%  ) = muv
//  R( R_muh , 1%  ) = muh

//  R( R_kuv , 1%  ) = kuv
//  R( R_kuh , 1%  ) = kuh
  
//  R( R_au  , 1%  ) = au
  
//  R( R_z0v , 1%  ) = z0v
//  R( R_z0h , 1%  ) = z0h

  var r = [ [1] , [2] , [3] ];

  return r;

 }; // end function repile


function m( f2 , f1 , m2 , m1 )
 {

  return ( 1.0 + (2.0 * (Math.log( f2 / f1 ) / Math.log( m2 / m1 ))) );

 }; // end function m


function d( rho , r0 , nu , m )
 {

  return ( (rho * Math.pow( r0 , 3.0 ) * Math.pow( Math.PI , 2.0 ) * Math.pow( 1.0 - nu , 2.0) ) / (8.0 * m) );

 }; // end function m


function md( f2 , f1 , m2 , m1 , rho , r0 , nu )
 {

  var d1 = Math.sqrt( 1.0 - Math.pow( d( rho , r0 , nu , m1 ) , 2.0 ) );
  var d2 = Math.sqrt( 1.0 - Math.pow( d( rho , r0 , nu , m2 ) , 2.0 ) );

  return ( 1.0 + (2.0 * (Math.log( (f2 * d1) / (f1 * d2) ) / Math.log( m2 / m1 ))) );

 }; // end functino md


function gq( gr , m , qqr , qqx )
 {

  return ( gr * (qqr ^ m) * Math.pow( (1.0 - qqx) , 2.0 ) );

 }; // end function ' gq


function nuq( nur , qqx )
 {

  var nux = ( 1.0 / 2.0 );

  return ( nux - ((nux - nur) * Math.pow( (1.0 - qqx) , 2.0) ) );

 }; // end function ' nuq


function e( g , nu )
 {

  return ( 2.0 * g * (1.0 + nu) );

 }; // end function e


function k( g , nu )
 {

  return ( e( g , nu ) / (3.0 * (1.0 - (2.0 * nu))) );

 }; // end function ' k


function es( g , nu )
 {

  return ( k( g , nu ) + ((4.0 / 3.0) * g) );

 }; // end function ' es


// ************************************************************
//
// Function to calculate the estimated value of e
//
// ************************************************************

function eest( f , m , r0 , nu )
 {

  return ( (2.0 * Math.pow( Math.PI , 2.0 ) * m * Math.pow( f , 2.0 ) * (1.0 - Math.pow( nu , 2.0 ))) / r0 );

 }; // End Function ' Eest

