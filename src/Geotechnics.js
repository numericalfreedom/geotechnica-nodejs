'use strict' ;


const g = 10.0 ;


module.exports = { g , radians , degrees , karp , wedgeslope , groundfailure , punchfailure , izzFz , izzqzAQ , noekkentved } ;


/**
 *  Degrees to radians transformation
 *
 *  @param  {Number}  degrees - Angle in degrees
 *  @return {Number}  Angle in radians
 *  @customfunction
 */

function radians( d )
 {

  return( Math.PI * (d / 180.00) ) ;

 }


/**
 *  Radians to degrees transformation
 *
 *  @param  {Number}  radians - Angle in radians
 *  @return {Number}  Angle in degrees
 *  @customfunction
 */

function degrees( r )
 {

  return( 180.00 * (r / Math.PI) ) ;

 }


/**
 *
 *  Calculation of earth pressure coefficients
 *
 *  @function
 *  @name karp
 *  @param  {Array}  x - Input data field
 *  @return {Array}      Earth pressure coefficients
 *  @customfunction
 *
 */

function karp( x )
 {

  const c_0_0 = 0;
  
  const c_r   = 0 ;
  const c_cc  = 0 ;
  const c_ap  = 1 ;
  const c_bt  = 2 ;
  const c_dt  = 3 ;
  const c_ph  = 4 ;

  const r_kgh = 0 ;
  const r_kph = 1 ;
  const r_kch = 2 ;

  const r_kgv = 3 ;
  const r_kpv = 4 ;
  const r_kcv = 5 ;

  const r_tag = 6 ;
  const r_tpg = 7 ;

  var cc    = x[ c_cc ][ c_r ] ;
  var aprad = radians( x[ c_ap ][ c_r ] ) ;
  var btrad = radians( x[ c_bt ][ c_r ] ) ;
  var dtrad = radians( x[ c_dt ][ c_r ] ) ;
  var phrad = radians( x[ c_ph ][ c_r ] ) ; if( phrad < c_0_0 )  phrad = c_0_0 ;

  var sph   = Math.sin( phrad ) ;
  var sph2  = ( sph * sph ) ;

  var cap   = Math.cos( aprad ) ;
  var capbt = Math.cos( aprad - btrad ) ;

  var tap   = Math.tan( aprad ) ;
  var tap1  = 0 ;

  var sbt   = Math.sin( btrad ) ;
  var sbt2  = ( sbt * sbt ) ;

  var cbt   = Math.cos( btrad ) ;
  var cbt2  = ( cbt * cbt ) ;

  var tbt   = Math.tan( btrad ) ;
  var tbt2  = ( tbt * tbt ) ;

  var cph   = Math.cos( phrad ) ;
  var cph2  = ( cph * cph ) ;

  var tph   = Math.tan( phrad ) ;

  var tdt   = Math.tan( dtrad ) ;
  var tapdt = Math.tan( aprad + dtrad ) ;
  var sapdt = Math.sin( aprad + dtrad ) ;
  var capdt = Math.cos( aprad + dtrad ) ;
  
  var kg    = 0;
  var kp    = 0;
  var kc    = 0;
  var ig    = 0;
  var ip    = 0;
  var ic    = 0;
  var gg    = 0;
  var gp    = 0;
  var gc    = 0;
  var tg    = 0;
  var tp    = 0;
  var tc    = 0;
       
  var kgh   = 0;
  var kph   = 0;
  var kch   = 0;

  var kgv   = 0;
  var kpv   = 0;
  var kcv   = 0;

  var tag   = 0;
  var tpg   = 0;

  switch( cc )
   {

    case 0: // Earth pressure at rest - simplified model
     kph = ( ((1 - sph) + ((cph + sph - 1) * (btrad / phrad))) );
     kgh = ( kph * cbt );
     kch = 0;
     break;

    case 1: // Earth pressure at rest - rigorous model
     kgh  = ( ((sph - sph2) / (sph - sbt2)) * cbt2 );
     tap1 = Math.sqrt( kgh / (1 + (kgh * tbt2)) );
     kgh  = ( kgh * (1 - Math.abs( tap * tbt )) * ((1 + (tap1 * tbt)) / (1 + (tap1 * tdt))) );
     kph  = ( (cap * cbt * kgh) / capbt );
     kch  = 0;
     break;

    case 2: // Active earth pressure RANKINE
     kph = Math.sqrt( cbt2 - cph2 );
     kph = ( ((cbt - kph) / (cbt + kph)) * cbt );
     kgh = ( kph * cbt );
     if( Math.abs( btrad ) > 0 )  kch = 0;  else  kch = (- 2 * Math.sqrt( kgh ) );
     tag = Degrees( (Math.PI / 4) + (phrad / 2) );
     break;

    case 3: // Passive earth pressure RANKINE
     kph = Math.sqrt( cbt2 - cph2 );
     kph = ( ((cbt + kph) / (cbt - kph)) * cbt );
     kgh = ( kph * cbt );
     if( Math.abs( btrad ) > 0 )  kch = 0;  else  kch = ( 2 * Math.sqrt( kgh ) );
     tpg = Degrees( (Math.PI / 4) - (phrad / 2) );
     break;

    case 4: // Active earth pressure COULOMB
     kgh  = ( (Math.sin( phrad + dtrad ) * Math.sin( phrad - btrad )) / (Math.cos( aprad - btrad ) * Math.cos( aprad + dtrad )) );
     kgh  = ( Math.cos( phrad - aprad ) / (Math.cos( aprad ) * (1 + Math.sqrt( kgh ))) );
     kgh *= kgh;
     kph  = ( (Math.cos( aprad ) * Math.cos( btrad ) * kgh) / Math.cos( aprad - btrad ) );
     kch  = ( (1 + Math.sin( phrad + aprad + dtrad - btrad )) * Math.cos( aprad ) );
     kch  = (- (2 * Math.cos( aprad - btrad ) * Math.cos( phrad ) * Math.cos( aprad + dtrad )) / kch );
     tag  = Math.sqrt( (Math.sin( phrad + dtrad ) * Math.cos( aprad - btrad )) / (Math.sin( phrad - btrad ) * Math.cos( aprad + dtrad )) );
     tag  = Math.atan2( Math.cos( phrad - aprad ) , (tag + Math.sin( phrad - aprad )) );
     tag  = Degrees( tag + phrad )
     break;

    case 5: // Passive earth pressure COULOMB
     kgh = ( (Math.sin( phrad - dtrad ) * Math.sin( phrad + btrad )) / (Math.cos( aprad - btrad ) * Math.cos( aprad + dtrad )) );
     kgh = ( Math.cos( phrad + aprad ) / (Math.cos( aprad ) * (1 - Math.sqrt( kgh ))) );
     kgh *= kgh;
     kph = ( (Math.cos( aprad ) * Math.cos( btrad ) * kgh) / Math.cos( aprad - btrad ) );
     kch = ( (1 - Math.sin( phrad - aprad - dtrad + btrad )) * Math.cos( aprad ) );
     kch = ( (2 * Math.cos( aprad - btrad ) * Math.cos( phrad ) * Math.cos( aprad + dtrad )) / kch );
     tpg = Math.sqrt( (Math.sin( phrad - dtrad ) * Math.cos( aprad - btrad )) / (Math.sin( phrad + btrad ) * Math.cos( aprad + dtrad )) );
     tpg = Math.atan2( Math.cos( phrad + aprad ) , (tpg - Math.sin( phrad + aprad )) );
     tpg = Degrees( tpg - phrad );
     break;
     
    case 6: // Passive earth pressure SOKOLOVSKI/PREGL
     if( phrad > 0.0 )
      {
       kg = ( (1.0 + sph) / (1.0 - sph) );
       kp = kg;
       kc = ( (kp - 1.0) / tph );
       if( dtrad <= 0.0 )
        {
         ig = Math.pow( (1.0 - (0.53 * dtrad)) , (0.26 + (5.96 * phrad)) );
         ip = Math.pow( (1.0 - (1.33 * dtrad)) , (0.08 + (2.37 * phrad)) );
         ic = ip;
        } // end if() +
       else
        {
         ig = Math.pow( (1.0 + (0.41 * dtrad)) , (- 7.13) );
         ip = Math.pow( (1.0 - (0.72 * dtrad)) , (2.81) );
         ic = Math.pow( (1.0 + (4.46 * dtrad * tph)) , ((- 1.14) + (0.57 * phrad)) );
        }; // end else    
       if( btrad <= 0.0 )
        {
         gg = Math.pow( (1.0 + (0.73 * btrad)) , (2.89) );
         gp = Math.pow( (1.0 + (1.16 * btrad)) , (1.57) );
         gc = Math.pow( (1.0 + (0.001 * btrad * phrad)) , (205.4 + (2232 * phrad)) );
        } // end if() +
       else
        {
         gg = Math.pow( (1.0 + (0.35 * btrad)) , (0.42 + (8.15 * phrad)) );
         gp = Math.pow( (1.0 + (3.84 * btrad)) , (0.98 * phrad) );
         gc = Math.exp( 2.0 * btrad * tph );
        }; // end else
       if( aprad <= 0.0 )
        {
         tg = Math.pow( (1.0 + (0.72 * aprad * tph)) , ((- 3.51) + (1.03 * phrad)) );
         tp = ( Math.exp(- 2.0 * aprad * tph ) / cap );
         tc = tp
        } // end if() +  
       else
        {
         tg = Math.pow( (1.0 - (0.0012 * aprad * tph)) , (2910 - (1958 * phrad)) );
         tp = ( Math.exp(- 2.0 * aprad * tph ) / cap );
         tc = tp
        }; // end else
      } // end if() +
     else
      {
       kg = 1.0 ;
       kp = 1.0 ;
       kc = 2.0 ;
       ig = 1.0 ;
       ip = 1.0 ;
       ic = 1.0 ;
       gg = 1.0 ;
       gp = 1.0 ;
       gc = ( 1.0 + btrad ) ;
       tg = 1.0 ;
       tp = 1.0 ;
       tc = ( (1.0 - aprad) / cap ) ;
      }; // end else
     kg  *= ( ig * gg * tg ) ;
     kp  *= ( ip * gp * tp ) ;
     kc  *= ( ic * gc * tc ) ;
     kgh  = ( kg * capdt ) ;
     kph  = ( kp * capdt ) ; 
     kch  = ( kc * capdt ) ;
     kgv  = ( kg * sapdt ) ;
     kpv  = ( kp * sapdt ) ; 
     kcv  = ( kc * sapdt ) ;
     tpg  = ( (Math.PI / 4.0) - (phrad / 2.0) ) ;
     break;
     
    default:
     kgh = kph = kch = 0 ;

   }; // end switch( cc )

  kgv = ( kgh * tapdt ) ;
  kpv = ( kph * tapdt ) ;
  kcv = ( kch * tapdt ) ;

  return( [ kgh , kph , kch , kgv , kpv , kcv , tag , tpg ] );

 }


/**
 *
 *  Tensile crack depth and minimum earth pressure depth calculation
 *
 *  @function
 *  @name ztn
 *  @param  {Array}  x - Input data field
 *  @return {Array}      Tensile crack depth and minimum earth pressure depth values
 *  @customfunction
 *
 */

function ztn( x , y , kghn , svg )
 {

  const c_r   = 0 ;

  const c_c   = 0 ;
  const c_p   = 1 ;
  const c_gm  = 2 ;

  const c_kgh = 0 ;
  const c_kph = 1 ;
  const c_kch = 2 ;

  var   c     = x[ c_c   ][ c_r ] ;
  var   p     = x[ c_p   ][ c_r ] ;
  var   gm    = x[ c_gm  ][ c_r ] ;
  
  var   kgh   = y[ c_kgh ][ c_r ] ;
  var   kph   = y[ c_kph ][ c_r ] ;
  var   kch   = y[ c_kch ][ c_r ] ;

  if( ! svg )  var svg = 0 ;
    
  return( [ (- ((kgh * svg) + (p * kph) + (c * kch)) / (kgh * gm) ) , (- (((kgh - kghn) * svg) + (c * kch)) / ((kgh - kghn) * gm) ) ] ) ;

 } // ztn() : Tensile crack depth and minimum earth pressure depth




function fps( ap , bt , th )
 {
   
  var aprad = radians( ap ) ;
  var btrad = radians( bt ) ;
  var thrad = radians( th ) ;

  return( (Math.sin( thrad - btrad ) / Math.cos( thrad - aprad )) * Math.cos( aprad ) ) ;

 } // fps() : depth factor of spread surface load in COULOMB earth pressure problem



function fhs( apt , apb , bt )
 {
   
  var aptrad = radians( apt ) ;
  var apbrad = radians( apb ) ;
  var btrad  = radians( bt  ) ;

  return( (Math.sin( aptrad - apbrad ) * Math.sin( btrad )) / (Math.cos( apbrad - btrad ) * Math.cos( aptrad )) ) ;

 } // fhb() : height factor due to different wall surface inclination in COULOMB earth pressure problem


/**
 * 
 * Slope stability computation with the wedge method
 *
 * @function
 * @name wedgeslope
 *  
 */

function wedgeslope( x , th )
 {
  
  const c_r      =   0 ;

  const c_h      =   0 ;
  const c_bt     =   1 ;

  const c_rh     =   2 ;
  const c_phk    =   3 ;
  const c_ck     =   4 ;

  const c_pvgk   =   5 ;
  const c_apvgk  =   6 ;
  const c_bpvgk  =   7 ;

  const c_qvqr   =   8 ;
  const c_aqvqr  =   9 ;
  const c_bqvqr  =  10 ;

  const c_phgk   =  11 ;
  const c_aphgk  =  12 ;
  const c_bphgk  =  13 ;

  const c_qhqr   =  14 ;
  const c_aqhqr  =  15 ;
  const c_bqhqr  =  16 ;

  const c_fvgk   =  17 ;
  const c_afvgk  =  18 ;

  const c_fvqr   =  19 ;
  const c_afvqr  =  20 ;

  const c_fhgk   =  21 ;
  const c_afhgk  =  22 ;

  const c_fhqr   =  23 ;
  const c_afhqr  =  24 ;

  const c_gmph   =  25 ;
  const c_gmc    =  26 ;
  const c_gmg    =  27 ;
  const c_gmq    =  28 ;

  const r_r      =   0 ;

  const r_phd    =   0 ;
  const r_cd     =   1 ;

  const r_bapvgk =   2 ;
  const r_baqvqr =   3 ;
  const r_baphgk =   4 ;
  const r_baqhqr =   5 ;
  const r_bafvgk =   6 ;
  const r_bafvqr =   7 ;
  const r_bafhgk =   8 ;
  const r_bafhqr =   9 ;

  const r_l      =  10 ;
  const r_a      =  11 ;

  const r_gk     =  12 ;
  const r_fvk    =  13 ;
  const r_fhk    =  14 ;
  const r_fpk    =  15 ;
  const r_fqk    =  16 ;
  const r_tk     =  17 ;
  const r_nk     =  18 ;
  const r_fek    =  19 ;
  const r_frk    =  20 ;
  const r_eta    =  21 ;	 

  const r_gd     =  22 ;
  const r_fvd    =  23 ;
  const r_fhd    =  24 ;
  const r_fpd    =  25 ;
  const r_fqd    =  26 ;
  const r_td     =  27 ;
  const r_nd     =  28 ;
  const r_fed    =  29 ;
  const r_frd    =  30 ;
  const r_mu     =  31 ;

  const r_rx     =  32 ;

  const c_g      =  10.00 ;


  var   r       = new Array( r_rx ) ;

  for( var i = 0; i < r_rx; ++i )  r[i] = new Array( 1 ) ;

  const h       = x[ c_h     ][ c_r ] ;
  const btrad   = radians( x[ c_bt ][ c_r ] ) ;

  const rh      = x[ c_rh    ][ c_r ] ;
  const phkrad  = radians( x[ c_phk ][ c_r ] ) ;
  const ck      = x[ c_ck    ][ c_r ] ;

  const pvgk    =  x[ c_pvgk  ][ c_r ] ;
  const apvgk   =  x[ c_apvgk ][ c_r ] ;
  const bpvgk   =  x[ c_bpvgk ][ c_r ] ;

  const qvqr    =  x[ c_qvqr  ][ c_r ] ;
  const aqvqr   =  x[ c_aqvqr ][ c_r ] ;
  const bqvqr   =  x[ c_bqvqr ][ c_r ] ;

  const phgk    =  x[ c_phgk  ][ c_r ] ;
  const aphgk   =  x[ c_aphgk ][ c_r ] ;
  const bphgk   =  x[ c_bphgk ][ c_r ] ;

  const qhqr    =  x[ c_qhqr  ][ c_r ] ;
  const aqhqr   =  x[ c_aqhqr ][ c_r ] ;
  const bqhqr   =  x[ c_bqhqr ][ c_r ] ;
  
  const fvgk    =  x[ c_fvgk  ][ c_r ] ;
  const afvgk   =  x[ c_afvgk ][ c_r ] ;

  const fvqr    =  x[ c_fvqr  ][ c_r ] ;
  const afvqr   =  x[ c_afvqr ][ c_r ] ;

  const fhgk    =  x[ c_fhgk  ][ c_r ] ;
  const afhgk   =  x[ c_afhgk ][ c_r ] ;

  const fhqr    =  x[ c_fhqr  ][ c_r ] ;
  const afhqr   =  x[ c_afhqr ][ c_r ] ;
 
  const gmph    =  x[ c_gmph  ][ c_r ] ;
  const gmc     =  x[ c_gmc   ][ c_r ] ;
  const gmg     =  x[ c_gmg   ][ c_r ] ;
  const gmq     =  x[ c_gmq   ][ c_r ] ;

  const thrad   = radians( th ) ;

  const ath     = ( (h / Math.tan( thrad )) - (h / Math.tan( btrad )) ) ;

  var   phdrad  = Math.atan( Math.tan( phkrad ) / gmph ) ;
  var   phd     = degrees( phdrad ) ;
  var   cd      = ( ck / gmc ) ;

  var   bapvgk  = undefined ;
  var   baqvqr  = undefined ;
  var   baphgk  = undefined ;
  var   baqhqr  = undefined ;
  var   bafvgk  = undefined ;
  var   bafvqr  = undefined ;
  var   bafhgk  = undefined ;
  var   bafhqr  = undefined ;

  var   l       = undefined ;
  var   a       = undefined ;

  var   gk      = undefined ;
  var   fvk     = undefined ;
  var   fhk     = undefined ;
  var   fpk     = undefined ;
  var   fqk     = undefined ;
  var   tk      = undefined ;
  var   nk      = undefined ;
  var   fek     = undefined ;
  var   frk     = undefined ;

  var   gd      = undefined ;
  var   fvd     = undefined ;
  var   fhd     = undefined ;
  var   fpd     = undefined ;
  var   fqd     = undefined ;
  var   td      = undefined ;
  var   nd      = undefined ;
  var   fed     = undefined ;
  var   frd     = undefined ;

  var   eta     = undefined ;
  var   mu      = undefined ;

  const cab     = function( c , a , b ) { var d ; if( c > (a + b) )  d = b ;  else  if( c > a )  d = (c - a) ;  else  d = 0.0 ; return( d ) ; } ;

  bapvgk = cab( ath , apvgk , bpvgk ) ;
  baqvqr = cab( ath , aqvqr , bqvqr ) ;
  baphgk = cab( ath , aphgk , bphgk ) ;
  baqhqr = cab( ath , aqhqr , bqhqr ) ;

  if( ath > afvgk )  bafvgk = 1.0 ;  else  bafvgk = 0.0 ;
  if( ath > afvqr )  bafvqr = 1.0 ;  else  bafvqr = 0.0 ;
  if( ath > afhgk )  bafhgk = 1.0 ;  else  bafhgk = 0.0 ;
  if( ath > afhqr )  bafhqr = 1.0 ;  else  bafhqr = 0.0 ;


  console.log( "ath="    , ath    ) ;
  console.log( "bapvgk=" , bapvgk ) ;
  console.log( "aqvqr="  , aqvqr  ) ;
  console.log( "bqvqr="  , bqvqr  ) ;
  console.log( "baqvqr=" , baqvqr ) ;
  console.log( "baphgk=" , baphgk ) ;
  console.log( "baqhqr=" , baqhqr ) ;


  l  = ( h / Math.sin( thrad ) ) ;

  a  = ( (1 / 2) * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad ))) ) ;


  gk = ( a * rh * g ) ;

  fvk = ( (pvgk * bapvgk) + (qvqr * baqvqr) + (fvgk * bafvgk) + (fvqr * bafvqr) ) ;

  fhk = ( (phgk * baphgk) + (qhqr * baqhqr) + fhgk + fhqr ) ;

  fpk = ( gk + fvk ) ;

  fqk = ( fhk ) ;

  fek = tk = ( (fpk * Math.sin( thrad )) - (fqk * Math.cos( thrad )) ) ;

  nk  =      ( (fpk * Math.cos( thrad )) + (fqk * Math.sin( thrad )) ) ;

  frk = ( (nk * Math.tan( phkrad )) + (ck * l) );

  if( fek )  eta = ( frk / fek ) ;  else  eta = 0.0 ;


  gd  = ( gmg * (1 / 2) * rh * c_g * h * h * ((1 / Math.tan( thrad )) - (1 / Math.tan( btrad ))) ) ;

  fvd = ( (gmg * pvgk * bapvgk) + (gmq * qvqr * baqvqr) + (gmg * fvgk * bafvgk) + (gmq * fvqr * bafvqr) ) ;

  fhd = ( (gmg * phgk * baphgk) + (gmq * qhqr * baqhqr) + (gmg * fhgk) + (gmq * fhqr) ) ;

  fpd = ( gd + fvd ) ;

  fqd = ( fhd ) ;

  fed = td = ( (fpd * Math.sin( thrad )) - (fqd * Math.cos( thrad )) );

  nd  =      ( (fpd * Math.cos( thrad )) + (fqd * Math.sin( thrad )) ) ;

  frd = ( (nd * Math.tan( phdrad )) + (cd * l) ) ;

  if( frd )  mu = ( fed / frd ) ;  else  mu = 0.0 ;


  r[ r_phd    ][ r_r ] = phd ;
  r[ r_cd     ][ r_r ] = cd ;

  r[ r_bapvgk ][ r_r ] = bapvgk ;
  r[ r_baqvqr ][ r_r ] = baqvqr ;
  r[ r_baphgk ][ r_r ] = baphgk ;
  r[ r_baqhqr ][ r_r ] = baqhqr ;
  r[ r_bafvgk ][ r_r ] = bafvgk ;
  r[ r_bafvqr ][ r_r ] = bafvqr ;
  r[ r_bafhgk ][ r_r ] = bafhgk ;
  r[ r_bafhqr ][ r_r ] = bafhqr ;

  r[ r_l      ][ r_r ] = l ;
  r[ r_a      ][ r_r ] = a ;

  r[ r_gk     ][ r_r ] = gk ;
  r[ r_fvk    ][ r_r ] = fvk ;
  r[ r_fhk    ][ r_r ] = fhk ;
  r[ r_fpk    ][ r_r ] = fpk ;
  r[ r_fqk    ][ r_r ] = fqk ;
  r[ r_tk     ][ r_r ] = tk ;
  r[ r_nk     ][ r_r ] = nk ;
  r[ r_fek    ][ r_r ] = fek ;
  r[ r_frk    ][ r_r ] = frk ;
  r[ r_eta    ][ r_r ] = eta ;

  r[ r_gd     ][ r_r ] = gd ;
  r[ r_fvd    ][ r_r ] = fvd ;
  r[ r_fhd    ][ r_r ] = fhd ;
  r[ r_fpd    ][ r_r ] = fpd ;
  r[ r_fqd    ][ r_r ] = fqd ;
  r[ r_td     ][ r_r ] = td ;
  r[ r_nd     ][ r_r ] = nd ;
  r[ r_fed    ][ r_r ] = fed ;
  r[ r_frd    ][ r_r ] = frd ;
  r[ r_mu     ][ r_r ] = mu ;


  return( r );

 
 }; // end function wedgeslope()



function groundfailure( x )
 {
 
  const c_0_0  =  1.0e-6 ;

  const c_r    =  0 ;
  const c_ff   =  0 ;
  const c_ph   =  1 ;
  const c_c    =  2 ;
  const c_a    =  3 ;
  const c_b    =  4 ;
  const c_g1   =  5 ;
  const c_d    =  6 ;
  const c_g2   =  7 ;
  const c_ea   =  8 ;
  const c_eb   =  9 ;
  const c_dt   = 10 ;
  const c_ap   = 11 ;
  const c_bt   = 12 ;
  const c_w    = 13 ;
  const c_ngk  = 14 ;
  const c_tgk  = 15 ;
  const c_nqr  = 16 ;
  const c_tqr  = 17 ;
  const c_gg   = 18 ;
  const c_gq   = 19 ;
  const c_gr   = 20 ;

  const r_n   =  0 ;
  const r_v   =  1 ;
  const r_i   =  2 ;
  const r_l   =  3 ;
  const r_x   =  4 ;
  const r_f   =  5 ;
  const r_r   =  6 ;

  const r_b   =  0 ;
  const r_d   =  1 ;
  const r_c   =  2 ;

  const r_ed  =  0 ;
  const r_rd  =  1 ;
  const r_m   =  2 ;

  const r_rc  =  3 ;
  const r_rr  =  7 ;
  
  var   i     =  0 ;

  var r  = new Array( r_rr ) ;
  
  for( i = 0 ; i < r_rr ; r[i] = new Array( r_rc ) , ++i ) ;

  var ff   = x[ c_ff  ][ c_r ] ;
  var ph   = x[ c_ph  ][ c_r ] ;
  var c    = x[ c_c   ][ c_r ] ;
  var a    = x[ c_a   ][ c_r ] ;
  var b    = x[ c_b   ][ c_r ] ;
  var g1   = x[ c_g1  ][ c_r ] ;
  var d    = x[ c_d   ][ c_r ] ;
  var g2   = x[ c_g2  ][ c_r ] ;
  var ea   = x[ c_ea  ][ c_r ] ;
  var eb   = x[ c_eb  ][ c_r ] ;
  var dt   = x[ c_dt  ][ c_r ] ;
  var ap   = x[ c_ap  ][ c_r ] ;
  var bt   = x[ c_bt  ][ c_r ] ;
  var w    = x[ c_w   ][ c_r ] ;
  var ngk  = x[ c_ngk ][ c_r ] ;
  var tgk  = x[ c_tgk ][ c_r ] ;
  var nqr  = x[ c_nqr ][ c_r ] ;
  var tqr  = x[ c_tqr ][ c_r ] ;
  var gg   = x[ c_gg  ][ c_r ] ;
  var gq   = x[ c_gq  ][ c_r ] ;
  var gr   = x[ c_gr  ][ c_r ] ;

  var phrad = radians( ph ) ;
  var dtrad = radians( dt ) ;
  var aprad = radians( ap ) ;
  var btrad = radians( bt ) ;
  var wrad  = radians(  w ) ;

  var nk    = ( ngk + nqr ) ;
  var tk    = ( tgk + tqr ) ;

  var phvrad = 0 ;

  var kp     = 0 ;
  var vd     = 0 ;
  var xd     = 0 ;
  var ib     = 0 ;
  var id     = 0 ;

  var nd     = 0 ;
  var nb     = 0 ;
  var nc     = 0 ;
  
  var ma     = 0 ;
  var mb     = 0 ;
  var m      = 0 ;

  var af    = 0 ;

  if( phrad > 0.0 )  phvrad = phrad ;  else  phvrad = c_0_0 ;

  kp = Math.tan( (Math.PI / 4.0) + (phvrad / 2.0) ) ;
  
  nd = ( Math.exp( Math.PI * Math.tan( phvrad ) ) * kp * kp ) ;  r[r_n][r_d] = nd ;  // Parameter Nd0
  
  nc = ( (nd - 1.0) / Math.tan( phvrad ) ) ;  r[r_n][r_c] = nc ;  // Parameter Nc0

  nb = ( (nd - 1.0) * Math.tan( phvrad ) ) ;  r[r_n][r_n] = nb ;  // Parameter Nb0

  if( ea > 0.0 )  a -= ( 2.0 * ea ) ;

  if( eb > 0.0 )  b -= ( 2.0 * eb ) ;

  // Foundation form parameter V:
  
  switch( ff )
   {
   
    default:
    case 1:
 
     r[r_v][r_b] = r[r_v][r_d] = r[r_v][r_c] = 1.0 ;
    
     break ;
    
    case 2:

     r[r_v][r_b] = ( 1.0 - (0.3 * (b / a)) ) ;

     r[r_v][r_d] = vd = ( 1.0 + ((b / a) * Math.sin( phrad )) ) ;
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) ) ;  else  r[r_v][r_c] = ( 1.0 + (0.2 * (b / a)) ) ;
    
     break ;
    
    case 3:

     r[r_v][r_b] = 0.7 ;
     
     r[r_v][r_d] = vd = ( 1.0 + Math.sin( phrad ) ) ;
     
     if( frad )  r[r_v][r_c] = ( ((vd * nd) - 1) / (nd - 1) ) ;  else  r[r_v][r_c] = 1.2 ;
   
     break ;
   
   } ; // end switch( ff )


  // Exponent M for load inclination parameter I:

  switch( ff )
   {
   
    default:
    case 1:

     m = 2.0 ;
    
     break ;
    
    case 2:
    case 3:

     ma = ( (2.0 + (a / b)) / (1 + (a / b)) ) ;

     mb = ( (2.0 + (b / a)) / (1 + (b / a)) ) ;

     m  = ( (ma * Math.cos( wrad ) * Math.cos( wrad )) + (mb * Math.sin( wrad ) * Math.sin( wrad )) ) ;

     break ;
   
   } ; // end switch( ff )


  // Load inclination parameter I:

  if( phrad > 0.0 )
   {
     
    if( dtrad > 0.0 )

     ib = Math.pow( (1.0 - Math.tan( dtrad )) , (m + 1.0) ) ;

    else

     ib = Math.pow( (Math.cos( dtrad ) * (1 - (0.04 * dt))) , (0.64 + (0.028 * ph)) ) ;

    r[r_i][r_b] = ib ;

    if( dtrad > 0.0 )

     id = Math.pow( (1.0 - Math.tan( dtrad )) , m ) ;

    else

     id = Math.pow( (Math.cos( dtrad ) * (1.0 - (0.0244 * dt))) , (0.03 + (0.04 * ph)) ) ;

    r[r_i][r_d] = id ;

    r[r_i][r_c] = ( ((id * nd) - 1.0) / (nd - 1.0) ) ;
     
   } // end if +

  else
   {

    r[r_i][r_b] = r[r_i][r_d] = r[r_i][r_c] = 1.0 ;

    switch( ff )
     {

      default:
      case 1:
       
       af = b ;
   
       break ;
      
      case 2:
      
       af = ( a * b ) ;
      
      case 3:
      
       af = ( b * b * Math.PI ) ;

     } ; // end switch()  

    switch( ff )
     {

      default:
      case 1:
       
       r[r_i][r_c] = 1.0 ;
   
       break ;
      
      case 2:         
      case 3:

       if( tk < (af * c) )

        r[r_i][r_c] = ( 0.5 + (0.5 * Math.sqrt( 1.0 - (tk / (af * c)) )) ) ;

     } ; // end switch()  

   } ; // end else


   // Surface inclination parameter L:
   
   if( phrad > 0.0 )
    {
    
     r[r_l][r_b] = Math.pow( (1.0 - (0.5 * Math.tan( btrad ))) , 6.0 ) ;
     
     r[r_l][r_d] = Math.pow( (1.0 - Math.tan( btrad )) , 1.9 ) ;
     
     r[r_l][r_c] = ( ((nd * Math.exp( -0.0349 * bt * Math.tan( phrad ) )) - 1.0) / (nd - 1.0) ) ;

    } // end if +
    
   else
    {
    
     r[r_l][r_b] = r[r_l][r_d] = 1.0 ;
    
     r[r_l][r_c] = ( 1.0 - (0.4 * Math.tan( btrad ) )) ;

    } ; // end else

  
   // Foundation base inclination parameter X:

   if( phrad > 0.0 )
    {

     xd = Math.exp( - 0.045 * ap * Math.tan( phrad ) ) ;

     r[r_x][r_b] = r[r_x][r_d] = r[r_x][r_c] = xd ;

    } // end if +
     
   else
    {
    
     r[r_x][r_b] = r[r_x][r_d] = 1.0 ;

     r[r_x][r_c] = ( 1.0 - 0.0068 * ap ) ;

    } ; // end else


  // Results:

  for( r[r_f][r_b] = r[r_f][r_d] = r[r_f][r_c] = 1 , i = 0 ; i < r_f ; nb = r[r_f][r_b] *= r[i][r_b] , nd = r[r_f][r_d] *= r[i][r_d] , nc = r[r_f][r_c] *= r[i++][r_c] ) ;

  r[r_r][r_ed] = ( (gg * ngk) + (gq * nqr) ) ;

  r[r_r][r_rd] = ( (a * b * ((b * g2 * nb) + (d * g1 * nd) + (c * nc))) / gr ) ;

  r[r_r][r_m]  = ( r[r_r][r_ed] / r[r_r][r_rd] ) ;


  return( r ) ;
  

 } ; // end function groundfailure()



function punchfailure( x )
 {
 
  const c_0_0 =  1.0e-6 ;

  const c_r   =  0 ;
  const c_ff  =  0 ;
  const c_ph  =  1 ;
  const c_c   =  2 ;
  const c_a   =  3 ;
  const c_b   =  4 ;
  const c_g1  =  5 ;
  const c_d   =  6 ;
  const c_g2  =  7 ;
  const c_ea  =  8 ;
  const c_eb  =  9 ;
  const c_dt  = 10 ;
  const c_ap  = 11 ;
  const c_bt  = 12 ;
  const c_w   = 13 ;
  const c_t   = 14 ;
  const c_n   = 15 ;
  const c_ge  = 16 ;
  const c_gr  = 17 ;
   
  const r_n   =  0 ;
  const r_v   =  1 ;
  const r_i   =  2 ;
  const r_l   =  3 ;
  const r_x   =  4 ;
  const r_f   =  5 ;
  const r_r   =  6 ;

  const r_b   =  0 ;
  const r_d   =  1 ;
  const r_c   =  2 ;

  const r_ed  =  0 ;
  const r_rd  =  1 ;
  const r_m   =  2 ;

  const r_rc  =  3 ;
  const r_rr  =  7 ;
  
  var   i     =  0 ;
  var   j     =  0 ;

  var r  = new Array( r_rr ) ;
  
  for( i = 0 ; i < r_rr ; ++i )

   for( j = 0 , r[i] = new Array( r_rc ) ; j < r_rc ; r[i][j++] = 0 ) ;

  var ff = x[ c_ff ][ c_r ] ;
  var ph = x[ c_ph ][ c_r ] ;
  var c  = x[ c_c  ][ c_r ] ;
  var a  = x[ c_a  ][ c_r ] ;
  var b  = x[ c_b  ][ c_r ] ;
  var g1 = x[ c_g1 ][ c_r ] ;
  var d  = x[ c_d  ][ c_r ] ;
  var g2 = x[ c_g2 ][ c_r ] ;
  var ea = x[ c_ea ][ c_r ] ;
  var eb = x[ c_eb ][ c_r ] ;
  var dt = x[ c_dt ][ c_r ] ;
  var ap = x[ c_ap ][ c_r ] ;
  var bt = x[ c_bt ][ c_r ] ;
  var w  = x[ c_w  ][ c_r ] ;
  var t  = x[ c_t  ][ c_r ] ;
  var n  = x[ c_n  ][ c_r ] ;
  var ge = x[ c_ge ][ c_r ] ;
  var gr = x[ c_gr ][ c_r ] ;

  var ma    = 0 ;
  var mb    = 0 ;
  var l     = 0 ;

  var ph2   = ( ph * ph  ) ;
  var ph3   = ( ph * ph2 ) ;

  var nc    = 0 ;
  var rn    = 0 ;
 
  switch( ff )
   {
   
    default:
    case 1:  // Soft foundation

     ma = ( (2.61e-7 * ph3) - (5.31e-5 * ph2) + (2.66e-3 * ph) ) ;
     
     mb = ( (3.92e-7 * ph3) - (7.97e-5 * ph2) + (3.98e-3 * ph) ) ;
     
     break ;

    case 2:  // Stiff foundation

     ma = ( (1.11e-6 * ph3) - (2.01e-4 * ph2) + (9.17e-3 * ph) ) ;
   
     mb = ( (1.66e-6 * ph3) - (3.02e-4 * ph2) + (1.38e-2 * ph) ) ;

   } ; // end switch( ff )

  r[r_v][r_c] = ma ;
  
  r[r_i][r_c] = mb ;

  nc = ( (2 + Math.PI) * (1 + (0.2 * (b / a))) ) ;

  r[r_n][r_c] = nc ;

  l  = ( (d / a) + (d / b) )

  r[r_l][r_c] = l ;


  rn  = ( 2 * (1 + (b / a)) * nc * c ) ;

  rn += (  (3 + (2 * (b / a))) * ma * l * g2 * d ) ;

  rn /= ( ((3 + (2 * (b / a))) * Math.exp( - mb * l )) - 1 ) ;


  // Results:

  r[r_r][r_ed] = (  ge * n ) ;

  r[r_r][r_rd] = ( (rn * a * b) / gr ) ;

  r[r_r][r_m]  = ( r[r_r][r_ed] / r[r_r][r_rd] ) ;


  return( r ) ;
  

 } ; // end function punchfailure()



function linsect( a1 , b1 , a2 , b2 )
 {
 
  const r_x = 0 ;
  const r_y = 1 ;
  const r_r = 2 ;

  var   r   = new Array( r_r ) ;
  
  if( a1 != a2 )
   {

    r[r_x] = ( (b2 - b1) / (a1 - a2) ) ;
    
    r[r_y] = ( (a1 * r[r_x]) + b1 ) ;
    
   } // end if +
   
  else  r[r_x] = r[r_y] = 0 ;

  return( r ) ;
 
 }; // end function linsect()



function slipsurface( x )
 {

  const c_0_0   = 1.0e-6 ;
  
  const c_n     = 0 ;
  const c_b     = 1 ;
  const c_f     = 2 ;
  const c_dt    = 3 ;
  const c_ap    = 4 ;
  const c_bt    = 5 ;
  
  const r_x     = 0 ;
  const r_y     = 1 ;
  const r_r     = 2 ;

  var   i       = 0 ;
  
  var   n       = x[c_n] ;  
  var   b       = x[c_b] ;
  var   frad    = radians( x[c_f]  ) ;
  var   dtrad   = radians( x[c_dt] ) ;
  var   aprad   = radians( x[c_ap] ) ;
  var   btrad   = radians( x[c_bt] ) ;

  var   r       = new Array( r_r ) ;

  for( i = 0; i < r_r; r[i] = new Array( n ) , ++i ) ;

  var   e1rad   = Math.asin( - Math.sin( btrad ) / Math.sin( frad ) ) ;
  var   e2rad   = Math.asin( - Math.sin( dtrad ) / Math.sin( frad ) ) ;

  var   pi_4    = ( Math.PI / 4 ) ;
  var   frad_2  = ( frad    / 2 ) ;

  var   t1rad   = ( pi_4 - frad_2 - ((e1rad + btrad) / 2) ) ;
  var   t2rad   = ( pi_4 + frad_2 - ((e2rad - dtrad) / 2) ) ;
  var   t3rad   = ( pi_4 + frad_2 + ((e2rad - dtrad) / 2) ) ;
  var   t4rad   = ( Math.PI - t1rad - t2rad - t3rad - btrad ) ;
  var   nrad    = ( Math.PI - aprad - t1rad - t2rad - btrad ) ;


  var   r2      = ( (b * Math.sin( t3rad )) / (Math.cos( aprad ) * Math.sin( t2rad + t3rad )) ) ;
  var   r1      = (  r2 * Math.exp( nrad * Math.tan( frad ) ) ) ;
  var   r0      = 0 ;

  var   x0      = b ;
  var   y0      = 0 ;

  var   a0      = 0 ;
  var   b0      = 0 ;

  var   x4      = 0 ;
  var   y4      = ( - b * Math.tan( aprad ) ) ;

  var   a4      = Math.tan( aprad - t3rad ) ;
  var   b4      = ( y4 - (a4 * x4) ) ;

  var   x3      = ( x0 - r2 * Math.cos( aprad + t2rad ) ) ;
  var   y3      = ( y0 - r2 * Math.sin( aprad + t2rad ) ) ;

  var   x2      = ( x0 - r1 * Math.cos( aprad + t2rad + nrad ) ) ;
  var   y2      = ( y0 - r1 * Math.sin( aprad + t2rad + nrad ) ) ;

  var   a2      = Math.tan( t4rad ) ;
  var   b2      = ( y2 - (a2 * x2) ) ;
 
  var   a1      = Math.tan(- btrad ) ;
  var   b1      = ( y0 - (a1 * x0) ) ;

  var   xy      = linsect( a1 , b1 , a2 , b2 ) ;
  
  var   x1      = xy[r_x] ;
  var   y1      = xy[r_y] ;

  var   x       = 0 ;
  var   y       = 0 ;

  var   trad    = 0 ;
  var   tradmin = aprad ;
  var   tradmax = ( tradmin + t1rad + nrad + t2rad ) ;
  var   tradstp = ( (tradmax - tradmin) / n ) ;

  var   tarad   = ( aprad + t2rad ) ;
  var   tbrad   = ( tarad + nrad  ) ;

  for( trad = tradmin , i = 0; i <= n; trad += tradstp , ++i )
   {

    a0 = Math.tan( trad ) ;
    
    b0 = ( y0 - (a0 * x0) ) ;

    if( trad <= tarad )
     {
     
      xy = linsect( a0 , b0 , a4 , b4 ) ;
      
      x  = xy[r_x] ;
      
      y  = xy[r_y] ;
     
     } // end if +

    else
  
     if( trad <= tbrad )
      {
      
       r0 = ( r2 * Math.exp( (trad - tarad) * Math.tan( frad ) ) ) ;

       x  = ( x0 - (r0 * Math.cos( trad )) ) ;
       
       y  = ( y0 - (r0 * Math.sin( trad )) ) ;

      } // end if +

     else
      {

       xy = linsect( a0 , b0 , a2 , b2 ) ;

       x  = xy[r_x] ;

       y  = xy[r_y] ;
       
      }; // end else

    r[r_x][i] = x ;
    
    r[r_y][i] = y ;

   } ; // end for()

  return( r ) ;

 }; // end function slipsurface()



function izzFz( x , y , z )
 {

  const c_3__2pi = ( 3.0 / (2.0 * Math.PI) ) ;

  const rr   = ( (x * x) + (y * y) ) ;
  const zz   = ( z * z ) ;
  const rrzz = ( rr / zz ) ;

  const izzf = ( (c_3__2pi / zz) * Math.pow( (1.0 / (1.0 + rrzz)) , 2.5 ) ) ;

  return( izzf ) ;

 } ; // end function izzFz()



function izzqzAQ( x )
 {

  const c_0    = 0.00 ;
  const c_1    = 1.00 ;
  const c_1__2 = 0.50 ;  
  const c_1__4 = 0.25 ;
  
  const c_r    = 0 ;
  const c_dx   = 0 ;
  const c_dy   = 1 ;
  const c_xl   = 2 ;
  const c_yl   = 3 ;
  const c_xr   = 4 ;
  const c_yr   = 5 ;
  const c_z    = 6 ;

  const dx     = x[ c_dx ][ c_r ] ;
  const dy     = x[ c_dy ][ c_r ] ;
  const xl     = x[ c_xl ][ c_r ] ;
  const yl     = x[ c_yl ][ c_r ] ;
  const xr     = x[ c_xr ][ c_r ] ;
  const yr     = x[ c_yr ][ c_r ] ;
  const z      = x[ c_z  ][ c_r ] ;

  const dx__2  = ( dx / 2.0 ) ;
  const dy__2  = ( dy / 2.0 ) ;
  
  const da     = ( dx * dy ) ;

  var x        = undefined ;
  var y        = undefined ;
  var izzq     = undefined ;

  izzq = c_0 ;


  if( z > c_0 )

    for( x = (xl + dx__2); x < xr; x += dx )

      for( y = (yl + dy__2); y < yr; y += dy )
      
        izzq += ( izzFz( x , y , z ) * da ) ;

  else

    if( ((xl == 0) || (xr == 0)) && ((yl == 0) || (yr == 0)) )
    
      izzq = c_1__4 ;
    
    else
    
      if( (xl == 0) || (yl == 0) || (xr == 0) || (yr == 0) )
      
        izzq = c_1__2 ;
        
      else
      
        if( (xl < 0) && (xr > 0) && (yl < 0) && (yr > 0) )
        
          izzq = c_1 ;


  return( izzq ) ;


 } ; // end function izzqzAQ()



function ifx( x , y , z , n )
 {
 
  const c_szz   = 0 ;
  const c_sxx   = 1 ;
  const c_syy   = 2 ;
  const c_sxy   = 3 ;
  const c_sxz   = 4 ;
  const c_syz   = 5 ;

  const c_ux    = 6 ;
  const c_uy    = 7 ;
  const c_uz    = 8 ;

  const r_r     = 1 ;
  const r_rr    = 9 ;
  
  var   x2      = ( x * x ) ;
  var   y2      = ( y * y ) ;
  var   z2      = ( z * z ) ;

  var   r0      = Math.sqrt( x2 + y2 + z2 ) ;
  var   r02     = ( r0 * r0 ) ;
  var   r03     = 0 ;

  var   r1      = ( z / r0 ) ;
  var   r13     = ( r1 * r1 * r1 ) ;
  var   r15     = ( r1 * r1 * r13 ) ;

  var   rz      = 0 ;
  var   rz2     = 0 ;
  var   rrz     = 0 ;
 
  var   if0     = 0 ;
  var   if1     = 0 ;
  var   if2     = 0 ;
  
  var   if3     = 0 ;
  var   if4     = 0 ;
  var   if5     = 0 ;
  var   if6     = ( (3 * r15) / (2 * Math.PI) ) ;

  var   r       = undefined ;
  var   rr      = undefined ;

  if( n )  r = new Array( r_rr ) ; else  r = new Array( r_r ) ;

  rr = new Array( 1 ) ;
  
  rr[0] = r ;
  
  if( n ) 
   {
   
    r03  = ( r0 * r02 ) ;

    rz   = ( r0 + z ) ;
    rz2  = ( rz * rz ) ;
    rrz  = ( r0 / rz ) ;

    if0  = ( 1 - (2 * n) ) ;

    if1  = ( 3 / r02 ) ;
    if2  = ( if0 / rz2 ) ;
    if3  = ( (2 * r0) / rz ) ;
    if4  = ( r13 / (2 * Math.PI) ) ;
    if5  = ( 1 / (4 * Math.PI * r0) ) ;

    r[c_sxx] = ( if4 * (x / z) * ((if1 * x2) - (if2 * (r02 - y2 - (if3 * y2)))) ) ;
    r[c_syy] = ( if4 * (x / z) * ((if1 * y2) - (if2 * ((3 * r02) - x2 - (if3 * x2)))) ) ;

    r[c_sxy] = ( if4 * (y / z) * ((if1 * x2) + (if2 * (r02 - x2 + (if3 * x2)))) ) ;
    r[c_sxz] = ( if6 * (x2 / z2) ) ;
    r[c_syz] = ( if6 * ((x * y) / z2) ) ;

    r[c_ux]  = ( if5 * (1 + (x2 / r02) + (if0 * (rrz - (x2 / rz2)))) ) ;
    r[c_uy]  = ( if5 * (((x * y) / r02) - (if0 * ((x * y) / rz2))) ) ;
    r[c_uz]  = ( if5 * (((x * z) / r02) + (if0 * (x / rz))) ) ;

   }; // end if -

  r[c_szz] = ( if6 * (x / z) ) ;

  return( rr ) ;

 }; // end function ' ifx() : Cerruti elementary solution for unit force in x direction



function ify( x , y , z , n )
 {
   
  const c_szz   = 0 ;
  const c_sxx   = 1 ;
  const c_syy   = 2 ;
  const c_sxy   = 3 ;
  const c_sxz   = 4 ;
  const c_syz   = 5 ;

  const c_ux    = 6 ;
  const c_uy    = 7 ;
  const c_uz    = 8 ;
  
  const r_r     = 1 ;
  const r_rr    = 9 ;


  var   x2      = ( x * x ) ;
  var   y2      = ( y * y ) ;
  var   z2      = ( z * z ) ;
  
  var   r02     = ( x2 + y2 + z2 ) ;
  var   r0      = Math.sqrt( r02 ) ;
  var   r03     = 0 ;

  var   r1      = ( z / r0 ) ;
  var   r13     = ( r1 * r1 * r1 ) ;
  var   r15     = ( r1 * r1 * r13 ) ;

  var   rz      = 0 ;
  var   rz2     = 0 ;
  var   rrz     = 0 ;
 
  var   if0     = 0 ;
  var   if1     = 0 ;
  var   if2     = 0 ;
  
  var   if3     = 0 ;
  var   if4     = 0 ;
  var   if5     = 0 ;
  var   if6     = ( (3 * r15) / (2 * Math.PI) ) ;
  
  var   r       = undefined ;
  var   rr      = undefined ;
  
  if( n )  r = new Array( r_rr ) ; else  r = new Array( r_r ) ;

  rr = new Array( 1 ) ;
  
  rr[0] = r ;

  if( n ) 
   {
   
    r03  = ( r0 * r02 ) ;

    rz   = ( r0 + z ) ;
    rz2  = ( rz * rz ) ;
    rrz  = ( r0 / rz ) ;

    if0  = ( 1 - (2 * n) ) ;

    if1  = ( 3 / r02 ) ;
    if2  = ( if0 / rz2 ) ;
    if3  = ( (2 * r0) / rz ) ;
    if4  = ( r13 / (2 * Math.PI) ) ;
    if5  = ( 1 / (4 * Math.PI * r0) ) ;
 
    r[c_sxx] = ( if4 * (y / z) * ((if1 * x2) - (if2 * ((3 * r02) - y2 - (if3 * y2)))) ) ;
    r[c_syy] = ( if4 * (y / z) * ((if1 * y2) - (if2 * (r02 - x2 - (if3 * x2)))) ) ;
  
    r[c_sxy] = ( if4 * (x / z) * ((if1 * y2) + (if2 * (r02 - y2 + (if3 * y2)))) ) ;
    r[c_sxz] = ( if6 * ((y * x) / z2) ) ;
    r[c_syz] = ( if6 * (y2 / z2) ) ;

    r[c_ux]  = ( if5 * (((y * x) / r02) - (if0 * ((y * x) / rz2))) ) ;
    r[c_uy]  = ( if5 * (1 + (y2 / r02) + (if0 * (rrz - (y2 / rz2)))) ) ;
    r[c_uz]  = ( if5 * (((y * z) / r02) + (if0 * (y / rz))) ) ;

   }; // end if -
    
  r[c_szz] = ( if6 * (y / z) ) ;
    
  return( r ) ;

 }; // end function ' ify() : Cerruti elementary solution for unit force in y direction



function ifz( x , y , z , n )
 {

  const c_szz   = 0 ;
  const c_sxx   = 1 ;
  const c_syy   = 2 ;
  const c_sxy   = 3 ;
  const c_sxz   = 4 ;
  const c_syz   = 5 ;

  const c_ux    = 6 ;
  const c_uy    = 7 ;
  const c_uz    = 8 ;

  const r_r     = 1 ;
  const r_rr    = 9 ;
  
  var   x2      = ( x * x ) ;
  var   y2      = ( y * y ) ;
  var   z2      = ( z * z ) ;
  var   z3      = ( z * z2 ) ;

  var   r00     = 0 ;

  var   r02     = ( x2 + y2 + z2 ) ;
  var   r0      = Math.sqrt( r02 ) ;
  var   r03     = ( r0  * r02 ) ;
  var   r05     = ( r02 * r03 ) ;
  var   r0z     = 0 ;
  var   rr0z    = 0 ;
  
  var   if0     = 0 ;
  var   if1     = ( (3 * z2) / (2 * Math.PI) ) ;

  var   if2     = 0 ;
  var   if3     = 0 ;
  var   if4     = 0 ; 
  var   if5     = 0 ;
  var   ifc     = 0 ;
  var   ifs     = 0 ;

  var   ur      = 0 ;

  var   r       = undefined ;
  var   rr      = undefined ;

  if( n )  r = new Array( r_rr ) ;  else  r = new Array( r_r ) ;

  rr = new Array( 1 ) ;
  
  rr[0] = r ;

  if( n ) 
   {
 
    r00  = Math.sqrt( x2 + y2 ) ;

    r0z  = ( r0 + z ) ;
    rr0z = ( (2 * r0) + z ) ;
 
    if0  = ( 1 - (2 * n) ) ;

    if2  = ( 1 / (r0 * r0z) ) ;
    if3  = ( rr0z / (r03 * r0z * r0z) ) ;
    if4  = ( 1 / (4 * Math.PI * r0) ) ;
    if5  = ( if0 / 3 ) ;

    if( r00 > 0 )  ifc = ( x / r00 ) ;  else  ifc = 1 ;
    if( r00 > 0 )  ifs = ( y / r00 ) ;  else  ifs = 0 ;

    r[c_sxx] = ( if1 * (((x2 * z) / r05) + (if5 * (if2 - (if3 * x2) - (z / r03)))) ) ;
    r[c_syy] = ( if1 * (((y2 * z) / r05) + (if5 * (if2 - (if3 * y2) - (z / r03)))) ) ;
  
    r[c_sxy] = ( if1 * (((x * y * z) / r05) - (if5 * if3 * x * y)) ) ;
    r[c_sxz] = ( if1 * ((x * z2) / r05) ) ;
    r[c_syz] = ( if1 * ((y * z2) / r05) ) ;

    ur  = ( if4 * (((r00 * z) / r02) - ((if0 * r00) / r0z)) ) ;

    r[c_ux]  = ( ifc * ur ) ;
    r[c_uy]  = ( ifs * ur ) ;
    r[c_uz]  = ( if4 * (1 + if0 + (z2 / r02)) ) ; 

   }; // end if -

  r[c_szz] = ( if1 * (z3 / r05) ) ;

  return( rr ) ;
  
 }; // end function ' ifz() : Boussinesq elementary solution for unit force in z direction



function izzqzr( r , z )
 {

  var r2    = ( r * r ) ;
  var z2    = ( z * z ) ;

  var r2z2  = ( z2 / (z2 + r2) ) ;
  
  return( 1 - Math.sqrt( r2z2 * r2z2 * r2z2 ) ) ;

 }; // end function ' izzqr()
 
 
 
function izzqz( a , b , x , y , z )
 {

  const c_0 = 1e-6 ;
  
  var   r   = new Array( 5 ) ;
  var   rr  = new Array( 1 ) ;
  
  var   xi  = undefined ;
  var   yi  = undefined ;
  var   ii  = undefined ;
 
  var   ri  = undefined ;
 
  var   izz   = 0.0 ;
  var   izzqz = 0.0 ;

  rr[0] = r ;

  if( z < c_0 ) z = c_0 ;
  
  for( i = 0; i < 4; ++i )
   {  
   
    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (  1 / (2 * Math.PI) ) ;
       break;
    
      case 1:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (- 1 / (2 * Math.PI) ) ;
       break;
  
      case 2:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (  1 / (2 * Math.PI) ) ;
       break;

      case 3:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (- 1 / (2 * Math.PI) ) ;
    
     }; // end switch()
    
    ri   = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) ) ;
    izz  = ( 1 / (((x + xi) * (x + xi)) + (z * z)) ) ;
    izz += ( 1 / (((y + yi) * (y + yi)) + (z * z)) ) ;
    izz *= ( ((x + xi) * (y + yi) * z) / ri ) ;
    izz += Math.atan2( ((x + xi) * (y + yi)) , (z * ri) ) ;
    
    r[i] = ( ii * izz ) ;

    izzqz += ( ii * izz ) ;
   
   }; // end for()

  r[4] = izzqz ;

  return( rr ) ;
  
 }; // end function izzqz()



function jzzqz(  a , b , x , y , z , n )
 {
  
  const c_0 = 1e-6 ;

  var   xi  = undefined ;
  var   yi  = undefined ;
  var   ii  = undefined ;
 
  var   ri  = undefined ;
 
  var   jzz   = 0.0 ;
  var   jzzqz = 0.0 ;

  if( z < c_0 )  z = c_0 ;
  
  for( i = 0; i < 4; ++i )
   {  
   
    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (  1 / (4 * Math.PI) ) ;
       break;
    
      case 1:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (- 1 / (4 * Math.PI) ) ;
       break;
  
      case 2:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (  1 / (4 * Math.PI) ) ;
       break;

      case 3:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (- 1 / (4 * Math.PI) ) ;
    
     }; // end switch()
  
    ri     = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) ) ;
    jzz    = ( 2 * (1 - n) * (((x + xi) * Math.atanh( (y + yi) / ri )) + ((y + yi) * Math.atanh( (x + xi) / ri ))) ) ;
    jzz   -= ( (1 - (2 * n)) * z * Math.atan2( (x + xi) * (y + yi) , (z * ri) ) ) ;
    jzzqz += ( ii * jzz ) ;
   
   }; // end for()

  return( jzzqz ) ;

 }

 
 /**
  *
  * @function
  * @name frqz
  *
  */
 
function frqz( a , b , x , y , z , n , v )
 {

  const c_0  = 1e-6;
  
  var   rr   = new Array( 1 ) ;
  
  var   r    = new Array( 5 ) ;
  
  var   xi   = undefined ;
  var   yi   = undefined ;
  var   ii   = undefined ;
 
  var   rab  = undefined ;
  var   raz  = undefined ;
  var   rbz  = undefined ;
  var   rabz = undefined ;
 
  var   f1   = 0.0 ;
  var   f2   = 0.0 ;
  var   fr   = 0.0 ;

  if( ! v )  v = false ;

  rr[0] = r ;

  if( z < c_0 ) z = c_0 ;
  
  for( i = 0; i < 4; ++i )
   {  

    switch( i )
     {
     
      case 0:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (  1 ) ;
       break;
    
      case 1:
       xi  = ( (- a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (- 1 ) ;
       break;
  
      case 2:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (  b) / 2 ) ;
       ii  = (  1 ) ;
       break;

      case 3:
       xi  = ( (  a) / 2 ) ;
       yi  = ( (- b) / 2 ) ;
       ii  = (- 1 ) ;
    
     }; // end switch()
    
    rab   = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) ) ;
    raz   = Math.sqrt( ((x + xi) * (x + xi)) + (z * z) ) ;
    rbz   = Math.sqrt( ((y + yi) * (y + yi)) + (z * z) ) ;
    rabz  = Math.sqrt( ((x + xi) * (x + xi)) + ((y + yi) * (y + yi)) + (z * z) ) ;

    if( (Math.abs( x + xi ) > 0) && (Math.abs( y + yi ) > 0) )
     {

      f1    = ( (x + xi) * ( Math.log( Math.abs( (((y + yi) + rab) * raz) / ((x + xi) * ((y + yi) + rabz)) ) ) ) ) ;
      f1   += ( (y + yi) * ( Math.log( Math.abs( (((x + xi) + rab) * rbz) / ((y + yi) * ((x + xi) + rabz)) ) ) ) ) ;
      f1   *= ( 1.0 / (b * Math.PI) ) ;

      f2    = ( z * Math.atan2( ((x + xi) * (y + yi)) , (z * rabz) ) ) ;
      f2   *= ( (1.0 - n - (2.0 * n * n)) / (2.0 * b * Math.PI * (1.0 - (n * n))) ) ;
      
     } // end if() +
     
    else
     {
     
       f1 = f2 = 0.0 ;
       
     }; // end else

    fr   += ( ii * (f1 + f2) ) ;

    r[i]  = ( ii * (f1 + f2) ) ;
   
   }; // end for()

  r[4] = fr ;

  if( v )

   return(  rr ) ;
   
  else
  
   return( fr ) ;
  
 } ; // end function frqz()


/**
 
@function
@name      quadrilateralfoundation
@parameter cc
@parameter x

*/

function quadrilateralfoundation( cc , x )
 {

  const c_r  = 0 ;

  const c_a  = 0 ;
  const c_b  = 1 ;
  const c_g  = 2 ;
  const c_nu = 3 ;

  const r_a0 = 0 ;
  const r_i0 = 1 ;
  const r_r0 = 2 ;
  const r_k0 = 3 ;
  const r_r  = 4 ;
  
  var a  = x[ c_a  ][ c_r ] ;
  var b  = x[ c_b  ][ c_r ] ;
  var g  = x[ c_g  ][ c_r ] ;
  var nu = x[ c_nu ][ c_r ] ;

  var a0 = 0.0 ;
  var i0 = 0.0 ;
  var r0 = 0.0 ;
  var k0 = 0.0 ;
  
  var r = new Array( r_r ) ;
  
  switch( cc )
   {


    case 1:
    
     a0 = a0u( a , b ) ;
     i0 = 0.0 ;
     r0 = r0u( a0 ) ;
     k0 = kux0( r0 , g , nu )
     
     break ;


    case 2:
    
     a0 = a0u( a , b ) ;
     i0 = 0.0 ;
     r0 = r0u( a0 ) ;
     k0 = kuy0( r0 , g , nu )
     
     break ;


    default:
    case 3:
    
     a0 = a0u( a , b ) ;
     i0 = 0.0 ;
     r0 = r0u( a0 ) ;
     k0 = kuz0( r0 , g , nu )
     
     break ;


    case 4:
    
     a0 = 0.0 ;
     i0 = i0x( a , b ) ;
     r0 = r0rx( i0 ) ;
     k0 = krx0( r0 , g , nu )
     
     break ;


    case 5:
    
     a0 = 0.0 ;
     i0 = i0y( a , b ) ;
     r0 = r0ry( i0 ) ;
     k0 = kry0( r0 , g , nu )
     
     break ;


    case 6:
    
     a0 = 0.0 ;
     i0 = i0z( a , b ) ;
     r0 = r0rz( i0 ) ;
     k0 = krz0( r0 , g , nu )
     
     break ;
          
   }
   
  r[ r_a0 ] = a0 ;
  r[ r_i0 ] = i0 ;
  r[ r_r0 ] = r0 ;
  r[ r_k0 ] = k0 ;
    
  return( r ) ;
 
 }


/**
 *
 * @function
 * @name gel
 *
 */


function gel( e , nu )
 {
 
  const g = ( e / (2.0 * (1.0 + nu)) ) ;
 
  return( g ) ;
 
 }


/**
 * 
 * @function
 * @name kel
 *
 */

function kel( e , nu )
 {
 
  const k = ( e / (3.0 * (1.0 - (2.0 * nu))) ) ;
 
  return( k ) ;
 
 }


/**
 *
 * @function
 * @name a0u
 *
 */

function a0u( a , b )
 {

  const a0 = ( a * b ) ;
 
  return( a0 ) ;
 
 }


/**
 * 
 * @function
 * @name r0u
 *
 */

function r0u( a0 ) 
 {

  const r0 = Math.sqrt( a0 / Math.PI ) ;
  
  return( r0 ) ;
  
 }


/**
 *
 * @function
 * @name kux0
 *
 * */

function kux0( r0 , g , nu ) 
 {

  const k = ( (8.0 * g * r0) / (2.0 - nu) ) ;
  
  return( k ) ;
  
 }


/**
 * 
 * @function
 * @name kuy0
 * 
 */

function kuy0( r0 , g , nu ) 
 {

  const k = ( (8.0 * g * r0) / (2.0 - nu) ) ;
  
  return( k ) ;
  
 }


/**
 *
 * @function
 * @name kuz0
 *
 * */

function kuz0( r0 , g , nu ) 
 {

  const k = ( (4.0 * g * r0) / (1.0 - nu) ) ;
  
  return( k ) ;
  
 }


/**
 *
 * @function
 * @name i0x
 *
 */

function i0x( a , b )
 {
 
  const rx = ( a / 2.0 ) ; 
  const ry = ( b / 2.0 ) ; 
 
  const i0 = ( (4.0 * rx * ry * ry * ry) / 3.0 ) ;
 
  return( i0 ) ;
 
 }


/**
 *
 * @function
 * @name i0y
 * 
 */

function i0y( a , b )
 {
 
  const rx = ( a / 2.0 ) ; 
  const ry = ( b / 2.0 ) ; 
 
  const i0 = ( (4.0 * rx * rx * rx * ry) / 3.0 ) ;

  return( i0 ) ;
 
 }


/**
 *
 * @function
 * @name i0z
 *
 */

function i0z( a , b )
 {
 
  const rx = ( a / 2.0 ) ; 
  const ry = ( b / 2.0 ) ; 
 
  const i0 = ( ((4.0 * rx * rx * rx * ry) / 3.0) + ((4.0 * rx * ry * ry * ry) / 3.0) ) ;

  return( i0 ) ;
 
 }


/**
 *
 * @function
 * @name r0rx
 *
 */

function r0rx( i0x )
 {
 
  const r0 = Math.pow( ((4.0 * i0x) / Math.PI) , (1.0 / 4.0) ) ;
  
  return( r0 ) ;
 
 }


/**
 *
 * @function
 * @name r0ry
 *
 */

function r0ry( i0y )
 {
 
  const r0 = Math.pow( ((4.0 * i0y) / Math.PI) , (1.0 / 4.0) ) ;
  
  return( r0 ) ;
 
 }


/**
 * 
 * @function
 * @name r0rz
 * 
 */

function r0rz( i0z )
 {
 
  const r0 = Math.pow( ((2.0 * i0z) / Math.PI) , (1.0 / 4.0) ) ;
  
  return( r0 ) ;
 
 }


/**
 *
 * @function
 * @name krx0
 *
 */

function krx0( r0 , g , nu ) 
 {

  const k = ( (8.0 * g * r0 * r0 * r0) / (3.0 * (1.0 - nu)) ) ;
  
  return( k ) ;
  
 }


/**
 *
 * @function
 * @name kry0
 * 
 */

function kry0( r0 , g , nu ) 
 {

  const k = ( (8.0 * g * r0 * r0 * r0) / (3.0 * (1.0 - nu)) ) ;
 
  return( k ) ;
  
 }


/**
 *
 * @function
 * @name krz0
 *
 */

function krz0( r0 , g , nu ) 
 {

  const k = ( (16.0 * g * r0 * r0 * r0) / 3.0 ) ;
  
  return( k ) ;
  
 }


/**
 *
 *  Calculation of pile forces in a plane pile raft system
 *
 *  @function
 *  @name noekkentved
 *  @param  {Array}  x - Input data field
 *  @return {Array}      Pile force results
 *  @customfunction
 *
 */

function noekkentved( x )
 {
 
  const c_x    = 0 ;
  const c_ap   = 1 ;
  const c_l    = 2 ;
  const c_a    = 3 ;
  const c_e    = 4 ;
  const c_xy   = 5 ;
  const c_xs   = 0 ;
  const c_ys   = 1 ;
  const c_v    = 2 ;
  const c_h    = 3 ;

  const r_nu   = 0 ;
  const r_eta  = 1 ;
  const r_xy   = 2 ;
  const r_x0   = 0 ;
  const r_y0   = 1 ;
  const r_x0s  = 2 ;
  const r_y0s  = 3 ;
  const r_s    = 4 ;
  const r_m    = 5 ;
  
  const r_cv   = 3 ;
  const r_ch   = 4 ;
  const r_cm   = 5 ;
  const r_qv   = 6 ;
  const r_qh   = 7 ;
  const r_q    = 8 ;

  const r_nr   = 9 ;
  const r_nc   = x[0].length ;
   
  var   ca     = undefined ;
  var   ta     = undefined ;
  var   nu     = undefined ;

  var   snu    = undefined ;
  var   snux   = undefined ;
  var   snut   = undefined ; 
  var   snutx  = undefined ;
  var   snutt  = undefined ;
  
  var   eta    = undefined ;
  var   snuee  = undefined ;
  
  var   apr    = undefined ;
  
  var   tap    = undefined ;
  var   xp     = undefined ;
  var   tapp   = undefined ;
  var   xpp    = undefined ;
  var   tppmtp = undefined ;
  
  var   taps   = undefined ;
  var   apsr   = undefined ;

  var   x0     = undefined ;
  var   y0     = undefined ;
  var   x0s    = undefined ;
  var   y0s    = undefined ;
  var   dxs    = undefined ;
  var   dys    = undefined ;
  
  var   d      = undefined ;
  
  var   v      = undefined ;
  var   h      = undefined ;
  var   s      = undefined ;
  var   m      = undefined ;
  
  var   i      = undefined ;
  var   j      = undefined ;
  
  var   r      = new Array( r_nr ) ;

  for( i = 0 ; i < r_nr ; r[i++] = new Array( r_nc ) ) ;

  for( snu = snux = snut = snutx = snutt = 0.0 , j = 0 ; j < r_nc ; ++j )
   {
   
    apr = radians( x[c_ap][j] ) ;
   
    ca = Math.cos( apr ) ;
    ta = Math.tan( apr ) ;
    
    snu   += r[r_nu][j] = nu = ( ((x[c_e][j] * x[c_a][j]) / x[c_l][j]) * ca * ca ) ;
    snux  += ( nu * x[c_x][j] ) ;
    snut  += ( nu * ta ) ;
    snutx += ( nu * ta * x[c_x][j] ) ;
    snutt += ( nu * ta * ta ) ;
    
   } ; // end for()

  tap    = ( snut  / snu  ) ;
  xp     = ( snux  / snu  ) ;
  tapp   = ( snutt / snut ) ;
  xpp    = ( snutx / snut ) ;

  tppmtp = ( tapp  - tap  ) ;

  r[r_xy][r_y0] = y0 = ( (xp - xpp) / tppmtp ) ;
  r[r_xy][r_x0] = x0 = ( xp + (y0 * tap) ) ;

  for( snuee = 0.0 , j = 0 ; j < r_nc ; ++j )
   {
   
    apr          = radians( x[c_ap][j] ) ;
    ta           = Math.tan( apr ) ; 
    
    r[r_eta][j]  = eta = ( x[c_x][j] - x0 + (y0 * ta) ) ;
    
    snuee       += ( r[r_nu][j] * eta * eta ) ;
    
   } ; // end for()

  dxs = ( x[c_xy][c_xs] - x0 ) ;
  dys = ( x[c_xy][c_ys] - y0 ) ;
 
  v   = x[c_xy][c_v] ;
  h   = x[c_xy][c_h] ;
 
  if( v )
   {
  
    taps = (- h / v) ;
    
    apsr = Math.atan( taps ) ;
    
    r[r_xy][r_y0s] = y0s = x[c_xy][c_ys] ;
    r[r_xy][r_x0s] = x0s = ( x0 - (dys * taps) ) ;
    
    d = ( (x[c_xy][c_xs] - x0s) * Math.cos( apsr ) ) ;
    
   } // end if() +
 
  else
   {
  
    y0s = x[c_xy][c_ys] ;
    x0s = x[c_xy][c_ys] ;
  
    d = dxs ;
   
   } ; // end else

  r[r_xy][r_s] = s = Math.sqrt( (h * h) + (v * v) ) ;
  r[r_xy][r_m] = m = ( s * d ) ;
 
  for( j = 0 ; j < r_nc ; ++j )
   {
   
    apr        = radians( x[c_ap][j] ) ;
    
    ca         = Math.cos( apr ) ; 
    ta         = Math.tan( apr ) ;
    
    r[r_cv][j] = ( (r[r_nu][j] / snu ) * ((tapp - ta ) / tppmtp) ) ;
    r[r_ch][j] = ( (r[r_nu][j] / snut) * ((ta   - tap) / tppmtp) ) ;
    r[r_cm][j] = ( (r[r_nu][j] * r[r_eta][j]) / snuee ) ;
    
    r[r_qv][j] = ( (r[r_cv][j] * v) + (r[r_ch][j] * h) + (r[r_cm][j] * m) ) ;
    r[r_qh][j] = ( r[r_qv][j] * ta ) ;
    r[r_q][j]  = ( r[r_qv][j] / ca ) ;

   } ; // end for()
 
  return( r ) ;
  
 } ; // end function noekkentved()
