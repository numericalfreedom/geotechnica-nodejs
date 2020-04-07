"use strict" ;

const short = true ;

const l     = require( './lsdynamat' ) ;

const ll    = new l.lsdynamat() ;

const vemz  =    1.80e3 ;
const wemz  =    0.55 ;
const memz  =    0.00 ;

const vrmz  =    1.00e5 ;
const wrmz  =    0.00 ;
const mrmz  =    0.00 ;

const rhos  = 2650.00 ;
const fezz  =    3.00 ;

const ptf   =    1.00e4 ;
const esc   = (- 1.0   ) ;
const ssc   = ( 1.0e-6 ) ;

var   rhod  = undefined ;
var   ez    = undefined ;
var   nz    = undefined ;

var   pfn   = undefined ;


const pts   = [ 0.00 , 5.00e6 , 0.00 , 1.00e7 , 0.00 , 2.00e7 , 0.00 , 3.00e7 , 0.00 ] ;

const ezz   =    1.0 ;
const mez   =    3.0 ;


rhod        = 1900.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

console.log( "nzs=" , ll.nzs ) ;
console.log( "nzf=" , ll.nzf ) ;
console.log( "nzg=" , ll.nzg ) ;

ll.vem      = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
ll.vem      = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

ll.vrm      = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
ll.vrm      = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V1_rho1900kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;


rhod        = 1930.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

console.log( "nzs=" , ll.nzs ) ;
console.log( "nzf=" , ll.nzf ) ;
console.log( "nzg=" , ll.nzg ) ;

ll.vem      = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
ll.vem      = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

ll.vrm      = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
ll.vrm      = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V2_rho1900kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;


rhod        = 2000.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

console.log( "nzs=" , ll.nzs ) ;
console.log( "nzf=" , ll.nzf ) ;
console.log( "nzg=" , ll.nzg ) ;

ll.vem      = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
ll.vem      = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

ll.vrm      = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
ll.vrm      = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( (1.0 / (1.0 + ez)) , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V5_rho2000kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

