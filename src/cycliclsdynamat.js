"use strict" ;

const short = true ;

const l     = require( './lsdynamat' ) ;

const ll    = new l.lsdynamat() ;

const vemz  =    4.25e3 ;
const wemz  =    0.55 ;
const memz  =    0.00 ;

const vrmz  =    2.00e5 ;
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
// const mez   =    4.9 ;
const mez   =   10.00 ;

/*********************************************************************/
/*********************************************************************/

rhod        = 1900.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;

ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V1_rho1900kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log() ;
console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1900.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V2_rho1900kgm3_sv60MPa_dedt10_3_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1930.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V2_rho1930kgm3_sv60MPa_dedt10_3_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1900.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V3_rho1900kgm3_sv60MPa_dedt10_2_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1950.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V3_rho1950kgm3_sv60MPa_dedt10_2_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1900.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V4_rho1900kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 1870.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V4_rho1870kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/

rhod        = 2000.0 ;
ez          = ( (rhos / rhod) - 1.0 ) ;
nz          = ( ez / (1.0 + ez) ) ;

ll.nzs      = ( 1.0 - nz ) ;
ll.nzf      = 0.0 ;
ll.nzg      = nz ;

// ll.vem   = ( (((fezz - ez) * (fezz - ez))) * vemz ) ;
// ll.vem   = ( vemz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vem   = ( vemz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vem      = ( vemz * Math.pow( ll.nzs , mez ) ) ;
ll.wem      = wemz ;
ll.mem      = memz ;

// ll.vrm   = ( (((fezz - ez) * (fezz - ez))) * vrmz ) ;
// ll.vrm   = ( vrmz * Math.pow( (ezz / (ezz + ez)) , mez ) ) ;
// ll.vrm   = ( vrmz * Math.pow( ((ezz - ez) / ezz) , mez ) ) ;
ll.vrm      = ( vrmz * Math.pow( ll.nzs , mez ) ) ;
ll.wrm      = wrmz ;
ll.mrm      = mrmz ;

pfn         = 'Oed_V5_rho2000kgm3_sv60MPa_dedt10_4_model.dat' ;

ll.cycliclsdynamat( pfn , pts , ptf , esc , ssc ) ;

console.log( "pfn=" , pfn ) ;
console.log( "nzs=" , ll.nzs.toFixed( 4 ) ) ;
console.log( "nzf=" , ll.nzf.toFixed( 4 ) ) ;
console.log( "nzg=" , ll.nzg.toFixed( 4 ) ) ;
console.log( "ez =" , ez ) ;
console.log() ;


/*********************************************************************/
/*********************************************************************/
