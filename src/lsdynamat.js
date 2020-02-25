'use strict' ;

const fs = require( 'fs' ) ;

module.exports = { lsdynamat , csf , cg , cm } ;

const mid  =  0 ;
const ro   =  1 ;
const g    =  2 ;
const kun  =  3 ;
const a0   =  4 ;
const a1   =  5 ;
const a2   =  6 ;
const pc   =  7 ;
const vcr  =  8 ;
const ref  =  9 ;
const lcid = 10 ;
const e1   = 11 ;
const e2   = 12 ;
const e3   = 13 ;
const e4   = 14 ;
const e5   = 15 ;
const e6   = 16 ;
const e7   = 17 ;
const e8   = 18 ;
const e9   = 19 ;
const e10  = 20 ;
const p1   = 21 ;
const p2   = 22 ;
const p3   = 23 ;
const p4   = 24 ;
const p5   = 25 ;
const p6   = 26 ;
const p7   = 27 ;
const p8   = 28 ;
const p9   = 29 ;
const p10  = 30 ;


const fd = fs.openSync( 'mat.key' , 'w' ) ;

var pv = new Array( 31 ) ;

var i  = undefined ;

pv[mid]  = 'M5_123456' ;
pv[ro]   =  1.800e-9 ;
pv[g]    =  6.385e+1 ;
pv[kun]  =  3.000E+4 ;
pv[a0]   =  3.400E-3 ;
pv[a1]   =  7.033E-2 ;
pv[a2]   =  3.000E-1 ;
pv[pc]   = -6.900E-3 ;

pv[vcr]  =  0.0 ;
pv[ref]  =  0.0 ;

pv[lcid] = 'M5_123456' ;

pv[e1]   =  0.00    ;
pv[e2]   = -1.04E-1 ;
pv[e3]   = -1.61E-1 ;
pv[e4]   = -1.92E-1 ;
pv[e5]   = -2.24E-1 ;
pv[e6]   = -2.46E-1 ;
pv[e7]   = -2.71E-1 ;
pv[e8]   = -2.83E-1 ;
pv[e9]   = -2.90E-1 ;
pv[e10]  = -4.00E-1 ;

pv[p1]   =   0.00   ;
pv[p2]   =  2.00E+1 ;
pv[p3]   =  4.00E+1 ;
pv[p4]   =  6.00E+1 ;
pv[p5]   =  1.20E+2 ;
pv[p6]   =  2.00E+2 ;
pv[p7]   =  4.00E+2 ;
pv[p8]   =  6.00E+2 ;
pv[p9]   =  8.00E+2 ;
pv[p10]  =  4.10E+3 ;


mat_005( fd , pv , pv ) ;


fs.closeSync( fd ) ; 


/**
 *
 * function lsdynamat: construct object and write systematic material cards for LSDYNA
 *
 * @constructor
 *
 * @param   {number} en - Minimum deformation
 * @param   {number} ex - Maximum deformation
 *
 * @returns {Array}
 *
 */

function lsdynamat( en , ex , es , nz , sz , pz , pr , vm , wm , rs , cs , ks , rf , cf , kf , kg )
 {

  this.en   = ( (en != undefined) ?  en :    0.00    ) ;
  this.ex   = ( (ex != undefined) ?  ex :    0.50    ) ;
  this.es   = ( (ex != undefined) ?  es :    1.00e-6 ) ;

  this.nz   = ( (nz != undefined) ?  nz :    0.50    ) ;
  this.sz   = ( (sz != undefined) ?  sz :    0.50    ) ;

  this.pz   = ( (pz != undefined) ?  pz :    1.00e5  ) ;

  this.pr   = ( (pr != undefined) ?  pr :    1.00e5  ) ;
  this.vm   = ( (vm != undefined) ?  vm :  200.00    ) ;
  this.wm   = ( (wm != undefined) ?  wm :    0.50    ) ;

  this.rs   = ( (rs != undefined) ?  rs : 2650.00    ) ;
  this.cs   = ( (cs != undefined) ?  cs : 4000.00    ) ;
  this.ks   = ( (ks != undefined) ?  ks :    3.00    ) ;

  this.rf   = ( (rf != undefined) ?  rf : 1000.00    ) ;
  this.cf   = ( (cf != undefined) ?  cf : 1450.00    ) ;
  this.kf   = ( (kf != undefined) ?  kf :    7.00    ) ;

  this.kg   = ( (kg != undefined) ?  kg :    1.40    ) ;

  this.ccm  = undefined ;
  this.ccs  = undefined ;
  this.ccf  = undefined ;
  this.ccg  = undefined ;

  this.pt   = undefined ;
  this.pe   = undefined ;
  this.pn   = undefined ;

  this.n    = undefined ;
  this.s    = undefined ;

  this.a    = undefined ;
  this.b    = undefined ;

  var ie    = 0 ;
  var ien   = 0 ;
  var iex   = ((ex - en) / es) ;
  var ies   = undefined ;

  return ;

 }


/**
 *
 * function csf : incremental compressibility from the tait equation of state for solids and fluids
 *
 * @param   {number} r  - Density
 * @param   {number} c  - Wave velocity
 * @param   {number} k  - Exponent
 * @param   {number} p  - Pressure
 * @param   {number} pz - Initial pressure
 *
 * @returns {number}
 *
 */

function csf( r , c , k , p , pz )
 {

  const rcc  = ( r * c * c ) ;

  const dedp = ( 1.0 / ((k * (p - pz)) + rcc) ) ;

  return( dedp ) ;

 } ; // end function csf()


/**
 *
 * function cg : incremental compressiblity for adiabatic compression of gases
 *
 * @param   {number} p - Pressure
 * @param   {number} k - Exponent
 *
 * @returns {number}
 *
 */

function cg( p , k )
 {

  const dedp = ( 1.0 / (k * p) ) ;

  return( dedp ) ;

 } ; // end function cg()


/**
 *
 * function cm : incremental compressiblity for granular matrix
 *
 * @param   {number} pe - Effective pressure
 * @param   {number} pr - Reference pressure
 * @param   {number} vm - Coefficient for solid porous matrix
 * @param   {number} wm - Exponent for solid porous matrix
 *
 * @returns {number}
 *
 */

function cm( pe , pr , vm , wm )
 {

  const dedp = ( 1.0 / ((vm * pr) * Math.pow( ((pe + pr) / pr) , wm )) ) ;

  return( dedp ) ;

 } ; // end function cm()


/**
 *
 * @function mat_005
 *
 * @param r
 * @param c
 * @param k
 * @param p
 * @param pz
 *
 */

function mat_005( fd , pv , px )
 {

  let i  = undefined ;
  let ix = pv.length ;

  let ps = new Array( ix ) ;

  ps[mid] = `${pv[mid]}` ;

  for( i = 0 ; i < ix ; ++i )

    switch( i )
     {

      case mid:

       ps[mid] = `${pv[mid]}` ;

       break ;

      case vcr:
      case ref:

       ps[i] = `        ${pv[i]}` ;

      case lcid:

       ps[lcid] = `${pv[lcid]}` ;

       break ;

      default:

       if( pv[i] >= 0 )

         ps[i] = pv[i].toExponential(4) ;

       else

	 ps[i] = pv[i].toExponential(3) ;

       break ;

     } ; // end switch()
	 

  fs.writeSync( fd , '$ *MAT_005 \n' ) ;
  fs.writeSync( fd , '*MAT_SOIL_AND_FOAM \n' ) ;
  fs.writeSync( fd , '$ PARAMETER PC != 0.0 IN THIS CASE \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$ *MAT_014 \n' ) ;
  fs.writeSync( fd , '$ *MAT_SOIL_AND_FOAM_FAILURE \n' ) ;
  fs.writeSync( fd , '$ PARAMETER PC=0.0 IN THIS CASE \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$...>....1....>....2....>....3....>....4....>....5....>....6....>....7....>....8  \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$ Parameters converted to Rheinmetall (in-house) dimension base: \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$  Mass:   t (Tons) \n' ) ;
  fs.writeSync( fd , '$  Length: mm (Millimeters) \n' ) ;
  fs.writeSync( fd , '$  Time:   s (Seconds) \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$...............................................................................  \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$      MID        RO         G       KUN        A0        A1        A2        PC  \n' ) ;
  fs.writeSync( fd , ` ${ps[mid]} ${ps[ro]} ${ps[g]} ${ps[kun]} ${ps[a0]} ${ps[a1]} ${ps[a2]} ${ps[pc]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$      VCR       REF      LCID \n' ) ;
  fs.writeSync( fd , ` ${ps[vcr]} ${ps[ref]} ${ps[lcid]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$     EPS1      EPS2      EPS3      EPS4      EPS5      EPS6      EPS7      EPS8  \n' ) ;
  fs.writeSync( fd , ` ${ps[e1]} ${ps[e2]} ${ps[e3]} ${ps[e4]} ${ps[e5]} ${ps[e6]} ${ps[e7]} ${ps[e8]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$     EPS9     EPS10 \n' ) ;
  fs.writeSync( fd , ` ${ps[e9]} ${ps[e10]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$       P1        P2        P3        P4        P5        P6        P7        P8  \n' ) ;
  fs.writeSync( fd , ` ${ps[p1]} ${ps[p2]} ${ps[p3]} ${ps[p4]} ${ps[p5]} ${ps[p6]} ${ps[p7]} ${ps[p8]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$       P9       P10 \n' ) ;
  fs.writeSync( fd , ` ${ps[p9]} ${ps[p10]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$...............................................................................  \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '*DEFINE_CURVE \n' ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$...>....1....>....2....>....3....>....4....>....5....>....6....>....7....>....8  \n' ) ; 
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$     LCID      SIDR      SCLA      SCLO      OFFA      OFFO                      \n' ) ;
  fs.writeSync( fd , ` ${ps[lcid]} \n` ) ;
  fs.writeSync( fd , '$                 A1                  O1                                          \n' ) ;
  fs.writeSync( fd , `           ${ps[e1]}           ${ps[p1]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e2]}           ${ps[p2]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e3]}           ${ps[p3]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e4]}           ${ps[p4]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e5]}           ${ps[p5]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e6]}           ${ps[p6]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e7]}           ${ps[p7]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e8]}           ${ps[p8]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e9]}           ${ps[p9]} \n` ) ;
  fs.writeSync( fd , `           ${ps[e10]}           ${ps[p10]} \n` ) ;
  fs.writeSync( fd , '$ \n' ) ;
  fs.writeSync( fd , '$...............................................................................  \n' ) ;

  return ;

 } ; // end function()


