/**
 * @fileOverview Matrix class definitions.
 *
 * This is the FleX project.
 *
 * @author       Numericalfreedom Foundation <numericalfreedom@googlemail.com>
 *
 * @version      0.0.1
 *
 * @module       Matrix
 * 
 * @exports      c_asm
 * @exports      c_smt
 * 
 */


"use strict" ;


module.exports = { Matrix , MatrixF , MatrixLT , MatrixUT , idxLT }


/** Function tpd()
 *
 *
 */

function tpd( i )
 {

  return( (i * (i + 1)) / 2 ) ;

 } ; // end function tpd()


/** Function tmd()
 *
 *
 */

function tmd( i )
 {

  return( (i * (i - 1)) / 2 ) ;

 } ; // end function tmd()



/** @classdesc  Matrix operation on full matrix
 *  @class
 *
 *  @author     Numericalfreedom Foundation <numericalfreedom@googlemail.com>
 *  
 *  @param    { number }    nr               Number of rows
 *  @param    { number }    nc               Number of columns
 *  @param    { number }    nv               Number of values
 *  @param    { Array }     v                Value vector
 *
 */

function MatrixF( nr , nc , nl , nu , nv , v )
 {

  let i   = undefined ;
  let ix  = undefined ;
  let nrl = undefined ;
  let ncu = undefined ;
  let nlu = undefined ;
  let nlv = undefined ;
  let nuv = undefined ;
  let nt  = undefined ;
  let nb  = undefined ; 
  let ntv = undefined ;
  let nbv = undefined ;
  let nlt = undefined ;
  let nub = undefined ;


  if( ! nl )  nl = ( nr - 1 ) ;
  if( ! nu )  nu = ( nc - 1 ) ;


  if( ! nv )  nv = ( nr * nc ) ;

  if( nr == nc )  nv -= ( tmd( ml = (nr - nl) ) + tmd( mu = (nr - nu) ) ) ;


  let vv = undefined ;

  if( v === undefined )

    for( vv = new Array( nv ) , i = 0;  i < nv;  vv[i++] = 0.0 ) ;

  else
   {

    if( v === null )

      vv = new Array( 0 ) ;

    else

      if( v && (ix = v.length) && (ix = ((ix < nv) ? ix : nv)) )

        for( vv = new Array( nv ) , i = 0;  i < ix;  vv[i] = v[i++] ) ;

   } ; // end else -


  let nd = 0 ;

  if(  (nr == 2) && (nc == 2)  && (nv == 3) )  d = 1 ;

  if( ((nr == 3) && (nc == 3)) && ((nv == 4) || (nv == 6)) )  d = 2 ;


  this.nr  = nr  ;
  this.nc  = nc  ;
  this.nv  = nv  ;
  this.v   = vv  ;
  this.nl  = nl  ;
  this.nu  = nu  ;
  this.nlv = nlv ;
  this.nuv = nuv ;
  this.nd  = nd  ;

  this.cmd = cmd ;
  this.cmm = cmm ;
  this.crt = crt ;
  this.csd = csd ;
  this.csm = csm ;
  this.cst = cst ;
  this.dmm = dmm ;
  this.dvt = dvt ;
  this.enm = enm ;
  this.eqt = eqt ;
  this.evj = evj ;
  this.evl = evl ;
  this.gvv = gvv ;
  this.i21 = i21 ;
  this.i22 = i22 ;
  this.i31 = i31 ;
  this.i32 = i32 ;
  this.i33 = i33 ;

  this.idx = idxRF ;
  this.inv = inv ;
  this.j32 = j32 ;
  this.j33 = j33 ;
  this.mdt = mdt ;
  this.mma = mma ;
  this.mms = mms ;
  this.mmd = mmd ;
  this.mmt = mmt ;
  this.msa = msa ;
  this.msd = msd ;
  this.mss = mss ;
  this.mst = mst ;
  this.pvv = pvv ;
  this.smd = smd ;
  this.smm = smm ;
  this.srt = srt ;
  this.sum = sum ;
  this.tfm = tfm ;
  this.tms = tms ;
  this.tma = tma ;
  this.trc = trc ;
  this.tsp = tsp ;
  this.unt = unt ;
  this.val = val ;
  this.vmd = vmd ;
  this.vmm = vmm ;
  this.xmm = xmm ;
 
  return ;

 } ; // end function MatrixF

 
/** @classdesc  Matrix operations
 *  @class
 *
 *  @author     Numericalfreedom Foundation <numericalfreedom@googlemail.com>
 *  
 *  @param    { number }    nr               Number of rows
 *  @param    { number }    nc               Number of columns
 *  @param    { number }    nv               Number of values
 *  @param    { Array }     v                Value vector
 *
 *  @property { number }    {Matrix}.nr      Number of rows
 *  @property { number }    {Matrix}.nc      Number of columns
 *  @property { number }    {Matrix}.nv      Number of values
 *  @property { Array  }    {Matrix}.v       Vector of values
 *  @property { number }    {Matrix}.d       Index difference for sparse representation
 *  @property { function }  {Matrix}.idx     Index function
 *  @property { function }  {Matrix}.cmd     cmd function
 *  @property { function }  {Matrix}.cmm     function
 *  @property { function }  {Matrix}.crt     function
 *  @property { function }  {Matrix}.csd     function
 *  @property { function }  {Matrix}.csm     function
 *  @property { function }  {Matrix}.cst     function
 *  @property { function }  {Matrix}.dmm     function
 *  @property { function }  {Matrix}.dvt     function
 *  @property { function }  {Matrix}.enm     function
 *  @property { function }  {Matrix}.eqt     function
 *  @property { function }  {Matrix}.evj     function
 *  @property { function }  {Matrix}.evl     function
 *  @property { function }  {Matrix}.gvv     function
 *  @property { function }  {Matrix}.i21     function
 *  @property { function }  {Matrix}.i22     function
 *  @property { function }  {Matrix}.i31     function
 *  @property { function }  {Matrix}.i32     function
 *  @property { function }  {Matrix}.i33     function
 *  @property { function }  {Matrix}.idx     function
 *  @property { function }  {Matrix}.inv     function
 *  @property { function }  {Matrix}.j32     function
 *  @property { function }  {Matrix}.j33     function
 *  @property { function }  {Matrix}.mdt     function
 *  @property { function }  {Matrix}.mma     function
 *  @property { function }  {Matrix}.mms     function
 *  @property { function }  {Matrix}.mmd     function
 *  @property { function }  {Matrix}.mmt     function
 *  @property { function }  {Matrix}.msa     function
 *  @property { function }  {Matrix}.msd     function
 *  @property { function }  {Matrix}.mss     function
 *  @property { function }  {Matrix}.mst     function
 *  @property { function }  {Matrix}.pvv     function
 *  @property { function }  {Matrix}.smd     function
 *  @property { function }  {Matrix}.smm     function
 *  @property { function }  {Matrix}.srt     function
 *  @property { function }  {Matrix}.sum     function
 *  @property { function }  {Matrix}.tfm     function
 *  @property { function }  {Matrix}.tms     function
 *  @property { function }  {Matrix}.tma     function
 *  @property { function }  {Matrix}.trc     function
 *  @property { function }  {Matrix}.tsp     function
 *  @property { function }  {Matrix}.unt     function
 *  @property { function }  {Matrix}.val     function
 *  @property { function }  {Matrix}.vmd     function
 *  @property { function }  {Matrix}.vmm     function
 *  @property { function }  {Matrix}.xmm     function
 *
 *  @returns  { Object }                   Matrix  object
 *
 *
 */

function Matrix( nr , nc , nv , v )
 {

  let i  = undefined ;
  let ix = undefined ;

  if( ! nv )  nv = ( nr * nc ) ;
  
  let vv = undefined ;

  if( v === undefined )

    for( vv = new Array( nv ) , i = 0;  i < nv;  vv[i++] = 0.0 ) ;

  else
   {
  
    if( v === null )
  
      vv = new Array( 0 ) ;

    else

      if( v && (ix = v.length) && (ix = ((ix < nv) ? ix : nv)) )

        for( vv = new Array( nv ) , i = 0;  i < ix;  vv[i] = v[i++] ) ;

   } ; // end else -


  let nd = 0 ;

  if(  (nr == 2) && (nc == 2)  && (nv == 3) )  nd = 1 ;

  if( ((nr == 3) && (nc == 3)) && ((nv == 4) || (nv == 6)) )  nd = 2 ;


  this.nr  = nr ;
  this.nc  = nc ;
  this.nv  = nv ;
  this.v   = vv ;
  this.nd  = nd ;

  this.cmd = cmd ;
  this.cmm = cmm ;
  this.crt = crt ;
  this.csd = csd ;
  this.csm = csm ;
  this.cst = cst ;
  this.dmm = dmm ;
  this.dvt = dvt ;
  this.enm = enm ;
  this.eqt = eqt ;
  this.evj = evj ;
  this.evl = evl ;
  this.gvv = gvv ;
  this.i21 = i21 ;
  this.i22 = i22 ;
  this.i31 = i31 ;
  this.i32 = i32 ;
  this.i33 = i33 ;


  this.idx = idxLT ;
  this.inv = inv ;
  this.j32 = j32 ;
  this.j33 = j33 ;
  this.mdt = mdt ;
  this.mma = mma ;
  this.mms = mms ;
  this.mmd = mmd ;
  this.mmt = mmt ;
  this.msa = msa ;
  this.msd = msd ;
  this.mss = mss ;
  this.mst = mst ;
  this.pvv = pvv ;
  this.smd = smd ;
  this.smm = smm ;
  this.srt = srt ;
  this.sum = sum ;
  this.tfm = tfm ;
  this.tms = tms ;
  this.tma = tma ;
  this.trc = trc ;
  this.tsp = tsp ;
  this.unt = unt ;
  this.val = val ;
  this.vmd = vmd ;
  this.vmm = vmm ;
  this.xmm = xmm ;
  
  return ;

 } ; // end function Matrix


/** Function cev()
 *
 *  Eigenvalue and eigenvector check
 *
 *  Eigenvectors and eigenvalues are in columns of input matrix
 *
 */


function cev( x )
 {

  let i   = undefined ;
  let j   = undefined ;
  let k   = undefined ;
  
  let s   = undefined ;

  let evc = x.nr ;

  let r   = new Array( x.nv ) ;


  for( i = 0;  i < x.nr; ++i )
  
    for( j = 0;  j < x.nr; r[ x.idx( i , j ) ] = s , ++j )

       for( s = 0 , k = 0;  k < x.nr; ++k )

//       s += ( x.v[ x.idx( k , i ) ] * x.v[ x.idx( k , j ) ] ) ;

         s += ( x.v[ x.idx( k , i ) ] * x.v[ x.idx( k , evc ) ] * x.v[ x.idx( k , j ) ] ) ;


  return( r ) ;

 } ; // end function cev() 



/** Cholesky decomposition
 *
 *
 *
 */

function cdc()
 {

  let i  = undefined ;
  let j  = undefined ;
  let k  = undefined ;
  let s  = undefined ;
  let vi = undefined ;

  for( i = 0 ; i < this.nr ; i++ )

    for( j = 0 ; j <= i ; ++j )
     {

      for( s = k = 0 ; k < j ; s += (this.v[ this.idx( i , k ) ] * this.v[ this.idx( j , k++ ) ]) ) ;

      if( i == j )
       {

        // Diagonal element:

        vi = this.idx( i , i ) ;

        this.v[ vi ] = Math.sqrt( this.v[ vi ] - s ) ;

       } // end if +

      else
       {

        // Outer diagonal element:

        vi = this.idx( i , j ) ;

        this.v[ vi ] = ( (this.v[ vi ] - s) / this.v[ this.idx( j , j ) ] ) ;

       } ; // end else 

     } ; // end for()

 } ; // end function cdc()



/** Function cmd
 *
 *
 */

function cmd( c , x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( c )

      this.v[ i ] = ( x.v[ i ] / c ) ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function cmd()



/** Function cmm
 *
 *
 */

function cmm( c , x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( c * x.v[ i++ ] ) ) ;

  return ;

 } ; // end function cmm()



/** Function crt
 *
 *  Root of a cubic polynomial equation
 *
 *  x*x*x + a*x*x + b*x + c = 0
 */

function crt( a , b , c )
 {

  let p   = ( ((3 * b) - (a * a)) / 9 ) ;
  let q   = ( (((2 * a * a * a) / 27) - ((a * b) / 3) + c) / 2 ) ;
  let d   = ( (p * p * p) + (q * q) ) ;

  let w1  = undefined ;
  let w2  = undefined ;
  let u   = undefined ;
  let v   = undefined ;
  let phi = undefined ;
  let r1  = undefined ;
  let r2  = undefined ;
  let r3  = undefined ;
  let r4  = undefined ;
  let r5  = undefined ;
  let r6  = undefined ;


  if( d >= 0 )
   {


    w1 = ( (- q) + Math.sqrt( d ) ) ;

    w2 = ( (- q) - Math.sqrt( d ) ) ;


    if( Math.abs( w1 ) > 0.0 )

      u = ( Math.floor( Math.abs( w1 ) / w1 ) * Math.pow( Math.abs( w1 ) , (1 / 3) ) ) ;

    else

      u = 0.0 ;


    if( Math.abs( w2 ) > 0.0 )

      v = ( Math.floor( Math.abs( w2 ) / w2 ) * Math.pow( Math.abs( w2 ) , (1 / 3) ) ) ;

    else

      v = 0.0 ;


//  First root:

    r1 = ( u + v - (a / 3) ) ;

    r2 = 0.0 ;


//  Second root:
  
    r3 = (- ((u + v) / 2) - (a / 3) ) ;

    r4 = (  ((u - v) / 2) * Math.sqrt( 3 ) ) ;


// Third root:

    r5 = (- ((u + v) / 2) - (a / 3) ) ;

    r6 = (- ((u - v) / 2) * Math.sqrt( 3 ) ) ;


   }  // end if{} +


  else
   {

    q = ( (- q) / Math.sqrt( Math.abs( p * p * p ) ) )
 
    if( q == (- 1) )

      phi = Math.PI ;

    else

      phi = ( (Math.PI / 2) - Math.atan2( q , Math.sqrt( 1 - (q * q) ) ) ) ;

    q  = ( 2 * Math.sqrt( Math.abs( p ) ) ) ;


    r1 = (    (q * Math.cos(  phi            / 3 ))  - (a / 3) ) ;

    r2 = 0.0 ;


    r3 = ( (- (q * Math.cos( (phi + Math.PI) / 3 ))) - (a / 3) ) ;

    r4 = 0.0 ;


    r5 = ( (- (q * Math.cos( (phi - Math.PI) / 3 ))) - (a / 3) ) ;

    r6 = 0.0 ;


   } // end if{} +


  return( [ r1 , r2 , r3 , r4 , r5 , r6 ] ) ;


 } ; // end function crt()



/** Function csd
 *
 *
 */

function csd( c )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( c )

      this.v[ i ] /= c ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function csd()



/** Function csm
 *
 *
 */

function csm( c )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] *= c , ++i ) ;

  return ;

 } ; // end function csm()



/** Function cst
 *
 *
 */

function cst( s )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i++ ] = s ) ;

  return ;

 } ; // end function cst()



/** Function dmm
 *
 *
 */

function dmm( x , y )
 {

  let i = undefined ;
  let r = undefined ;

  for( r = i = 0; i < this.nv; ++i )

    r += this.v[ i ] = ( x.v[ i ] * y.v[ i ] ) ;

  return( r ) ;

 } ; // end function dmm()



/** Function dvt
 *
 *
 */

function dvt()
 {

  let i = undefined ;
  let t = undefined ;

  if( this.nd )
   {
	   
    for( t = 0 , i = 0;  i < this.nc;  t += this.v[ i++ ] ) ;

    for( i = this.nc; i < this.nv; this.v[ i ] -= t , ++i ) ;

   } // end if{} +

  else
   {
	   
    for( t = 0 , i = 0;  i < this.nc;  t += this.v[ this.idx( i , i++ ) ] ) ;
	   	   
    for( i = 0;  i < this.nr;  ++i )

      for( j = 9;  j < this.nc;  ++j )

        if( i != j )  this.v[ this.idx( i , j ) ] -= t ;

   } // end else -

  return( t ) ;

 } ; // end function dvt()



/** Function enm
 *
 *
 */

function enm( x )
 {

  let i = undefined ;
  let r = undefined ;
  let v = undefined ;

  for( i = r = 0; i < this.nv; v = this.v[ i++ ] , r += (v * v)  ) ;

  return( Math.sqrt( r ) ) ;

 } ; // end function enm()



/** Function eqt
 *
 *
 */

function eqt( x )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = x.v[ i++ ] ) ;

  return ;

 } ; // end function eqt()



/** Function evj()
*
*   Generalized eigenvalue and eigenvector calculation
*/


function evj( x , ne , en )
 {

  const evc = ( this.nc - 1 ) ;

  if( ! en )  en = 1.0e-8 ;
  if( ! ne )  ne = 100 ;

  let se    = undefined ;

  let i     = undefined ;
  let j     = undefined ;
  let k     = undefined ;
  let n     = undefined ;

  let lij   = undefined ;
  let p     = undefined ;
  let sp    = undefined ;
  let ps    = undefined ;

  let ip    = undefined ;
  let jq    = undefined ;

  let c     = undefined ;
  let s     = undefined ;

  let w     = undefined ;
  let t     = undefined ;
  let tt    = undefined ;

  let vipk  = undefined ;
  let vjqk  = undefined ;

  let xipip = undefined ;
  let xjqjq = undefined ;
  let xipjq = undefined ;

  let xipk  = undefined ;
  let xjqk  = undefined ;
  
  let evn   = undefined ;
  
  let evv   = new Array( x.nv ) ;


  for( i = 0;  i < x.nv;  evv[ i ] = x.v[ i++ ] ) ;


  if( ! this.nd )

    for( i = 0;  i < this.nr;  this.v[ this.idx( i , i++ ) ] = 1 )
  
      for( j = 0;  j < this.nr;  this.v[ this.idx( i , j++ ) ] = 0 ) ;


  for( se = 1 , n = 0; (n < ne) && (Math.abs( se ) > en); ++n )
   {

    for( ip = 0;  (ip < (x.nr - 1));  ++ip )

      for( jq = (ip + 1);  (jq < x.nr);  ++jq )
       {

        xipip = evv[ x.idx( ip , ip ) ] ;
        xjqjq = evv[ x.idx( jq , jq ) ] ;
        xipjq = evv[ x.idx( ip , jq ) ] ;

        if( xipjq )
         {

          w = ( (xjqjq - xipip) / (2 * xipjq) ) ;

          [ t , s , tt , c ] = srt( (2 * w) , (- 1) ) ;

          if( Math.abs( t ) > Math.abs( tt ) )  t = tt ;


          tt = ( t * t );

          s  = ( t / Math.sqrt( 1 + tt ) ) ;

          c  = ( 1 / Math.sqrt( 1 + tt ) );

          tt = ( s / (1 + c) ) ;


          evv[ x.idx( ip , ip ) ] = ( xipip - (t * xipjq) ) ;

          evv[ x.idx( jq , jq ) ] = ( xjqjq + (t * xipjq) ) ;

          evv[ x.idx( ip , jq ) ] = 0 ;

          evv[ x.idx( jq , ip ) ] = 0 ;


          if( ! x.d )
           {

            
            for( k = 0;  k < x.nc;  ++k )
             {

              if( (k != ip) && (k != jq) )
               {

                xipk = evv[ x.idx( ip , k ) ] ;

                xjqk = evv[ x.idx( jq , k ) ] ;

                evv[ x.idx( ip , k ) ] = ( xipk - (s * (xjqk + (tt * xipk))) ) ;

                evv[ x.idx( jq , k ) ] = ( xjqk + (s * (xipk - (tt * xjqk))) ) ;

               } ; // end if{} -


             } ; // end for()


            for( k = 0;  k < x.nr;  ++k )
             {

              if( (k != ip) && (k != jq) )
               {

                xipk = evv[ x.idx( k , ip ) ] ;

                xjqk = evv[ x.idx( k , jq ) ] ;

                evv[ x.idx( k , ip ) ] = ( xipk - (s * (xjqk + (tt * xipk))) ) ;

                evv[ x.idx( k , jq ) ] = ( xjqk + (s * (xipk - (tt * xjqk))) ) ;

               } ; // end if{} -


             } ; // end for()


           } ; // end if{} -


          if( ! this.nd )

            for( k = 0;  k < this.nr;  ++k )
             {             

              vipk = this.v[ this.idx( ip , k ) ] ;

              vjqk = this.v[ this.idx( jq , k ) ] ;

              this.v[ this.idx( ip , k ) ] = ( (c * vipk) - (s * vjqk) ) ;

              this.v[ this.idx( jq , k ) ] = ( (s * vipk) + (c * vjqk) ) ;

             } ; // end if{}-


         } ; // end if{} -


        // console.log( 'n=' , n , 'ip=' , ip , 'jq=' , jq , 'evv=' , evv ) ;


       } ; // end for()


    for( se = 0 , i = 0;  i < x.nr;  ++i )

      for( j = (i + 1);  j < x.nc;  se += Math.abs( evv[ x.idx( i , j++ ) ] ) ) ;


    for( i = 0;  i < this.nr;  ++i )

      this.v[ this.idx( i , evc ) ] = evv[ x.idx( i , i ) ] ;


   } ; // end for()


  return( n ) ;


 } ; // end function evj()



/** Function evl
 *
 *
 */

function evl( x )
 {

  const eps = 1.0e-8 ;

  let i    = undefined ;
  let j    = undefined ;
  let k    = undefined ;

  let a    = undefined ;
  let b    = undefined ;
  let c    = undefined ;
  let d    = undefined ;
  let e    = undefined ;
  let f    = undefined ;

  let lbd  = undefined ;
  let ldm  = undefined ;

  let lda  = undefined ; 
  let ldb  = undefined ; 
  let ldc  = undefined ; 

  let ld   = undefined ;
  let lds  = null ;

  let iv21 = undefined ;
  let iv22 = undefined ;

  let iv31 = undefined ;
  let iv32 = undefined ;
  let iv33 = undefined ;

  let ivs  = null ;

  let ev0  = undefined ;
  let ev1  = undefined ;
  let ev2  = undefined ;

  let evn  = undefined ;

  let cen  = undefined ;

  let lbc  = 0 ;
  let ivc  = 1 ;
  let evc  = 2 ;

  let ald  = undefined ;
  let bld  = undefined ;
  let cld  = undefined ;

  let aald = undefined ;
  let abld = undefined ;
  let acld = undefined ;

  let abd  = undefined ;
  let ace  = undefined ;
  let bcf  = undefined ;

  let aabd = undefined ;
  let aace = undefined ;
  let abcf = undefined ;


  if( (this.nv == 4) || (this.nv == 8) )
   {

    evc  = 2 ;

    iv21 = i21( x ) ;
    iv22 = i22( x ) ;

    [ lda , i , ldb , i ] = srt( iv21 , iv22 ) ;

    lds = [ lda  , ldb  ] ;

    ivs = [ iv21 , iv22 ] ;


    for( i = 0;  i < 2;  this.v[ this.idx( i , lbc = 2 ) ] = lds[i] , this.v[ this.idx( i , ivc = 3 ) ] = ivs[ i++ ] ) ;


    if( this.nv == 8 )
     {

      a = x.v[0] ;
      b = x.v[1] ;
      d = x.v[2] ;

      if( Math.abs( lda - ldb ) < eps )
       {

        ev0 = 0 ;

        ev1 = 1 ;

        this.v[ this.idx( 0 , 2 ) ] = ev0 ;

        this.v[ this.idx( 1 , 2 ) ] = ev1 ;


        this.v[ this.idx( 0 , 2 ) ] = ev1 ;

        this.v[ this.idx( 1 , 2 ) ] = ev0 ;

       } // end if{} +

      else
       {

        ev0 = (- (d / (a - lda)) ) ;

        ev1 = 1 ;

        this.v[ this.idx( 0 , 2 ) ] = ev0 ;

        this.v[ this.idx( 1 , 2 ) ] = ev1 ;

        ev0 = (- (d / (b - ldb)) ) ;

        ev1 = 1 ;

        this.v[ this.idx( 0 , 3 ) ] = ev1 ;

        this.v[ this.idx( 1 , 3 ) ] = ev0 ;

       } ; // end else -

     } ; // if{} +

   } ; // if{} +


  if( (this.nv == 6) || (this.nv == 15) )
   {


    evc  = 3 ;


    iv31 = i31( x ) ;

    iv32 = i32( x ) ;

    iv33 = i33( x ) ;


    [ lda , i , ldb , i , ldc , i ] = crt( (- iv31) , iv32 , (- iv33) ) ;


    lds = [ lda  , ldb  , ldc  ] ;

    ivs = [ iv31 , iv32 , iv33 ] ;


    for( i = 0; i < 3; ++i )
 
      for( j = (i + 1); j < 3; ++j )

        if( lds[i] > lds[j] )
         {

          ld = lds[i] ;

          lds[i] = lds[j] ;

          lds[j] = ld ; 

         } ; // end if{} -


    for( i = 0;  i < 3;  this.v[ this.idx( i , lbc = 3 ) ] = lds[i] , this.v[ this.idx( i , ivc = 4 ) ] = ivs[ i++ ] ) ;


    if( this.nv == 15 )
     {

      a = x.v[0] ;
      b = x.v[1] ;
      c = x.v[2] ;
   
      d = x.v[3] ;

      if( x.nv == 6 )
       {

        e = x.v[4] ;
        f = x.v[5] ;

       } // end if{} +

      else

        e = f = 0 ;


      if( (Math.abs(lda - ldb) < eps) || (Math.abs(ldb - ldc) < eps) || (Math.abs(ldc - lda) < eps) )  ldm = 2 ;  else  ldm = 3 ;

      if( ((Math.abs(lda - ldb) < eps) && (Math.abs(ldb - ldc) < eps) && (Math.abs(ldc - lda) < eps)) || ((Math.abs( d ) < eps) && (Math.abs( e ) < eps) && (Math.abs( f ) < eps)) )  ldm = 1 ;


      switch( ldm )
       {

        default:
        case ( 1 ):

          for( i = 0;  i < 3; ++i )

            for( j = 0;  j < 3; ++j )

              if( i == j )

                this.v[ this.idx( i , j ) ] = 1 ;

              else

                this.v[ this.idx( i , j ) ] = 0 ;

        break ;

        
        case ( 2 ):
        case ( 3 ):
        
          for( i = 0 ;  i < 2;  ++i )
           {


            lbd = lds[ i ] ;


            aabd = Math.abs( abd = ((ald = (a - lbd)) * (bld = (b - lbd)) - (d * d)) ) ;

            aace = Math.abs( ace = ((ald * (cld = (c - lbd))) - (e * e)) ) ;
        
            abcf = Math.abs( bcf = ((bld * cld) - (f * f)) ) ;


            aald = Math.abs( ald ) ;

            abld = Math.abs( bld ) ;

            acld = Math.abs( cld ) ;


            if( aabd > eps )
             {

              ev0 = ( ((d * f) - (bld * e)) / abd ) ;

              ev1 = ( ((d * e) - (ald * f)) / abd ) ;

              ev2 = 1 ;

             } // end if{} +


            else if( aace > eps )
             {

              ev0 = ( ((e * f) - (cld * d)) / ace ) ;

              ev1 = 1 ;

              ev2 = ( ((d * e) - (ald * f)) / ace ) ;

             } // end else if{} +


            else if( abcf > eps )
             {

              ev0 = 1 ;

              ev1 = ( ((e * f) - (cld * d)) / bcf ) ;

              ev2 = ( ((d * f) - (bld * e)) / bcf ) ;

             } // end else if{} +


            else if( aald > eps )
             {

              ev0 = ( (- (d + e)) / ald ) ;

              ev1 = 1 ;

              ev2 = 1 ;

             } // end else if{} +


            else if( abld > eps )
             {

              ev0 = 1 ;

              ev1 = ( (- (d + f)) / bld ) ;

              ev2 = 1 ;

             } // end else if{} +


            else if( acld > eps )
             {

              ev0 = 1 ;
 
              ev1 = 1 ;

              ev2 = ( (- (e + f)) / cld ) ;

             } ; // end else if{} -


            evn = nrm( ev0 , ev1 , ev2 ) ;

            this.v[ this.idx( i , 0 ) ] = ( ev0 / evn ) ;

            this.v[ this.idx( i , 1 ) ] = ( ev1 / evn ) ;

            this.v[ this.idx( i , 2 ) ] = ( ev2 / evn ) ;


           } ; // end for()


          [ this.v[ this.idx( 2 , 0 ) ] , this.v[ this.idx( 2 , 1 ) ] , this.v[ this.idx( 2 , 2 ) ] ] = xpr( this.v[ this.idx( 0 , 0 ) ] , this.v[ this.idx( 0 , 1 ) ] , this.v[ this.idx( 0 , 2 ) ] , this.v[ this.idx( 1 , 0 ) ] , this.v[ this.idx( 1 , 1 ) ] , this.v[ this.idx( 1 , 2 ) ] ) ;


         break ;


       } ; // end switch()


     } ; // end if{}  -


   } ; // end if{}  -


  return ;


 } ; // end function evl()



/** Function gvv
 *
 *
 */

function gvv( v )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; v[ i ] = this.v[ i++ ] ) ;

  return ;

 } ; // end function gvv()



/** Function i21
 *
 */

function i21( x )
 {

  let a = x.v[ 0 ] ;
  let b = x.v[ 1 ] ;

  let r = ( a + b )

  return( r ) ;

 } ; // end function i31() -



/** Function i22
 *
 */

function i22( x )
 {

  let a = x.v[ 0 ] ;
  let b = x.v[ 1 ] ;
  let c = x.v[ 2 ] ;

  let r = ( (a * b) - (c * c) ) ;

  return( r ) ;

 } ; // end function



/** Function i31
 *
 */

function i31( x )
 {

  let a = x.v[ 0 ] ;
  let b = x.v[ 1 ] ;
  let c = x.v[ 2 ] ;

  let r = ( a + b + c )

  return( r ) ;

 } ; // end function i31() -



/** Function i32
 *
 */

function i32( x )
 {

  let a = x.v[ 0 ] ;
  let b = x.v[ 1 ] ;
  let c = x.v[ 2 ] ;

  let d = x.v[ 3 ] ;
  let e = 0 ;
  let f = 0 ;

  if( x.nv == 6 )
   {

    e = x.v[ 4 ] ;
    f = x.v[ 5 ] ;

   } ; // end if{} -

  let r = ( (a * b) + (b * c) + (a * c) - (d * d) - (e * e) - (f * f) ) ;

  return( r ) ;

 } ; // end function



/** Function i33
 *
 */

function i33( x )
 {

  let a = x.v[ 0 ] ;
  let b = x.v[ 1 ] ;
  let c = x.v[ 2 ] ;

  let d = x.v[ 3 ] ;
  let e = 0 ;
  let f = 0 ;
  
  if( x.nv == 6 )
   {
    
    e = x.v[ 4 ] ;
    f = x.v[ 5 ] ;

   } ; // end if{} -

  let r = ( (a * b * c) + (2 * d * e * f) - (a * f * f) - (b * e * e) - (c * d * d) ) ;

  return( r ) ;

 } ; // end function



/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idx( i /*: number*/ , j /*: number*/ ) /*: number*/
 {

  let r = i ;

  if( this.nd )
   {

    if( i - j )  r = ( i + j + this.nd ) ;

   } // end if

  else
   {

    r = ( (i * this.nc) + j ) ;

   } ; // end else

  return( r ) ;

 } ; // end function idx()



/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxLT( i /*: number*/ , j /*: number*/ ) /*: number*/
 {

  let ij = undefined ;
  let r  = undefined ;

  if( i >= j )

    if( (ij = (i - j)) < this.nb ) 

      if( i < this.nb )
    
        r = ( (i * (i+1)) / 2 + j ) ;

      else 

        r = ( this.nbv + (i * this.nb) - ij ) ;

    else

      r = undefined ;

  else

    r = this.idx( j , i ) ;

  return( r ) ;

 } ; // end function idxLT()



/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxRF( i , j )
 {

  return( (i * this.nc) + j ) ;

 } ; // end function idxRF()


/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxCF( i , j )
 {

  return( i + (j * this.nr) ) ;

 } ; // end function idxCF()


/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxRS( i , j )
 {

  return( this.r[i] + j ) ;

 } ; // end function idxRS()


/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxCS( i , j )
 {

  return( i + this.c[j] ) ;

 } ; // end function idxCS()


/**
 *  Index function
 *
 *  @description function index
 *
 *  @param    { number }    i      Number of rows
 *  @param    { number }    j      Number of columns
 */

function idxR( i /*: number*/ , j /*: number*/ ) /*: number*/
 {

  let r = undefined ;

  if( i - j )  r = ( i + j + this.nd ) ;  else  r = i ;

  return( r ) ;
 
 } ; // end function idxR()


/** Function inv
 *
 *
 */

function inv()
 {

  let i   = undefined ;
  let j   = undefined ;
  let k   = undefined ;
  let akk = undefined ;
  let akj = undefined ;
  let aik = undefined ;

  let r = new Matrix( this.nr , this.nc ) ;

  console.log( 'r=' , r ) ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )
      
      if( this.idx( i ,  j ) < this.nv )
        
        r.v[ r.idx( i , j ) ] = this.v[ this.idx( i , j ) ] ;

  for( k = 0;  k < r.nr;  ++k )

    if( akk = r.v[ r.idx( k , k ) ] )
     {

      for( i = 0;  i < r.nc;  ++i )

        for( j = 0;  j < r.nr;  ++j )

          if( (i != k) && (j != k) )
           {

            akj = r.v[ r.idx( k , j ) ] ;

            aik = r.v[ r.idx( i , k ) ] ;

            r.v[ r.idx( i , j ) ] -= ( (akj * aik) / akk ) ;

           } ;

      for( i = 0;  i < r.nc;  ++i )

        if( i != k )

          r.v[ r.idx( i , k ) ] /= (- akk ) ;

      for( j = 0;  j < r.nr;  ++j )

        if( k != j )

          r.v[ r.idx( k , j ) ] /= akk ;

      r.v[ r.idx( k , k ) ] = ( 1.0 / akk ) ;

     } // end if{} +

    else

      r.v[ r.idx( k , k ) ] = undefined ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )
      
      if( this.idx( i ,  j ) < this.nv )
        
        this.v[ this.idx( i , j ) ] = r.v[ r.idx( i , j ) ];

  return ;

 } ; // end function inv()



/** Function j32
 *
 */

function j32( x )
 {

  let r = undefined ;

  let i1 = i31( x )
  let i2 = i32( x )

  r = ( i2 - ((i1 * i1) / 3) ) ;

  return( r ) ;

 } ; // end function j32()



/** Function j33
 *
 */

function j33( x )
 {

  let r = undefined ;

  let i1 = i31( x )
  let i2 = i32( x )
  let i3 = i33( x )

  r = ( ((2 * i1 * i1 * i1) / 27) - ((i1 * i2) / 3) + i3 ) ;

  return( r ) ;

 } ; // end function j33()



/** Function mdt
 *
 *
 */

function mdt( x , y )
 {

  let i  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let ki = undefined ;
  let r  = undefined ;
  let rr = undefined ;

  for( r = 0 , i = 0; i < this.nr; r += rr , ++i )

    if( this.idx( i , i ) < this.nv )

      for( this.v[ this.idx( i , i ) ] = k = 0; k < x.nc; ++k )

        if( ((ik = x.idx( i , k )) < x.nv) && ((ki = y.idx( k , i )) < y.nv) )

          rr = ( this.v[ this.idx( i , i ) ] += (x.v[ ik ] * y.v[ ki ]) );

  return( r ) ;

 } ; // end function mdt()



/** Function mma
 *
 *
 */

function mma( x , y )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( x.v[ i ] + y.v[ i++ ] ) ) ;

  return ;

 } ; // end function mma()



/** Function mmd
 *
 *
 */

function mmd( x , y )
 {

  let i  = undefined ;
  let j  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let kj = undefined ;

  if( this.nd )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( this.v[ this.idx( i , j ) ] = k = 0; k < x.nc; ++k )

            if( ((ik = x.idx( i , k )) < x.nv) && ((kj = y.idx( k , j )) < y.nv) )

              this.v[ this.idx( i , j ) ] += ( x.v[ ik ] * y.v[ kj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( this.v[ this.idx( i , j ) ] = k = 0; k < x.nc; ++k )

          this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , k ) ] * y.v[ y.idx( k , j ) ] );

   }

  return ;

 } ; // end function mmd()



/** Function mms
 *
 *
 */

function mms( x , y )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = ( x.v[ i ] - y.v[ i++ ] ) ) ;

  return ;

 } ; // end function mms()
 
 
 
/** Function mmt
 *
 *
 */

function mmt( x , y , z )
 {

  let i  = undefined ;
  let j  = undefined ;
  let m  = undefined ;
  let n  = undefined ;
  let im = undefined ;
  let mn = undefined ;
  let nj = undefined ;

  if( this.nd )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( this.v[ this.idx( i , j ) ] = m = 0; m < y.nr; ++m )

            for( n = 0; n < y.nc; ++n )

              if( ((im = x.idx( i , m )) < x.nv) && ((mn = y.idx( m , n )) < y.nv) && ((nj = z.idx( n , j )) < z.nv) )

                this.v[ this.idx( i , j ) ] += ( x.v[ im ] * y.v[ mn ] * z.v[ nj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( m = this.v[ this.idx( i , j ) ] = 0; m < y.nr; ++m )

          for( n = 0; n < y.nc; ++n )

            this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , m ) ] * y.v[ y.idx( m , n ) ] * z.v[ z.idx( n , j ) ] );

   }
  
  return( this.trc() ) ;

 } ; // end function mmt()



/** Function msa
 *
 *
 */

function msa( x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] += x.v[ i++ ] ) ;

  return ;

 } ; // end function msa()
 
 
 
/** Function msd
 *
 *
 */

function msd( x )
 {

  let i  = undefined ;
  let j  = undefined ;
  let k  = undefined ;
  let ik = undefined ;
  let kj = undefined ;
  
  if( this.nd )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

            if( ((ik = x.idx( i , k )) < x.nv) && ((kj = x.idx( k , j )) < x.nv) )

              this.v[ this.idx( i , j ) ] += ( x.v[ ik ] * x.v[ kj ] );

   }
  
  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( k = this.v[ this.idx( i , j ) ] = 0; k < x.nc; ++k )

          this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , k ) ] * x.v[ x.idx( k , j ) ] );

   }
  
  return( this.trc() ) ;
 
 } ; // end function msd()



/** Function mss
 *
 *
 */

function mss( x )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] -= x.v[ i++ ] ) ;

  return ;

 } ; // end function mss()



/** Function mst
 *
 *
 */

function mst( x )
 {

  let i  = undefined ;
  let j  = undefined ;
  let m  = undefined ;
  let n  = undefined ;
  let im = undefined ;
  let mn = undefined ;
  let nj = undefined ;

  if( this.nd )
   {

    for( i = 0; i < this.nr; ++i )

      for( j = i; j < this.nc; ++j )

        if( this.idx( i , j ) < this.nv )

          for( m = this.v[ this.idx( i , j ) ] = 0; m < x.nr; ++m )

            for( n = 0; n < x.nc; ++n )

              if( ((im = x.idx( i , m )) < x.nv) && ((mn = x.idx( m , n )) < x.nv) && ((nj = x.idx( n , j )) < x.nv)  )

                this.v[ this.idx( i , j ) ] += ( x.v[ im ] * x.v[ mn ] * x.v[ nj ] );

   }

  else
   {

    for( i = 0; i < this.nr; ++i )

      for( j = 0; j < this.nc; ++j )

        for( m = this.v[ this.idx( i , j ) ] = 0; m < x.nr; ++m )

          for( n = 0; n < x.nc; ++n )

            this.v[ this.idx( i , j ) ] += ( x.v[ x.idx( i , m ) ] * x.v[ x.idx( m , n ) ] * x.v[ x.idx( n , j ) ] );

   }
  
  return( this.trc() ) ;

 } ; // end function mst()



/** Function nrm()
 *
 */

function nrm( a , b , c )
 {

  return( Math.sqrt( (a * a) + (b * b) + (c * c) ) );

 }
 
 

 /** Function pvv
 *
 *
 */

function pvv( v )
 {
  
  let i = undefined ;

  for( i = 0; i < this.nv; this.v[ i ] = v[ i++ ] ) ;

  return ;

 } ; // end function pvv()



/** Function tfm
 *
 *  @description function tfm
 */

function tfm( x )
 {

  let i   = undefined ;
  let j   = undefined ;

  for( i = 0;  i < this.nr;  ++i )

    for( j = 0;  j < this.nc;  ++j )

      if( this.idx( i , j ) < this.nv )

        if( (x.idx( i , j ) < x.nv) && (i < x.nr) && (j < x.nc) )

          this.v[ this.idx( i , j ) ] = x.v[ x.idx( i , j ) ] ;

        else

          this.v[ this.idx( i , j ) ] = 0 ;

  return ;

 } ; // end function tfm()



/** Function smd
 *
 *
 */

function smd( x , y )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    if( y.v[ i ] )

      this.v[ i ] = ( x.v[ i ] / y.v[ i ] ) ;

    else

      this.v[ i ] = undefined ;

  return ;

 } ; // end function smd()



/** Function smm
 *
 *
 */

function smm( x , y )
 {

  let i = undefined ;

  for( i = 0; i < this.nv; ++i )

    this.v[ i ] = ( x.v[ i ] * y.v[ i ] ) ;

  return ;

 } ; // end function smm()



/** Function srt
 *
 *  Root of a quadratic polynomial equation
 *
 *  x*x* + a*x + b = 0
 */

function srt( a , b )
 {

  const p  = a ;
  const q  = b ;
  const d  = ( (p * p) - (4 * q) ) ;
  const dd = Math.sqrt( Math.abs( d ) ) ;

  let   r1 = undefined ;
  let   r2 = undefined ;
  let   r3 = undefined ;
  let   r4 = undefined ;


  if( d >= 0 )
   {

    r1 = ( ((- p) + dd) / 2 ) ;
    r2 = 0.0 ;

    r3 = ( ((- p) - dd) / 2 ) ;
    r4 = 0.0 ;

   }


  else
   {

    r1 = ( (- p) / 2 ) ;
    r2 = (- dd ) ;

    r3 = ( (- p) / 2 ) ;
    r4 = (  dd ) ;

   } ;


  return( [ r1 , r2 , r3 , r4 ] ) ;


 } ; // end function srt()



/** Function sum
 *
 *
 */

function sum()
 {

  let i = undefined ;
  let r = undefined ;

  for( i = r = 0; i < this.nv; r += this.v[ i++ ] ) ;

  return( r ) ;

 } ; // end function sum()



/** Function tma
 *
 *
 */

function tma()
 {

  let i   = undefined ;
  let j   = undefined ;
  let aij = undefined ;
  let aji = undefined ;

  if( ! this.nd )

    for( i = 0;  i < this.nr;  ++i )

      for( j = (i + 1);  j < this.nr;  ++j )
       {

        this.v[ this.idx( i , i ) ] = 0 ;

        aij = this.v[ this.idx( i , j ) ] ; 

        aji = this.v[ this.idx( j , i ) ] ;

        this.v[ this.idx( j , i ) ] = this.v[ this.idx( i , j ) ] = ( (aij - aji) / 2 ) ;

       } ; // end for()

  return ;

 } ; // end function tma()



/** Function tms
 *
 *
 */

function tms()
 {

  let i   = undefined ;
  let j   = undefined ;
  let aij = undefined ;
  let aji = undefined ;

  if( ! this.nd )

    for( i = 0;  i < this.nr;  ++i )

      for( j = (i + 1);  j < this.nr;  ++j )
       {

        aij = this.v[ this.idx( i , j ) ] ;

	aji = this.v[ this.idx( j , i ) ] ;

        this.v[ this.idx( j , i ) ] = this.v[ this.idx( i , j ) ] = ( (aij + aji) / 2 ) ;

       } ; // end for()

  return ;

 } ; // end function tms()



/** Function trc
 *
 *
 */

function trc()
 {

  let i = undefined ;
  let r = undefined ;

  if( this.nd )

    for( r = 0 , i = 0; i < this.nc; r += this.v[ i++ ] ) ;

  else
  
    for( i = 0; i < this.nc; r += this.v[ this.idx( i , i++ ) ] ) ;

  return( r ) ;

 } ; // end function trc()



/** Function tsp
 *
 *
 */

function tsp( x )
 {

  let i = undefined ;
  let j = undefined ;
  
  if( ! this.nd )
  
    for( i = 0;  i < this.nr;  ++i )
    
      for( j = 0;  j < this.nc;  ++j )

        this.v[ this.idx( j , i ) ] = x.v[ x.idx( i , j ) ] ;

  return ;

 } ; // end function tsp()



/** Function unt
 *
 *
 */

function unt( s )
 {
  
  let i = undefined ;

  if( this.nd )

    for( i = 0; i < this.nc; this.v[ i++ ] = s ) ;

  else
  
    for( i = 0; i < 3; this.v[ this.idx( i , i++ ) ] = s ) ;

  return ;

 } ; // end function unt ()



/** Function val
 *
 *  @description function val
 */

function val( i , j , v )
 {

  var r = undefined ; 

  if( ! v )
   
    r = this.v[ this.idx( i , j ) ] ;
  
  else 

    r = this.v[ this.idx( i , j ) ] = v

  return( r ) ;

 } ; // end function val()



/** Function vmd
 *
 *
 */

function vmd( x , y )
 {

  let i = undefined ;
  let j = undefined ;

  for( i = 0; i < x.nv; ++i )
  
    for( j = 0; j < y.nv; ++j )

      if( y.v[ j ] )

        this.v[ this.idx( i , j ) ] = ( x.v[ i ] / y.v[ j ] ) ;

      else

        this.v[ this.idx( i , j ) ] = 0.0 ;

  return ;

 } ; // end function vmd()



/** Function vmm
 *
 *
 */

function vmm( x , y )
 {

  let i = undefined ;
  let j = undefined ;

  for( i = 0; i < x.nv; ++i )
  
    for( j = 0; j < y.nv; ++j )

      this.v[ this.idx( i , j ) ] = ( x.v[ i ] * y.v[ j ] ) ;

  return ;

 } ; // end function vmm()



/** Function xpr
 * 
 *  Flat cross product operator between two three element vectors
 */

function xpr( a , b , c , d , e , f )
 {

  return( [ ((b * f) - (c * e)) , ((c * d) - (a * f)) , ((a * e) - (b * d)) ] ) ;

 } ; // end function xpr() -



/** Function xmm
 *
 *
 */

function xmm( x , y )
 {

  let i = undefined ;
  let j = undefined ;
  let k = undefined ;
  let a = undefined ;
  let b = undefined ;
  let c = undefined ;
  let d = undefined ;

  let e = [ 1 , 2 , 2 , 1 , 2 , 0 , 0 , 2 , 0 , 1 , 1 , 0 ] ;

  for( j = 0; j < this.nc; ++j )

    for( i = k = 0 , a = 0 , b = 1 , c = 2 , d = 3;  k < e.length; ++i , a += 4 , b += 4 , c += 4 , d += 4 , k += 4 )

      if( (this.idx( i , j ) < this.nv) && (x.idx( e[a] , j ) < x.nv) && (y.idx( e[b] , j ) < y.nv) && (x.idx( e[c] , j ) < x.nv) && (y.idx( e[d] , j ) < y.nv) )
       {

        console.log( i , j , e[a] , e[b] , e[c] , e[d] ) ;

        this.v[ this.idx( i , j ) ] = ( (x.v[ x.idx( e[a] , j ) ] * y.v[ y.idx( e[b] , j ) ]) - (x.v[ x.idx( e[c] , j ) ] * y.v[ y.idx( e[d] , j ) ]) );

       }

  return ;

 } ; // end function xmm()



let a = new Matrix( 9 , 9 ) ;

let i = 0 ;

for( i = 0; i < a.nv ; a.v[i] = (1 + i++) ) ;


console.log( a ) ;

console.log( a.v[ a.idx( 0 , 0 ) ] ) ;
console.log( a.v[ a.idx( 0 , 1 ) ] ) ;
console.log( a.v[ a.idx( 0 , 2 ) ] ) ;
console.log( a.v[ a.idx( 1 , 0 ) ] ) ;
console.log( a.v[ a.idx( 1 , 1 ) ] ) ;
console.log( a.v[ a.idx( 1 , 2 ) ] ) ;
console.log( a.v[ a.idx( 2 , 0 ) ] ) ;
console.log( a.v[ a.idx( 2 , 1 ) ] ) ;
console.log( a.v[ a.idx( 2 , 2 ) ] ) ;


let x1 = new Matrix( 3 , 3 , 4 ) ;

for( i = 0; i < x1.nv ; x1.v[i] = (1 + i++) ) ;


let y1 = new Matrix( 3 , 3 , 4 ) ;

for( i = 0; i < y1.nv ; y1.v[i] = (1 + i++) ) ;


let r1 = new Matrix( 3 , 3 , 4 ) ;


r1.mmd( x1 , y1 ) ;


console.log( x1 ) ;

console.log( y1 ) ;

console.log( r1 ) ;


let x2 = new Matrix( 3 , 3 ) ;

let y2 = new Matrix( 3 , 3 ) ;

let r2 = new Matrix( 3 , 3 ) ;


for( let ii = 0; ii < 1; ++ii , r2.mmd( x2 , y2 ) )
 {

  for( i = 0; i < x2.nv ; x2.v[i] = Math.random() , i++ ) ;

  for( i = 0; i < y2.nv ; y2.v[i] = Math.random() , i++ ) ;

  if( (ii % 1e6) == 0 )  console.log( ii ) ;

 }


console.log( x2 ) ;

console.log( y2 ) ;

console.log( r2 ) ;



let xx1 = new Matrix( 3 , 1 ) ;

let yy1 = new Matrix( 3 , 1 ) ;

let rr1 = new Matrix( 3 , 3 ) ;


for( i = 0; i < xx1.nv ; xx1.v[i] = (1 + i++) ) ;

for( i = 0; i < yy1.nv ; yy1.v[i] = (1 + i++) ) ;


rr1.vmm( xx1 , yy1 ) ;


console.log( rr1 ) ;



xx1.cmm( 2.0 , yy1 ) ;


console.log( xx1 ) ;



xx1.cmd( 2.0 , yy1 ) ;


console.log( xx1 ) ;


let e1 = xx1.enm() ;

console.log( e1 ) ;


let x3 = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 5 , 7 , 11 , 13 , 17 , 19 ] ) ;

let y3 = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 5 , 7 , 11 , 13 , 17 , 19 ] ) ;

let r3 = new Matrix( 3 , 3 ) ;

y3.eqt( x3 ) ;

console.log( y3 ) ;

console.log( x3 ) ;

console.log( y3.v ) ;

console.log( x3.v ) ;

x3.inv()

console.log( x3.v ) ;

r3.mmd( x3 , y3 ) ;

console.log( r3.v ) ;


let x4 = new Matrix( 3 , 3 , undefined , [ 1 , 5 , 0 , 5 , 2 , 0 , 0 , 0 , 3 ] ) ;

let y4 = new Matrix( 3 , 3 , undefined , [ 1 , 5 , 0 , 5 , 2 , 0 , 0 , 0 , 3 ] ) ;

let r4 = new Matrix( 3 , 3 ) ;

y4.eqt( x4 ) ;

// console.log( y ) ;

// console.log( x ) ;

console.log( y4.v ) ;

console.log( x4.v ) ;

x4.inv()

console.log( x4.v ) ;

r4.mmd( x4 , y4 ) ;

console.log( r4.v ) ;



let x5 = new Matrix( 3 , 3 , 4 , [ 1 , 2 , 3 , 5 ] ) ;

let y5 = new Matrix( 3 , 3 , 4 , [ 1 , 2 , 3 , 5 ] ) ;

let r5 = new Matrix( 3 , 3 , 4 ) ;

y5.eqt( x5 ) ;

// console.log( y ) ;

// console.log( x ) ;

console.log( y5.v ) ;

console.log( x5.v ) ;

x5.inv()

console.log( y5.v ) ;

console.log( x5.v ) ;

r5.mmd( x5 , y5 ) ;

console.log( r5.v ) ;


let x6 = new Matrix( 3 , 4 , undefined , [ 1 , 1 , 1 , 1 , 3 , 3 , 3 , 3 , 5 , 5 , 5 , 5 ] ) ;

let y6 = new Matrix( 3 , 4 , undefined , [ 7 , 7 , 7 , 7 , 11 , 11 , 11 , 11 , 13 , 13 , 13 , 13 ] ) ;

let r6 = new Matrix( 3 , 4 ) ;

console.log( x6.v ) ;

console.log( y6.v ) ;

r6.xmm( x6 , y6 ) ;

console.log( r6.v ) ;


let x7  = new Matrix( 2 , 2 , 3 , [ 1 , 2 , 3 ] ) ;

let y7  = new Matrix( 2 , 2 , 3 , [ 1 , 2 , 3 ] ) ;

let r7  = new Matrix( 2 , 2 , 3 ) ;

let rr7 = undefined ;

console.log( x7.v ) ;

console.log( y7.v ) ;

rr7 = r7.mdt( x7 , y7 ) ;

console.log( r7.v ) ;

console.log( rr7 );


let x8  = new Matrix( 3 , 4 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ] ) ;

let y8  = new Matrix( 4 , 3 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ] ) ;

let rs8 = new Matrix( 3 , 3 , undefined ) ;

let ra8 = new Matrix( 3 , 3 , undefined ) ;

console.log( x8.v ) ;

console.log( y8.v ) ;


rs8.mmd( x8 , y8 ) ;

console.log( rs8.v ) ;

rs8.tms() ;

console.log( rs8.v ) ;


ra8.mmd( x8 , y8 ) ;

console.log( ra8.v ) ;

ra8.tma() ;

console.log( ra8.v ) ;


let x9 = new Matrix( 3 , 3 , undefined , [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ] ) ;

let y9 = new Matrix( 3 , 3 , undefined ) ;


let r9 = new Matrix( 2 , 2 , 3 ) ;

r9.tfm( x9 )

console.log( 'r223=' , r9.v ) ;

y9.tfm( r9 )

console.log( 'y=' , y9.v ) ;


let r10 = new Matrix( 3 , 3 , 4 ) ;

r10.tfm( x9 )

console.log( 'r334=' , r10.v ) ;

y9.tfm( r9 )

console.log( 'y=' , y9.v ) ;


let r11 = new Matrix( 3 , 3 , 6 ) ;

r11.tfm( x9 )

console.log( 'r334=' , r9.v ) ;

y9.tfm( r9 )

console.log( 'y=' , y9.v ) ;


let x20 = new Matrix( 3 , 3 , 6 , [ 4 , 10 , 1 , -14 , -12 , 13 ] ) ;

let r20 = new Matrix( 3 , 5 , undefined ) ;


console.log( 'x=' , x20.v ) ;

r20.evl( x20 ) ;

console.log( r20.v ) ;

console.log( 'cev=' , cev( r20 ) ) ;



let x21 = new Matrix( 3 , 3 , 6 , [ 3 , 0 , 3 , 2 , 4 , 2 ] ) ;

let r21 = new Matrix( 3 , 5 , undefined ) ;

console.log( 'x=' , x21.v ) ;

r21.evl( x21 )

console.log( r21.v ) ;

console.log( 'cev=' , cev( r21 ) ) ;



let r22 = new Matrix( 3 , 5 , undefined ) ;

let x22 = new Matrix( 3 , 3 , 6 , [ 1 , 1 , 2 , 0 , 0 , 0 ] ) ;


console.log( 'x=' , x22.v ) ;

r22.evl( x22 )

console.log( r22.v ) ;

console.log( 'cev=' , cev( r22 ) ) ;



let r23 = new Matrix( 3 , 4 , undefined ) ;

let x23 = new Matrix( 3 , 3 , 9, [ 4 , -14 , -12 , -14 , 10 , 13 ,  -12 , 13 , 1 ] ) ;

console.log( 'x.v=' , x23.v ) ;

console.log( 'n=' , r23.evj( x23 , 100 , 1.0e-9 ) ) ;

console.log( r23.v ) ;

console.log( 'cev=' , cev( r23 ) ) ;


let r24 = new Matrix( 4 , 5 , undefined ) ;

let x24 = new Matrix( 4 , 4 , undefined ) ;

for( let i = 0; i < 16; ++i )  x24.v[i] = ( (i + 1) * (i + 1) ) ;

console.log( 'x.v=' , x24.v ) ;

console.log( 'n=' , r24.evj( x24 , 100 , 1.0e-6 ) ) ;

console.log( r24.v ) ;


console.log( 'cev=' , cev( r24 ) ) ;



let r25 = new Matrix( 5 , 6 , undefined ) ;

let x25 = new Matrix( 5 , 5 , undefined ) ;

for( let i = 0; i < 25; ++i )  x25.v[i] = ( i + 1 ) ;

console.log( 'x.v=' , x25.v ) ;

console.log( 'n=' , r25.evj( x25 , 100 , 1.0e-6 ) ) ;

console.log( r25.v ) ;

console.log( 'cev=' , cev( r25 ) ) ;



let r26 = new Matrix( 2 , 3 , undefined ) ;

let x26 = new Matrix( 2 , 2 , 4 , [ 3 , 2 , 2 , 1 ] ) ;

console.log( 'x.v=' , x26.v ) ;

console.log( 'n=' , r26.evj( x26 , 100 , 1.0e-6 ) ) ;

console.log( r26.v ) ;

console.log( 'cev=' , cev( r26 ) ) ;



let r27 = new Matrix( 3 , 5 , undefined ) ;

let x27 = new Matrix( 3 , 3 , 6 , [ 1 , 2 , 3 , 5 , 7 , 11 ] ) ;

console.log( 'x.v=' , x27.v ) ;

console.log( 'n=' , r27.evl( x27 ) ) ;

console.log( 'evl=' , r27.v ) ;

console.log( 'cev=' , cev( r27 ) ) ;



let r28 = new Matrix( 3 , 4 , undefined ) ;

let x28 = new Matrix( 3 , 3 , 9 , [ 1 , 5 , 7 , 5 , 2 , 11 , 7 , 11 , 3 ] ) ;

console.log( 'n=' , r28.evj( x28 , 100 , 1.0e-9 ) ) ;

console.log( 'evj=' , r28.v ) ;

console.log( 'cev=' , cev( r28 ) ) ;


console.log( xpr( -0.18464536242324758 , -0.6598984478540825 , 0.7283132077996114 , 0.4524993370589411 , 0.6007554402437133 , 0.6590426776611666 ) ) ;


let m = new Matrix( 3 , 4 , null , [] ) ;

console.log( 'm=' , m ) ;



let mlt = new MatrixLT( 5 , 5 , null , null , [ 3.49 , -0.92 , 4.86 , 1.23 , 0.48 , 5.05 , 1.58 , -1.05 , 1.04 , 1.48 , 0.46 , 2.48 , 1.39 , -0.22 , 3.03 ] ) ;

mlt.cdc() ;

console.log( 'mlt=' ,  mlt ) ;


