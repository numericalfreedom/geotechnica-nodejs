"use strict"

let    pe    = undefined ;
let    pes   = [ 0.0 , 1.0e7 , 0.0 , 2.0e7 , 0.0 , 3.0e7 , 0.0 , 4.0e7 , 0.0 , 5.0e7 , 0.0 ] ;

let    a     = undefined ;
let    dpt   = undefined ;
let    pt    = undefined ;

let    de    = undefined ;
let    dpe   = 1.0e3 ;
let    dpes  = undefined ;

let    e     = 0.0 ;
let    eel   = 0.0 ;
let    epl   = 0.0 ;

let    k     = undefined ;

let    kr    = 3.0e3 ;
let    pc    = 0.0 ;
let    pr    = 1.0e5 ;

let    mp    = 0.50 ;
let    mr    = 0.60 ;
let    n     = 0.50 ;
let    r     = 2.00 ;

const  as0   = 0.50 ;
const  af0   = 0.49 ;
const  ag0   = 0.01 ;

let    as    = as0 ;
let    af    = af0 ;
let    ag    = ag0 ;

const  gs    = 7.00 ;
const  gf    = 3.00 ;
const  gg    = 1.40 ;

const  cs0   = 5000.0 ;
const  cf0   = 1450.0 ;
const  cg0   =  333.0 ;

const  rs0   = 2650.0 ;
const  rf0   = 1000.0 ;
const  rg0   =    1.3 ;

let    rs    = rs0 ;
let    rf    = rf0 ;
let    rg    = rg0 ;

const  rcs02 = ( rs0 * cs0 * cs0 ) ;
const  rcf02 = ( rf0 * cf0 * cf0 ) ;
const  rcg02 = ( rg0 * cg0 * cg0 ) ;

let    ks    = undefined ;
let    kf    = undefined ;
let    kg    = undefined ;
let    kp    = undefined ;

const  rho0  = 2000.0 ;
let    rho   = undefined ;

const  p0    = 1.0e5 ;
let    dp    = undefined ;
let    p     = p0 ;

let    r0r   = undefined ;

let    i     = undefined ;
let    ii    = undefined ;


for( pt = 0 , i = 0 , ii = 1 ; (i < (pes.length - 1)) ; ++i , ++ii )

 for( pe = pes[i] , dpes = (dpe * Math.sign( pes[ii] - pes[i] )) ; pe != pes[ii] ; pe += dpes )
  {

   if( pc < pe )
    {

     k  = ( kr * pr * Math.pow( ((pe + (n * (pc = pe)) + pr) / pr) , mp ) ) ;

     if( mr != 1.0 )

      epl = ( e - (eel = ((Math.pow( ((pc + (n * pc) + pr) / pr) , (1 - mr) ) - Math.pow( (((n * pc) + pr) / pr) , (1 - mr) )) / (r * kr * (1 - mr)))) ) ;

     else

      epl = ( e - (eel = (Math.log( (pc + (n * pc) + pr) / ((n * pc) + pr) ) / (r * kr))) ) ;

    } // end if +

   else
    {

     k = ( r * kr * pr * Math.pow( ((pe + (n * pc) + pr) / pr) , mr ) ) ;

    } // end else


   de = ( dpes / k ) ;

   e += de ;


   rho = ( rho0 / (1 - e) ) ;


   ks = ( rcs02 * Math.pow( (rs / rs0) , (gs + 1) ) ) ;

   kf = ( rcf02 * Math.pow( (rf / rf0) , (gf + 1) ) ) ;

   kg = ( gg * p0 * Math.pow( (rg / rg0) , (gg + 1) ) ) ;


   kp = ( (ks * kf * kg) / ((as * kf * kg) + (af * ks * kg) + (ag * ks * kf) ) ) ;


   dp  = ( kp * de ) ;

   p  += dp ;

   a   = ( 1 - (k / ks) ) ;


   dpt = ( dpes + (a * dp) ) ;

   pt += dpt ;


   as = ( as0 * Math.pow( ((gs * ((p - p0) / rcs02)) + 1) , (-1 / gs) ) ) ;

   af = ( af0 * Math.pow( ((gf * ((p - p0) / rcf02)) + 1) , (-1 / gf) ) ) ;

   ag = ( ag0 * Math.pow( (p / p0) , (-1 / gg) ) ) ;


   rs = ( rs0 * (as0 / as) ) ;

   rf = ( rf0 * (af0 / af) ) ;

   rg = ( rg0 * (ag0 / ag) ) ;


   console.log( pe , p , pt , pc , k , e , eel , epl , as , af , ag , a ) ;


  } ; // end for()


