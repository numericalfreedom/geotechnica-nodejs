/**
 * @file boussinesq.js
 *
 * Boussinesq solution of single vertical force on half-space
 * 
 * @author Dr.Nandor Tamaskovics
 *         http://numericalfreedom.com
 *         numericalfreedom@googlemail.com
 *
 */


/**
 *
 * Module boussinesq implements ...
 *
 * @module boussinesq
 *
 */

module.exports = { 'ifz': ifz }


/**
 *
 * Boussinesq solution of single vertical force on half-space
 *
 * @function ifz
 *
 */


function ifz( x , y , z , n )
 {

  const c_szz   = 0;
  const c_sxx   = 1;
  const c_syy   = 2;
  const c_sxy   = 3;
  const c_sxz   = 4;
  const c_syz   = 5;

  const c_ux    = 6;
  const c_uy    = 7;
  const c_uz    = 8;

  const r_r     = 1;
  const r_rr    = 9;
  
  var   x2      = ( x * x );
  var   y2      = ( y * y );
  var   z2      = ( z * z );
  var   z3      = ( z * z2 );
  
  var   r00     = 0;

  var   r02     = ( x2 + y2 + z2 );
  var   r0      = Math.sqrt( r02 );
  var   r03     = ( r0  * r02 );
  var   r05     = ( r02 * r03 );
  var   r0z     = 0;
  var   rr0z    = 0;
  
  var   if0     = 0;
  var   if1     = ( (3 * z2) / (2 * Math.PI) );

  var   if2     = 0;
  var   if3     = 0; 
  var   if4     = 0; 
  var   if5     = 0;
  var   ifc     = 0;
  var   ifs     = 0;

  var   ur      = 0;

  var   r       = undefined;
  var   rr      = undefined;

  if( n )  r = new Array( r_rr );  else  r = new Array( r_r );

  rr = new Array( 1 );
  
  rr[0] = r;

  if( n ) 
   {
 
    r00  = Math.sqrt( x2 + y2 );

    r0z  = ( r0 + z );
    rr0z = ( (2 * r0) + z );
 
    if0  = ( 1 - (2 * n) );

    if2  = ( 1 / (r0 * r0z) );
    if3  = ( rr0z / (r03 * r0z * r0z) );
    if4  = ( 1 / (4 * Math.PI * r0) );
    if5  = ( if0 / 3 );

    if( r00 > 0 )  ifc = ( x / r00 );  else  ifc = 1;
    if( r00 > 0 )  ifs = ( y / r00 );  else  ifs = 0;

    r[c_sxx] = ( if1 * (((x2 * z) / r05) + (if5 * (if2 - (if3 * x2) - (z / r03)))) );
    r[c_syy] = ( if1 * (((y2 * z) / r05) + (if5 * (if2 - (if3 * y2) - (z / r03)))) );
  
    r[c_sxy] = ( if1 * (((x * y * z) / r05) - (if5 * if3 * x * y)) );
    r[c_sxz] = ( if1 * ((x * z2) / r05) );
    r[c_syz] = ( if1 * ((y * z2) / r05) );

    ur  = ( if4 * (((r00 * z) / r02) - ((if0 * r00) / r0z)) );

    r[c_ux]  = ( ifc * ur );
    r[c_uy]  = ( ifs * ur );
    r[c_uz]  = ( if4 * (1 + if0 + (z2 / r02)) );

   }; // end if -

  r[c_szz] = ( if1 * (z3 / r05) );

  return( rr );
  
 }; // end function ' ifz() : Boussinesq elementary solution for unit force in z direction



function ifza( x , y , z , n )
 {
  
  const c_szz     = 0;
  const c_sxx     = 1;
  const c_syy     = 2;
  const c_sxy     = 3;
  const c_sxz     = 4;
  const c_syz     = 5;

  const c_ux      = 6;
  const c_uy      = 7;
  const c_uz      = 8;

  const c_rr      = 9;
  
  var   ifs2      = 0;
  var   ifc2      = 0;

  var   ifs       = 0;
  var   ifc       = 0;

  var   if2s      = 0;
  var   if2c      = 0;

  var   x2        = ( x * x );
  var   y2        = ( y * y );
  var   z2        = ( z * z );

  var   r002      = 0;
  var   r00       = 0;

  var   r02       = ( x2 + y2 + z2 );
  var   r0        = Math.sqrt( r02 );
  var   r03       = 0;

  var   r1        = ( z / r0 );
  var   r12       = ( r1 * r1 );
  var   r15       = ( r1 * r1 * r1 * r12 );

  var   rz        = 0;
  var   rz2       = 0;
  var   rrz       = 0;
  
  var   ur        = 0;

  var   if0       = 0;
  var   if1       = 0;
  var   if2       = 0;
  var   if3       = 0;
  var   if4       = 0;
  var   if5       = 0;
  var   if6       = ( (3 * r15) / (2 * Math.PI) );

  var   r         = undefined;
  var   rr        = new Array( c_rr );

  r = if6;

  if( n ) 
   {

    r002 = ( x2 + y2 );
    r00  = Math.sqrt( r002 );

    r03  = ( r0 * r02 );

    rz   = ( r0 + z );
    rz2  = ( rz * rz );
    rrz  = ( r0 / rz );

    if( r00 > 0 )  ifc = ( x / r00 );  else  ifc = 1;
    if( r00 > 0 )  ifs = ( y / r00 );  else  ifs = 0;

    ifc2 = ( ifc * ifc );
    ifs2 = ( ifs * ifs );

    if2c = ( ifc2 - ifs2 );
    if2s = ( 2 * ifs * ifc );

    if0  = ( 1 - (2 * n) );

    if1  = ( (3 * z) / r03 );
    if2  = ( r12 / (2 * Math.PI) );
    if3  = ( if0 / 2 );
    if4  = ( 2 * rrz );
    if5  = ( 1 / (4 * Math.PI * r0) );
 
    rr[c_sxx] = ( if2 * ((if1 * x2) - (if0 * ((r1 * ifs2) + (rrz * if2c)))) );
    rr[c_syy] = ( if2 * ((if1 * y2) - (if0 * ((r1 * ifc2) - (rrz * if2c)))) );
    rr[c_szz] = if6;
    
    rr[c_sxy] = ( if2 * ((if1 * x * y) + (if3 * (r1 - if4) * if2s)) );
    rr[c_sxz] = ( if6 * (x / z) );
    rr[c_syz] = ( if6 * (y / z) );

    ur   = ( if5 * (((r00 * z) / r02) - ((if0 * r00) / rz)) );

    rr[c_ux]  = ( ur * ifc );
    rr[c_uy]  = ( ur * ifs );
    rr[c_uz]  = ( if5 * (1 + if0 + r12) );

    r = rr;

   }; // end if -
  
  return( r );

 }; // end function ' ifza() : bousMath.sinesq elementary solution for unit force in z direction (alternative formulation)
