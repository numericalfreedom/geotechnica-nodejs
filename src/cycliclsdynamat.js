"use strict" ;

const short = true ;

const l     = require( './lsdynamat' ) ;

const ll    = new l.lsdynamat() ;

const pfn   = 'test.dat' ;

const pts   = [ 0.00 , 1.00e6 , 1.00e5 , 1.00e7 , 1.00e5 , 2.00e7 , 1.00e5 , 1.00e8 , 1.00e5 ] ;

const ptf   = 1.00e4 ;

ll.cycliclsdynamat( pfn , pts , ptf ) ;

