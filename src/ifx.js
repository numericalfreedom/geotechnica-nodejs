/**
 * @module cerruti
 *
 */

module.exports = { 'ifx': ifx }


/**
 * @function ifx
 *
 *
*/

function ifx( x , y , z , n )
 {

/**
 *
 * Stress szz component index
 * @const {number} c_szz i
 *
 */
 
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


/**
 * x*x value
 * @var {number} x2
 *
 */

  var   x2      = ( x * x );
  var   y2      = ( y * y );
  var   z2      = ( z * z );

  var   r0      = Math.sqrt( x2 + y2 + z2 );
  var   r02     = ( r0 * r0 );
  var   r03     = 0;

  var   r1      = ( z / r0 );
  var   r13     = ( r1 * r1 * r1 );
  var   r15     = ( r1 * r1 * r13 );

  var   rz      = 0;
  var   rz2     = 0;
  var   rrz     = 0;
 
  var   if0     = 0;
  var   if1     = 0;
  var   if2     = 0;
  
  var   if3     = 0;
  var   if4     = 0;
  var   if5     = 0;
  var   if6     = ( (3 * r15) / (2 * Math.PI) );

  var   r       = undefined;
  var   rr      = undefined;

  if( n )  r = new Array( r_rr ); else  r = new Array( r_r );

  rr = new Array( 1 );
  
  rr[0] = r;
  
  if( n ) 
   {
   
    r03  = ( r0 * r02 );

    rz   = ( r0 + z );
    rz2  = ( rz * rz );
    rrz  = ( r0 / rz );

    if0  = ( 1 - (2 * n) );

    if1  = ( 3 / r02 );
    if2  = ( if0 / rz2 );
    if3  = ( (2 * r0) / rz );
    if4  = ( r13 / (2 * Math.PI) );
    if5  = ( 1 / (4 * Math.PI * r0) );

    r[c_sxx] = ( if4 * (x / z) * ((if1 * x2) - (if2 * (r02 - y2 - (if3 * y2)))) );
    r[c_syy] = ( if4 * (x / z) * ((if1 * y2) - (if2 * ((3 * r02) - x2 - (if3 * x2)))) );

    r[c_sxy] = ( if4 * (y / z) * ((if1 * x2) + (if2 * (r02 - x2 + (if3 * x2)))) );
    r[c_sxz] = ( if6 * (x2 / z2) );
    r[c_syz] = ( if6 * ((x * y) / z2) );

    r[c_ux]  = ( if5 * (1 + (x2 / r02) + (if0 * (rrz - (x2 / rz2)))) );
    r[c_uy]  = ( if5 * (((x * y) / r02) - (if0 * ((x * y) / rz2))) );
    r[c_uz]  = ( if5 * (((x * z) / r02) + (if0 * (x / rz))) );

   }; // end if -

  r[c_szz] = ( if6 * (x / z) )

  return( rr );

 }; // end function ' ifx() : Cerruti elementary solution for unit force in x direction

