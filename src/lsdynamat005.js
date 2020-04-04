"use strict" ;

const short = true ;

const lsdynamat  = require( './lsdynamat' ) ;

const mat005 = new lsdynamat.lsdynamat() ;

const mr    =    0.001 ;
const lr    = 1000.000 ;
const tr    =    1.000 ;

const rmx   =    1.0   ;
const rlx   = (- 3.0 ) ;
const rtx   = (  0.0 ) ;
const rdtf  = mat005.dimension( mr , rmx , lr , rlx , tr , rtx ) ;

const smx   =    1.0   ;
const slx   = (- 1.0 ) ;
const stx   = ( -2.0 ) ;
const sdtf  = mat005.dimension( mr , smx , lr , slx , tr , stx ) ;

const a0mx  =    2.0   ;
const a0lx  = (- 2.0 ) ;
const a0tx  = ( -4.0 ) ;
const a0dtf = mat005.dimension( mr , a0mx , lr , a0lx , tr , a0tx ) ;

const a1mx  =    1.0   ;
const a1lx  = (- 1.0 ) ;
const a1tx  = ( -2.0 ) ;
const a1dtf = mat005.dimension( mr , a1mx , lr , a1lx , tr , a1tx ) ;

const nznn  =    6     ;
const nzn   =    0.20  ;
const nzx   =    0.50  ;
const nzss  = ( (nzx - nzn) / nznn ) ;

const sznn  =    8     ;
const szn   =    0.10  ;
const szx   =    0.90  ;
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

const gv    = 1.000e9 ;
const kunv  = 1.000e9 ;
const a0v   = 3.400e9 ;
const a1v   = 7.033e4 ;
const a2v   = 0.300   ;
const pcv   = 0.000   ;
const vcrv  = 0 ;
const refv  = 0 ;

const rzs   = 2650.00 ;
const rzf   = 1000.00 ;
const rzg   =    1.30 ;

const vemz  =   20.00 ;
const wem   =    0.50 ;
const mem   =    0.00 ;

const vrmz  =   40.00 ;
const wrm   =    0.75 ;
const mrm   =    1.00 ;

const rvsl  =  11 ;
const rvll  = 101 ;

const mfnx  = '.key' ;
const lfnx  = '.dat' ;

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
var   midnz  = undefined ;
var   midsz  = undefined ;

var   lcidv  = undefined ;
var   lcidbs = 'L' ;

var   nz     = undefined ;
var   sz     = undefined ;

var   nzs    = undefined ;
var   nzf    = undefined ;
var   nzg    = undefined ;

var   rz     = undefined ;


for( nz = nzn ; nz <= nzx ; nz += nzss )
 {
	 

  ez = ( nz / (1.0 - nz) ) ;


  mat005.vem = ( (((fezz - ez) * (fezz - ez)) / (1.0 + ez)) * vemz ) ;

  mat005.wem = wem ;

  mat005.mem = mem ;


  mat005.vrm = ( (((fezz - ez) * (fezz - ez)) / (1.0 + ez)) * vrmz ) ;

  mat005.wrm = wrm ;

  mat005.mrm = mrm ;
	 

  // console.log( 'nz=' , nz , ' ez=' , ez , ' vm =' , mat005.vm ) ;
   
  for( sz = szn ; sz <= szx ; sz += szss )
   {

    mat005.nzs = ( nzs = (1.0 - nz) ) ;

    mat005.nzf = ( nzf = (nz * sz) ) ;

    mat005.nzg = ( nzg  = (nz * (1.0 - sz)) ) ;

    rz = ( (nzs * rzs) + (nzf * rzf) + (nzg * rzg) ) ;

    midnz = String( Math.round( nz * 100 ) ).padStart( 3 , '0' ) ;

    midsz = String( Math.round( sz * 100 ) ).padStart( 3 , '0' ) ;

    midv  = ( midbs  + '_' + midnz + '_' + midsz ) ;

    lcidv = ( lcidbs + '_' + midnz + '_' + midsz ) ;
   
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


