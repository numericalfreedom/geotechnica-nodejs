"use strict" ;

const short = true ;

const l     = require( './lsdynamat' ) ;

const ll    = new l.lsdynamat() ;



const ptf   = 1.00e4 ;

const rhos  = 2650.0 ;
const rhod  = 1900.0 ;

const vemz  =  27.00 ;
const wemz  =   0.60 ;
const memz  =   0.00 ;

const vrmz  =   5.00e3 ;
const wrmz  =   0.00 ;
const mrmz  =   0.00 ;


const fezz  = 2.97 ;
const ez    = ( (rhos / rhod) - 1.0 ) ;

const esc   = (- 1.0    ) ;
const ssc   = (  1.0e-6 ) ;

ll.nz       = ( ez / (1.0 + ez) ) ;
ll.sz       = 0.0 ;

ll.vem      = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

ll.vrm      = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

const pfn   = 'Oed_V1_rho1900kgm3_sv60MPa_dedt10_4_model.dat' ;

const pts   = [ 0.00 , 1.00e7 , 1.00e5 , 2.00e7 , 1.00e5 , 4.00e7 , 1.00e5 , 6.00e7 , 1.00e5 ] ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

