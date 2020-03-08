'use strict' ;

const fs = require( 'fs' ) ;

module.exports = { lsdynamat , runlsdynamat , lsdynamat005 , dimension , biota , bishopb , ctu , ctsf , rrsf , ctg , rrg , ctm , rrm } ;


/**
 *
 * function lsdynamat: construct object and write systematic material cards for LSDYNA
 *
 * @constructor
 *
 * @param   {number} px - Minimum deformation
 * @param   {number} ex - Maximum deformation
 *
 * @returns {Object}
 *
 */

function lsdynamat( pz , px , ps , pr , vm , wm , nzs , rzs , czs , ks , nzf , rzf , czf , kf , nzg , rzg , kg , nvs , nvl )
 {

  this.pz   = ( (pz  != undefined) ?  pz  :    1.00e5 ) ;
  this.px   = ( (px  != undefined) ?  px  :    1.00e9 ) ;
  this.ps   = ( (ps  != undefined) ?  ps  :    1.00e2 ) ;

  this.pr   = ( (pr  != undefined) ?  pr  :    1.00e5 ) ;
  this.vm   = ( (vm  != undefined) ?  vm  :    2.00e1 ) ;
  this.wm   = ( (wm  != undefined) ?  wm  :    0.50   ) ;

  this.nzs  = ( (nzs != undefined) ?  nzs :    0.50   ) ;
  this.rzs  = ( (rzs != undefined) ?  rzs : 2650.00   ) ;
  this.czs  = ( (czs != undefined) ?  czs : 6319.00   ) ;
  this.ks   = ( (ks  != undefined) ?  ks  :    7.00   ) ;

  this.nzf  = ( (nzf != undefined) ?  nzf :    0.30   ) ;
  this.rzf  = ( (rzf != undefined) ?  rzf : 1000.00   ) ;
  this.czf  = ( (czf != undefined) ?  czf : 1460.00   ) ;
  this.kf   = ( (kf  != undefined) ?  kf  :    3.00   ) ;

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

  this.dvs  = undefined ;
  this.dvf  = undefined ;
  this.dvg  = undefined ;

  this.dv   = undefined ;

  this.vzs  = this.nzs ;
  this.vzf  = this.nzf ;
  this.vzg  = this.nzg ;
  
  this.vz   = ( this.vzs + this.vzf + this.vzg ) ; 

  this.vs   = this.nzs ;
  this.vf   = this.nzf ;
  this.vg   = this.nzg ;
  
  this.v    = ( this.vs + this.vf + this.vg ) ; 

  this.dns  = undefined ;
  this.dnf  = undefined ;
  this.dng  = undefined ;

  this.ns   = this.nzs ;
  this.nf   = this.nzf ;
  this.ng   = this.nzg ;

  this.n    = ( this.nf + this.ng ) ;
  this.s    = ( this.nf / this.n  ) ;

  this.dn   = undefined ;
  this.ds   = undefined ;

  this.a    = undefined ;
  this.b    = undefined ;

  this.eps  = undefined ;
  this.deps = undefined ;

  this.rs   = this.nzs ;
  this.rf   = this.nzf ;
  this.rg   = this.nzg ;

  this.rrs  = this.rzs ;
  this.rrf  = this.rzf ;
  this.rrg  = this.rzg ;
  
  this.rzm  = ( this.nzs * this.rzs ) ;
  this.rrm  = this.rzm ;

  this.rz   = ( (this.nzs * this.rzs) + (this.nzf * this.rzf) + (this.nzg * this.rzg) );
  this.rr   = this.rz ;
  this.r    = this.rz ;

  this.reps = undefined ;

  this.dimension    = dimension ;
  this.runlsdynamat = runlsdynamat ;
  this.lsdynamat005 = lsdynamat005 ;

  return ;

 }


/**
 *
 * function dimension : dimension transformation
 *
 * @param {number} mr  - mass ratio
 * @param {number} mx  - mass exponent 
 * @param {number} lr  - length ratio
 * @param {number} lx  - length exponent 
 * @param {number} tr  - time ratio
 * @param {number} tx  - time exponent 
 *
 */

function dimension( mr , mx , lr , lx , tr , tx )
 {

  return( Math.pow( mr , mx ) * Math.pow( lr , lx ) * Math.pow( tr , tx ) ) ;
	 
 } ; // end function dimension()


/**
 *
 * function runlsdynamat: compute material cards for LSDYNA
 *
 * @returns {Array}
 *
 */

function runlsdynamat()
 {

  this.vs   = this.nzs ;
  this.vf   = this.nzf ;
  this.vg   = this.nzg ;

  this.v    = ( this.vs + this.vf + this.vg ) ; 
  
  this.ns   = this.nzs ;
  this.nf   = this.nzf ;
  this.ng   = this.nzg ;
  
  this.n    = ( this.nf + this.ng ) ;
  this.s    = ( this.nf / this.n  ) ;

  this.rs   = this.nzs ;
  this.rf   = this.nzf ;
  this.rg   = this.nzg ;

  this.r    = ( this.rs + this.rf + this.rg ) ;

  let  ip   = undefined ;
	 
  let  js   = undefined ;
  let  jsr  = undefined ;
  let  jsn  = Math.ceil( this.px / (this.nvs * this.ps) ) ;

  let  jl   = undefined ;
  let  jlr  = undefined ;
  let  jln  = Math.ceil( this.px / (this.nvl * this.ps) ) ;

  let  rvs  = new Array( this.nvs ) ;
  let  rvl  = new Array( this.nvl ) ;


  for( ip = js = jsr = jl = jlr = 0 , this.eps = 0.0 , this.pt = this.pe = this.pn = this.pz , this.dpt = this.ps ; this.pt <= (this.px + this.pz) ; ++ip , ((js = (++js % jsn)) || (++jsr)) , ((jl = (++jl % jln)) || (++jlr)) )
   {


    this.cts = ctsf( this.rzs , this.czs , this.ks , this.pt , this.pz ) ;

    this.ctf = ctsf( this.rzf , this.czf , this.kf , this.pn , this.pz ) ;

    this.ctg = ctg(  this.kg , this.pn ) ;

    this.ctp = ( (this.s * this.ctf) + ((1.0 - this.s) * this.ctg) ) ;

    this.ctm = ctm(  this.vm , this.wm , this.pr , this.pe ) ;


    this.a    = biota( this.cts , this.ctm ) ;

    this.b    = bishopb( this.cts , this.ctp , this.ctm , this.n ) ;

	     
    this.ctu  = ctu( this.ctm , this.a , this.b ) ;


    if( ip )
     {


      this.pt  += this.dpt ;

      this.pn  += ( this.dpn  = (this.b * this.dpt) ) ;

      this.pe  += ( this.dpe  = (this.dpt - (this.a * this.dpn)) ) ;


      this.eps += ( this.deps = (- this.ctu * this.dpt) ) ;


      this.vf  += ( this.dvf  = (this.v * (- (this.nf * this.ctf * this.dpn))) ) ;

      this.vg  += ( this.dvg  = (this.v * (- (this.ng * this.ctg * this.dpn))) ) ;

      this.vs  += ( this.dvs  = (this.v * ((- (this.ns * this.cts * this.dpn)) - (this.cts * this.dpe))) ) ;


      this.v   += ( this.dv   = (this.v * ((- (this.cts * this.dpn)) - (this.ctm * this.dpe))) ) ;


      this.nf   = ( this.vf / this.v ) ;
      
      this.ng   = ( this.vg / this.v ) ;
      
      this.ns   = ( this.vs / this.v ) ;
   
      
      this.n    = ( this.nf + this.ng ) ;

      this.s    = ( this.nf / this.n ) ;


      this.rrs  = rrsf( this.rzs , this.czs , this.ks , this.pt , this.pz ) ;

      this.rrf  = rrsf( this.rzf , this.czf , this.kf , this.pn , this.pz ) ;

      this.rrg  = rrg(  this.rzg , this.kg  , this.pn , this.pz ) ;

      this.rrm  = rrm(  this.rzm , this.vm  , this.wm , this.pe , this.pz ) ;

      this.rrm  = ( this.ns * this.rrs ) ;


      this.rr   = ( (this.ns * this.rrs) + (this.nf * this.rrf) + (this.ng * this.rrg) );
      

      this.rs   = ( (this.rzs / this.rrs) * this.nzs ) ;
      
      this.rf   = ( (this.rzf / this.rrf) * this.nzf ) ;
      
      this.rg   = ( (this.rzg / this.rrg) * this.nzg ) ;
      
      
      this.r    = ( this.rs + this.rf + this.rg ) ;
      
      
     } ; // end if() -


    this.reps = Math.log( this.v / this.vz ) ;


    if( ! js )

      rvs[jsr] = [ this.eps , (this.pt - this.pz) , (this.pe - this.pz) , (this.pn - this.pz) , this.n , this.s , this.a , this.b , this.ns , this.nf , this.ng , this.rrs , this.rrf , this.rrg , this.rrm , this.rr , this.rs , this.rf , this.rg , this.r , this.reps ] ;


    if( ! jl )

      rvl[jlr] = [ this.eps , (this.pt - this.pz) , (this.pe - this.pz) , (this.pn - this.pz) , this.n , this.s , this.a , this.b , this.ns , this.nf , this.ng , this.rrs , this.rrf , this.rrg , this.rrm , this.rr , this.rs , this.rf , this.rg , this.r , this.reps ] ;


   } ; // end for()


  return( [ rvs , rvl ] ) ;


 } ; // end function runlsdynamat()


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

  const r    = ( rz / Math.pow( ((k * ((p - pz) / rcc)) + 1.0) , (- (1.0 / k)) ) ) ;

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

  const r = ( rz / Math.pow( (p / pz) , (- (1.0 / k)) ) ) ;

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
 * @function lsdynamat005
 *
 * @param fn
 * @param pv
 * @param rvs
 * @param rvl
 *
 */

function lsdynamat005( mfnx , pv , rdvs , rdvl , lfnx , rv )
 {

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

  const ipv  = pv.length ;
  const isv  = rdvs.length ;
  const ilv  = rdvl.length ;

  const ipn  = 0 ;
  const ipx  = ipv ;

  const isn  = ( ipx ) ;
  const isx  = ( ipv + isv ) ;

  const iln  = ( isx ) ;
  const ilx  = ( isx + ilv ) ;

  var i      = undefined ;
  var j      = undefined ;
  var k      = undefined ;

  var mfn    = undefined ;
  var mfd    = undefined ;
  
  var lfn    = undefined ;
  var lfd    = undefined ;

  var line   = undefined ;
  

  let ps = new Array( ilx ) ;
  
  for( i = 0 ; i < ilx ; ps[i++] = [ undefined , undefined ] ) ;


  for( i = ipn ; i < ipx ; ++i )

    switch( i )
     {

      case mid:

        ps[mid][0] = `${pv[mid]}` ;

        break ;

      case vcr:
      case ref:

        ps[i][0] = `        ${pv[i]}` ;

      case lcid:

        ps[lcid][0] = `${pv[lcid]}` ;

        break ;

      default:

        if( pv[i] >= 0 )

          ps[i][0] = pv[i].toExponential(4) ;

         else

  	      ps[i][0] = pv[i].toExponential(3) ;

        break ;

     } ; // end switch()


  for( i = isn ; i < isx ; ++i )

    for( j = 0 ; j < 2 ; ++j )
 
      if( rdvs[i-isn][j] >= 0 )

        ps[i][j] = rdvs[i-isn][j].toExponential(4) ;

       else

        ps[i][j] = rdvs[i-isn][j].toExponential(3) ;


  for( i = iln ; i < ilx ; ++i )

    for( j = 0 ; j < 2 ; ++j )
 
      if( rdvl[i-iln][j] >= 0 )

        ps[i][j] = rdvl[i-iln][j].toExponential(4) ;

       else

        ps[i][j] = rdvl[i-iln][j].toExponential(3) ;


  mfn = ( ps[mid][0] + mfnx ) ;
  
  mfd = fs.openSync( mfn , 'w' ) ;

  fs.writeSync( mfd , '$ *MAT_005 \n' ) ;
  fs.writeSync( mfd , '*MAT_SOIL_AND_FOAM \n' ) ;
  fs.writeSync( mfd , '$ PARAMETER PC != 0.0 IN THIS CASE \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$ *MAT_014 \n' ) ;
  fs.writeSync( mfd , '$ *MAT_SOIL_AND_FOAM_FAILURE \n' ) ;
  fs.writeSync( mfd , '$ PARAMETER PC=0.0 IN THIS CASE \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$...>....1....>....2....>....3....>....4....>....5....>....6....>....7....>....8  \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$ Parameters converted to Rheinmetall (in-house) dimension base: \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$  Mass:   t (Tons) \n' ) ;
  fs.writeSync( mfd , '$  Length: mm (Millimeters) \n' ) ;
  fs.writeSync( mfd , '$  Time:   s (Seconds) \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$...............................................................................  \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$      MID        RO         G       KUN        A0        A1        A2        PC  \n' ) ;
  fs.writeSync( mfd , ` ${ps[mid][0]} ${ps[ro][0]} ${ps[g][0]} ${ps[kun][0]} ${ps[a0][0]} ${ps[a1][0]} ${ps[a2][0]} ${ps[pc][0]} \n` ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$      VCR       REF      LCID \n' ) ;
  fs.writeSync( mfd , ` ${ps[vcr][0]} ${ps[ref][0]} ${ps[lcid][0]} \n` ) ;
  fs.writeSync( mfd , '$ \n' ) ;  

  fs.writeSync( mfd , '$     EPS1      EPS2      EPS3      EPS4      EPS5      EPS6      EPS7      EPS8  \n' ) ;
  fs.writeSync( mfd , ` ${ps[i=isn][0]} ${ps[++i][0]} ${ps[++i][0]} ${ps[++i][0]} ${ps[++i][0]} ${ps[++i][0]} ${ps[++i][0]} ${ps[++i][0]} \n` ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$     EPS9     EPS10 \n' ) ;
  fs.writeSync( mfd , ` ${ps[++i][0]} ${ps[i+=2][0]} \n` ) ;
  fs.writeSync( mfd , '$ \n' ) ;

  fs.writeSync( mfd , '$       P1        P2        P3        P4        P5        P6        P7        P8  \n' ) ;
  fs.writeSync( mfd , ` ${ps[i=isn][1]} ${ps[++i][1]} ${ps[++i][1]} ${ps[++i][1]} ${ps[++i][1]} ${ps[++i][1]} ${ps[++i][1]} ${ps[++i][1]} \n` ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$       P9       P10 \n' ) ;
  fs.writeSync( mfd , ` ${ps[++i][1]} ${ps[i+=2][1]} \n` ) ;

  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$...............................................................................  \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '*DEFINE_CURVE \n' ) ;
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$...>....1....>....2....>....3....>....4....>....5....>....6....>....7....>....8  \n' ) ; 
  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$     LCID      SIDR      SCLA      SCLO      OFFA      OFFO                      \n' ) ;
  fs.writeSync( mfd , ` ${ps[lcid][0]} \n` ) ;
  fs.writeSync( mfd , '$                 A1                  O1                                          \n' ) ;
  
  for( i = iln ; i < ilx ; ++i )
  
    fs.writeSync( mfd , `           ${ps[i][0]}           ${ps[i][1]} \n` ) ;

  fs.writeSync( mfd , '$ \n' ) ;
  fs.writeSync( mfd , '$...............................................................................  \n' ) ;

  fs.closeSync( mfd ) ; 


  if( lfnx && rv )
   {

    lfn = ( ps[mid][0] + lfnx ) ;

    lfd = fs.openSync( lfn , 'w' ) ;

    fs.writeSync( lfd , '           e=          pt=          pe=          pn=           n=           s=           a=           b=          ns=          nf=          ng=         rrs=         rrf=         rrg=         rrm=          rr=          rs=          rf=          rg=           r=        reps= \n' ) ;
    fs.writeSync( lfd , '          (1)          (2)          (3)          (4)          (5)          (6)          (7)          (8)          (9)         (10)         (11)         (12)         (13)         (14)         (15)         (16)         (17)         (18)         (19)         (20)         (21) \n' ) ;

    if( rv )
 
      for( i = 0 ; i < rv.length ; ++i , fs.writeSync( lfd , line += '\n' ) )

        for( line = '' , j = 0 ; j < rv[0].length ; ++j )

          line += ( '  ' + rv[i][j].toExponential(6) ) ;

    fs.closeSync( lfd ) ;
    
   } ; // end if()

  return ;

 } ; // end function lsdynamat005()
 
