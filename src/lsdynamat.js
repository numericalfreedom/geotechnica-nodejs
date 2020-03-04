'use strict' ;

const fs = require( 'fs' ) ;

module.exports = { lsdynamat , biota , bishopb , ctu , ctsf , rrsf , ctg , rrg , ctm , rrm } ;

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
 * @param   {number} px - Minimum deformation
 * @param   {number} ex - Maximum deformation
 *
 * @returns {Array}
 *
 */

function lsdynamat( pz , px , ps , pr , vm , wm , nzs , rzs , czs , ks , nzf , rzf , czf , kf , nzg , rzg , kg , nvs , nvl )
 {

  this.pz   = ( (pz  != undefined) ?  pz  :    1.00e5 ) ;
  this.px   = ( (px  != undefined) ?  px  :    1.00e6 + this.pz ) ;
  this.ps   = ( (ps  != undefined) ?  ps  :    1.00e5 ) ;

  this.pr   = ( (pr  != undefined) ?  pr  :    1.00e5 ) ;
  this.vm   = ( (vm  != undefined) ?  vm  :    2.00e1 ) ;
  this.wm   = ( (wm  != undefined) ?  wm  :    0.50   ) ;

  this.nzs  = ( (nzs != undefined) ?  nzs :    0.50   ) ;
  this.rzs  = ( (rzs != undefined) ?  rzs : 2650.00   ) ;
  this.czs  = ( (czs != undefined) ?  czs : 4000.00   ) ;
  this.ks   = ( (ks  != undefined) ?  ks  :    3.00   ) ;

  this.nzf  = ( (nzf != undefined) ?  nzf :    0.30   ) ;
  this.rzf  = ( (rzf != undefined) ?  rzf : 1000.00   ) ;
  this.czf  = ( (czf != undefined) ?  czf : 1450.00   ) ;
  this.kf   = ( (kf  != undefined) ?  kf  :    7.00   ) ;

  this.nzg  = ( (nzg != undefined) ?  nzg :    0.20   ) ;
  this.rzg  = ( (rzg != undefined) ?  rzg :    1.30   ) ;
  this.kg   = ( (kg  != undefined) ?  kg  :    1.40   ) ;

  this.nvs  = ( (nvs != undefined) ?  nvs :   10      ) ;
  this.nvl  = ( (nvl != undefined) ?  nvl :  100      ) ;

  this.ctu  = undefined ;
  this.ctm  = undefined ;
  this.cts  = undefined ;
  this.ctf  = undefined ;
  this.ctg  = undefined ;
  this.ctp  = undefined ;

  this.pt   = undefined ;
  this.pe   = undefined ;
  this.pn   = undefined ;

  this.dpt  = undefined ;
  this.dpe  = undefined ;
  this.dpn  = undefined ;

  this.ns   = this.nzs ;
  this.nf   = this.nzf ;
  this.ng   = this.nzg ;

  this.n    = undefined ;
  this.s    = undefined ;

  this.a    = undefined ;
  this.b    = undefined ;

  this.de   = undefined ;
  this.e    = undefined ;

  this.rs   = this.rzs ;
  this.rf   = this.rzf ;
  this.rg   = this.rzg ;

  let  ip   = undefined ;
	 
  let  js   = undefined ;
  let  jsr  = undefined ;
  let  jss  = Math.ceil( (this.ptx - this.ptz) / (nvs * this.pts) ) ;

  let  jl   = undefined ;
  let  jlr  = undefined ;
  let  jls  = Math.ceil( (this.ptx - this.ptz) / (nvl * this.pts) ) ;

  let  rvs  = new Array( nvs ) ;
  let  rvl  = new Array( nvl ) ;

  console.log( '        pt=           e=          n=          s=          a=          b=         ctu=         ctm=          ctf=          cts=         ctg=' ) ;


  for( ip = js = jl = jsr = jlr = 0 , this.e = 0.0 , this.pt = this.pe = this.pn = this.pz , this.dpt = this.ps ; this.pt <= this.px ; this.pt += this.dpt , this.pe += this.dpe , this.pn += this.dpn , ++ip )
   {


    this.rs  = rrsf( this.rzs , this.czs , this.ks , this.pt , this.pz ) ;

    this.rf  = rrsf( this.rzf , this.czf , this.kf , this.pn , this.pz ) ;

    this.rg  = rrg(  this.rzg , this.kg  , this.pn , this.pz ) ;


    this.ns  = ( this.nzs * (this.rzs / this.rs) ) ;

    this.nf  = ( this.nzf * (this.rzf / this.rf) ) ;

    this.ng  = ( this.nzg * (this.rzg / this.rg) ) ;


    this.n   = ( 1.0 - this.ns ) ;

    this.s   = ( this.nf / this.n ) ;


    this.cts = ctsf( this.rzs , this.czs , this.ks , this.pn , this.pz ) ;

    this.ctf = ctsf( this.rzf , this.czf , this.kf , this.pn , this.pz ) ;


    this.ctg = ctg(  this.kg , this.pn ) ;

    this.ctp = ( (this.s * this.ctf) + ((1.0 - this.s) * this.ctg) ) ;

    this.ctm = ctm(  this.vm , this.wm , this.pr , this.pe ) ;


    this.a   = biota( this.cts , this.ctm ) ;

    this.b   = bishopb( this.cts , this.ctp , this.ctm , this.n ) ;


    this.ctu = ctu( this.ctm , this.a , this.b ) ;

    console.log( (this.pt - this.pz).toExponential(6) , this.e.toExponential(6) , this.n.toExponential(6) , this.s.toExponential(6) , this.a.toExponential(6) , this.b.toExponential(6) , this.ctu.toExponential(6) , this.ctm.toExponential(6) , this.ctf.toExponential(6) , this.cts.toExponential(6) , this.ctg.toExponential(6) ) ;


    this.dpn = ( this.b * this.dpt ) ;

    this.dpe = ( (1.0 - (this.a * this.b)) * this.dpt ) ;


    this.de  = ( this.ctu * this.dpt ) ;

    this.e  += this.de ;

   } ; // end for()


  return ;

 }


/**
 *
 * function biota : Biot factor alpha
 *
 * @param {number} cts - incremental compressibility of the solid constituent
 * @param {number} ctm - incremental compressibility of the porous matrix
 *
 */

function biota( cts , ctm )
 {

  const a = ( 1.0 - (cts / ctm) ) ;

  return( a ) ;
 
 }; // end function biota()


/**
 *
 * function bishopb : Bishop factor b
 *
 * @param {number} cts - Incremental compressibility of the solid constituent
 * @param {number} ctp - Incremental compressibility of the pore content
 * @param {number} ctm - Incremental compressibility of the porous matrix
 * @param {number} n   - Porosity
 *
 */

function bishopb( cts , ctp , ctm , n )
 {

  const b = ( 1.0 / (1.0 + (n * ((ctp - cts) / (ctm - cts)))) ) ;

  return( b ) ;
 
 }; // end function bishopb()


/**
 *
 * function ctu : incremental undrained compressiblity for adiabatic compression of ternary mixture
 *
 * @param   {number} ctm - Incremental stiffness of porous matrix
 * @param   {number} a   - Biot a coefficient
 * @param   {number} b   - Bishop b coefficient
 *
 * @returns {number}
 *
 */

function ctu( ctm , a , b )
 {

  const dedp = ( ctm * (1.0 - (a * b)) ) ;

  return( dedp ) ;

 } ; // end function ctu()


/**
 *
 * function ctsf : incremental compressibility from the Tait equation of state for solids and fluids
 *
 * @param   {number} rz - Density
 * @param   {number} cz - Wave velocity
 * @param   {number} k  - Exponent
 * @param   {number} p  - Pressure
 * @param   {number} pz - Initial pressure
 *
 * @returns {number}
 *
 */

function ctsf( rz , cz , k , p , pz )
 {

  const rcc  = ( rz * cz * cz ) ;

  const dedp = ( 1.0 / ((k * (p - pz)) + rcc) ) ;

  return( dedp ) ;

 } ; // end function ccsf()


/**
 *
 * function rrsf : relative density from the Tait equation of state for solids and fluids
 *
 * @param   {number} rz - Density
 * @param   {number} cz - Wave velocity
 * @param   {number} k  - Exponent
 * @param   {number} p  - Pressure
 * @param   {number} pz - Initial pressure
 *
 * @returns {number}
 *
 */

function rrsf( rz , cz , k , p , pz )
 {

  const rcc  = ( rz * cz * cz ) ;

  const r    = ( rz / Math.pow( ((k * ((p - pz) / rcc)) + 1.0) , (1.0 / k) ) ) ;

  return( r ) ;

 } ; // end function rrsf()



/**
 *
 * function ctg : incremental compressiblity for adiabatic compression of gases
 *
 * @param   {number} k - Exponent
 * @param   {number} p - Pressure
 *
 * @returns {number}
 *
 */

function ctg( k , p )
 {

  const dedp = ( 1.0 / (k * p) ) ;

  return( dedp ) ;

 } ; // end function ctg()


/**
 *
 * function rrg : relative density for adiabatic compression of gases
 *
 * @param   {number} rz - Initial density
 * @param   {number} k  - Exponent
 * @param   {number} p  - Pressure
 * @param   {number} pz - Initial pressure
 *
 * @returns {number}
 *
 */

function rrg( rz , k , p , pz )
 {

  const r = ( rz / Math.pow( (p / pz) , (1.0 / k) ) ) ;

  return( r ) ;

 } ; // end function rzrg()


/**
 *
 * function ctm : incremental compressiblity for granular matrix
 *
 * @param   {number} pe - Effective pressure
 * @param   {number} pr - Reference pressure
 * @param   {number} vm - Coefficient for solid porous matrix
 * @param   {number} wm - Exponent for solid porous matrix
 *
 * @returns {number}
 *
 */

function ctm( vm , wm , pe , pr )
 {

  const dedp = ( 1.0 / ((vm * pr) * Math.pow( ((pe + pr) / pr) , wm )) ) ;

  return( dedp ) ;

 } ; // end function ctm()


/**
 *
 * function rrm : relative density for granular matrix
 *
 * @param   {number} pe - Effective pressure
 * @param   {number} pr - Reference pressure
 * @param   {number} vm - Coefficient for solid porous matrix
 * @param   {number} wm - Exponent for solid porous matrix
 *
 * @returns {number}
 *
 */

function rrm( rz , vm , wm , pe , pr )
 {

  const r = ( rz / Math.exp( (Math.pow( ((pe + pr) / pr) , (1.0 - wm) ) - 1.0) / (vm * (1.0 - wm)) ) ) ;

  return( r ) ;

 } ; // end function rrm()


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


