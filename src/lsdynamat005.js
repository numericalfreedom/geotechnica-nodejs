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

const rzsn  =   10     ;
const rzn   = 1800.00  ;
const rzx   = 2100.00  ;
const rzs   = ( (rzx - rzn) / rzsn ) ;

const szsn  =   10     ;
const szn   =    0.00  ;
const szx   =    1.00  ;
const szs   = ( (szx - szn) / szsn ) ;

const [ rs , rl ]  = mat005.lsdynamat005() ;

var i    = undefined ;
var j    = undefined ;
var line = undefined ;

console.log( '           e=          pt=          pe=          pn=           n=           s=           a=           b=          ns=          nf=          ng=         rrs=         rrf=         rrg=          rr=          rs=          rf=          rg=           r=' ) ;
console.log( '          (1)          (2)          (3)          (4)          (5)          (6)          (7)          (8)          (9)         (10)         (11)         (12)         (13)         (14)         (15)         (16)         (17)         (18)         (19)' ) ;

if( short )
 
  for( i = 0 ; i < rs.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rs[0].length ; ++j )

      line += ( '  ' + rs[i][j].toExponential(6) ) ;
     
else

  for( i = 0 ; i < rl.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rl[0].length ; ++j )

      line += ( '  ' + rl[i][j].toExponential(6) ) ;
