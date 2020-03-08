"use strict" ;

const short = true ;

const l  = require( './lsdynamat' ) ;

const ll = new l.lsdynamat() ;

const [ rs , rl ]  = ll.runlsdynamat() ;

var i    = undefined ;
var j    = undefined ;
var line = undefined ;

console.log( '           e=          pt=          pe=          pn=           n=           s=           a=           b=          ns=          nf=          ng=         rrs=         rrf=         rrg=         rrm=          rr=          rs=          rf=          rg=           r=        reps=' ) ;
console.log( '          (1)          (2)          (3)          (4)          (5)          (6)          (7)          (8)          (9)         (10)         (11)         (12)         (13)         (14)         (15)         (16)         (17)         (18)         (19)         (20)         (21)' ) ;

if( short )
 
  for( i = 0 ; i < rs.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rs[0].length ; ++j )

      line += ( '  ' + rs[i][j].toExponential(6) ) ;
     
else

  for( i = 0 ; i < rl.length ; ++i , console.log( line ) )

    for( line = '' , j = 0 ; j < rl[0].length ; ++j )

      line += ( '  ' + rl[i][j].toExponential(6) ) ;
