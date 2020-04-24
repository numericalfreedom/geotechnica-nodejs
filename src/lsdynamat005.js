"use strict" ;

const short = true ;

const lsdynamat  = require( './lsdynamat' ) ;

const mat005 = new lsdynamat.lsdynamat() ;

// Dimension system: tons / mm / sec

const mr    =    0.001 ;
const lr    = 1000.000 ;
const tr    =    1.000 ;

// Dimension transformation for density

const rmx   =    1.0   ;
const rlx   = (- 3.0 ) ;
const rtx   = (  0.0 ) ;
const rdtf  = mat005.dimension( mr , rmx , lr , rlx , tr , rtx ) ;

// Dimension transformation for stress

const smx   =    1.0   ;
const slx   = (- 1.0 ) ;
const stx   = (- 2.0 ) ;
const sdtf  = mat005.dimension( mr , smx , lr , slx , tr , stx ) ;

// Dimension transformation for Yield condition parameters: fs = J2 - (a0 + a1 * p + a2 * p * p)

const a0mx  =    2.0   ;
const a0lx  = (- 2.0 ) ;
const a0tx  = (- 4.0 ) ;
const a0dtf = mat005.dimension( mr , a0mx , lr , a0lx , tr , a0tx ) ;

const a1mx  =    1.0   ;
const a1lx  = (- 1.0 ) ;
const a1tx  = (- 2.0 ) ;
const a1dtf = mat005.dimension( mr , a1mx , lr , a1lx , tr , a1tx ) ;


const kfnn  =    1     ;
const kfn   =    7.00  ;
const kfx   =    7.00  ;
const kfs   =    1.00  ; // ( (kfx - kfn) / kfnn ) ;

const ksnn  =    2     ;
const ksn   =    3.00  ;
const ksx   =    5.00  ;
const kss   = ( (ksx - ksn) / ksnn ) ;

const nznn  =    6     ;
const nzn   =    0.20  ;
const nzx   =    0.50  ;
const nzss  = ( (nzx - nzn) / nznn ) ;

const sznn  =    10    ;
const szn   =    0.00  ;
const szx   =    1.00  ;
const szss  = ( (szx - szn) / sznn ) ;


const mid   =  0 ;
const ro    =  1 ;
const g     =  2 ;
const kun   =  3 ;
const a0    =  4 ;
const a1    =  5 ;
const a2    =  6 ;
const pc    =  7 ;
const vcr   =  8 ;
const ref   =  9 ;
const lcid  = 10 ;

const a0v   = 1.500000e8  ;
const a1v   = 2.065000e5  ;
const a2v   = 1.795844e-1 ;

const pcv   = 1.0e3 ;
const vcrv  = 0 ;
const refv  = 0 ;

const nuurv = 0.35 ;

const rzs   = 2650.00 ;
const rzf   = 1000.00 ;
const rzg   =    1.30 ;

const vemz  =    4.25e3 ;
const wem   =    0.55 ;
const mem   =    0.00 ;

const vrmz  =    2.00e5 ;
const wrm   =    0.00 ;
const mrm   =    0.00 ;

const mez   =   10.00 ;

const rvsl  =   11 ;
const rvll  =  101 ;

const mfnx  = '.key' ;
const lfnx  = '.dat' ;

var   gv    = undefined ;
var   kunv  = undefined ;

var   rdvs  = new Array( rvsl ) ;
var   rdvl  = new Array( rvll ) ;

const fezz  = 2.97 ;

var   ez    = undefined ;
var   fezvm = undefined ;

for( i = 0 ; i < rvsl ; rdvs[i++] = [ undefined , undefined ] ) ;

for( i = 0 ; i < rvll ; rdvl[i++] = [ undefined , undefined ] ) ;

var   pv     = undefined ;
var   rvs    = undefined ;
var   rvl    = undefined ;

var   midv   = undefined ;
var   midbs  = 'M' ;

var   midkf  = undefined ;
var   midks  = undefined ;
var   midnz  = undefined ;
var   midsz  = undefined ;

var   lcidv  = undefined ;
var   lcidbs = 'L' ;

var   kf     = undefined ;
var   ks     = undefined ;

var   nz     = undefined ;
var   sz     = undefined ;

var   nzs    = undefined ;
var   nzf    = undefined ;
var   nzg    = undefined ;

var   rz     = undefined ;


mat005.ps = 1.00e5 ;


for( kf = kfn ; kf <= kfx ; kf += kfs )

  for( ks = ksn ; ks <= ksx ; ks += kss )

    for( nz = nzn ; nz <= nzx ; nz += nzss )
     {
	 

      mat005.nzs = ( nzs = (1.0 - nz) ) ;


      mat005.vem = ( vemz * Math.pow( nzs , mez ) ) ;

      mat005.wem = wem ;

      mat005.mem = mem ;


      mat005.vrm = ( vrmz * Math.pow( nzs , mez ) ) ;

      mat005.wrm = wrm ;

      mat005.mrm = mrm ;


      mat005.kf  = kf  ;

      mat005.ks  = ks  ;


      kunv = ( mat005.vrm * mat005.pr ) ;

      gv   = ( kunv * ((3.0 * (1.0 - (2.0 * nuurv))) / (2.0 * (1.0 + nuurv))) ) ;


      for( sz = szn ; sz <= szx ; sz += szss )
       {

        mat005.nzf = ( nzf = (nz * sz) ) ;

        mat005.nzg = ( nzg  = (nz * (1.0 - sz)) ) ;

        rz = ( (nzs * rzs) + (nzf * rzf) + (nzg * rzg) ) ;

        midkf = String( Math.round( kf ) ) ;

        midks = String( Math.round( ks ) ) ;

        midnz = String( Math.round( nz * 100 ) ).padStart( 2 , '0' ) ;

        midsz = String( Math.round( sz * 10  ) ).padStart( 2 , '0' ) ;

        midv  = ( midbs + midkf + midks + '_' + midnz + midsz ) ;

        lcidv = Number( midkf + midks + midnz + midsz ) ; 

        console.log( 'Writing material key: ' + midv + mfnx ) ;
   
        [ rvs , rvl ]  = mat005.runlsdynamat() ;
   
        pv = [ midv , (rz * rdtf) , (gv * sdtf) , (kunv * sdtf) , (a0v * a0dtf) , (a1v * a1dtf) , a2v , (pcv * sdtf) , vcrv , refv , lcidv ] ;

        for( i = 0 ; i < rvsl ; rdvs[i][0] = rvs[i][0] , rdvs[i][1] = (rvs[i++][1] * sdtf) ) ;

        for( i = 0 ; i < rvll ; rdvl[i][0] = rvl[i][0] , rdvl[i][1] = (rvl[i++][1] * sdtf) ) ;

        mat005.lsdynamat005( mfnx , pv , rdvs , rdvl , lfnx , rvl ) ;

       } ; // end for()

     } ; // end for()


var i    = undefined ;
var j    = undefined ;
var line = undefined ;


console.log( '           e=          pt=          pe=          pn=           n=           s=           a=           b=          ns=          nf=          ng=         rrs=         rrf=         rrg=         rrm=          rr=          rs=          rf=          rg=           r=        reps=' ) ;
console.log( '          (1)          (2)          (3)          (4)          (5)          (6)          (7)          (8)          (9)         (10)         (11)         (12)         (13)         (14)         (15)         (16)         (17)         (18)         (19)         (20)         (21)' ) ;


if( short )
 
  for( i = 0 ; i < rvs.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rvs[0].length ; ++j )

      line += ( '  ' + rvs[i][j].toExponential(6) ) ;
     
else

  for( i = 0 ; i < rvl.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rvl[0].length ; ++j )

      line += ( '  ' + rvl[i][j].toExponential(6) ) ;


