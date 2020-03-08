"use strict" ;

const short = true ;

const l  = require( './lsdynamat' ) ;

const ll = new l.lsdynamat() ;

const [ rvs , rvl ]  = ll.runlsdynamat() ;

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
